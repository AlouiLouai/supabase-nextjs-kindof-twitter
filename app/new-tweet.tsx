import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {
    const addTweet = async (formData: FormData) => {
        "use server";
        const title = String(formData.get("title"));
        const supabase = createServerActionClient<Database>({ cookies });
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (user) {
                const { data: profileData } = await supabase
                    .from('profiless')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profileData) {
                    const profileId = profileData.id
                    return await supabase.from("tweets").insert({ title: title, user_id: profileId });
                }
            }
        } catch (error) {
            throw new Error(`${error}`)
        }
    };

    return (
        <form action={addTweet}>
            <input name="title" className="bg-inherit" />
        </form>
    );
}