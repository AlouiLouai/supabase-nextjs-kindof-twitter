import { SupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function createProfile(supabase: SupabaseClient) {
    try {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data) {
            throw new Error('No connected user found');
        }
        // Check if the user already exists in the 'profiles' table
        const { data: existingUserData } = await supabase
            .from('profiless')
            .select('*')
            .eq('id', data.user.id)
            .single();


        if (!existingUserData) {
            const userPayload: ProfileData = {
                id: data.user.id,
                name: data.user.user_metadata?.full_name,
                username: data.user.user_metadata?.user_name,
                avatar_url: data.user.user_metadata?.avatar_url
            }
            // If the user doesn't exist, save them to the 'profiles' table
            await saveUserDataToProfilesTable(userPayload, supabase);
        } else {
            console.log('User already exists in profiles table:', existingUserData);
        }
    } catch (error) {
        throw new Error(`${error}`);
    }
}

// Function to save user data to the 'profiles' table
const saveUserDataToProfilesTable = async (user: ProfileData, supabase: SupabaseClient) => {
    try {
        const { id, name, username, avatar_url } = user; // Get required user data

        // Save this data to your 'profiles' table using Supabase client's 'insert' method
        return await supabase.from('profiless').insert(
            {
                id,
                name,
                username,
                avatar_url
            },
        );
    } catch (error) {
        throw new Error(`${error}`);
    }
};
