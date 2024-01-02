'use client'
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse, Session } from "@supabase/supabase-js";
import Likes from "../likes/page";

interface TweetsProps {
  session: Session;
}

export default function Tweets({ session }: TweetsProps) {
  const [tweets, setTweets] = useState<TweetData[]>();

  useEffect(() => {
    async function fetchTweets() {
      try {
        const supabase = createClientComponentClient<Database>();
        const data = await supabase.from('tweets').select('*, profiiles(*), likes(*)');
        if (data) {
            const result = data?.data?.map((tweet) => ({
              ...tweet,
              user_has_liked_tweet: !!tweet.likes.find(
                (like) => like.user_id === session.user.id
              ),
              likesnumber: tweet.likes.length,
            })) ?? [];
          setTweets(result);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }
    fetchTweets();
  }, [tweets]); // Run only on component mount


  return (
    <div>
      {tweets?.map((tweet) => (
        <div key={tweet.id}>
          <p>
            {tweet?.profiiles?.name} {tweet?.profiiles?.username}
          </p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
      ))}
    </div>
  );
}
