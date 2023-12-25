import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default function NewTweet() {
    const addTweet = async (formData: FormData) => {
        "use server";
        const title = String(formData.get("title"));
        const supabase = createServerActionClient<Database>({ cookies });
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            await supabase.from("tweets").insert({ title: title, user_id: user.user_metadata?.id });
        }
    };

    return (
        <form action={addTweet}>
            <input name="title" className="bg-inherit" />
        </form>
    );
}