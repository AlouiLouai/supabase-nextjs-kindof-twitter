import { Database as DB } from "@/lib/database.types";

type Tweet = DB["public"]["Tables"]["tweets"]["Row"];
type Profile = DB["public"]["Tables"]["profiiles"]["Row"];

declare global {
    type Database = DB;
    type TweetWithAuthor = Tweet & {
        author: Profile;
        likes: { user_id: string }[];
        user_has_liked_tweet: boolean;
    };
}