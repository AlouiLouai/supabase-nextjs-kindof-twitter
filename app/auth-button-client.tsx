"use client";

import {
    Session,
    createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function AuthButtonClient({
    session,
}: {
    session: Session | null;
}) {
    const supabase = createClientComponentClient<Database>();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        // Remove the session cookie upon logout
        deleteCookie("sb:glhesrjbuishlmqiuayo-auth-token"); // Replace "sb:token" with your Supabase cookie name
        router.refresh();
    };

    const handleSignIn = async () => {
        await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: "http://localhost:3000/auth/callback",
            },
        });
    };

    return session ? (
        <button onClick={handleSignOut}>Logout</button>
    ) : (
        <button onClick={handleSignIn}>Login</button>
    );
}