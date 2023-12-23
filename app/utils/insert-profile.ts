import { SupabaseClient } from "@supabase/supabase-js";

export async function insertOrUpdateProfile(supabase: SupabaseClient) {
  try {
    const user = await supabase.auth.getUser().then(x => x.data.user?.user_metadata);

    if (user) {
      const insertResult = await supabase.from('profiles').insert({
        sub: user.sub,
        avatar_url: user.avatar_url,
        name: user.name,
        username: user.user_name
      });
      return insertResult;
    } else {
      console.error('User data not available.');
      return null;
    }
  } catch (error) {
    console.error('Error inserting/updating profile data:', error);
    throw error; // Rethrow the error for handling in the main file if needed
  }
}
