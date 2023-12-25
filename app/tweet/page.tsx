'use client'
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

export default function Tweets() {
  const [tweets, setTweets] = useState<PostgrestSingleResponse<TweetData[]> | null>(null);

  useEffect(() => {
    async function fetchTweets() {
      try {
        const supabase = createClientComponentClient<Database>();
        const data = await supabase.from('tweets').select('*, profiles(*)');
        if (data) {
          setTweets(data);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    }

    fetchTweets();
  }, [tweets]); // Run only on component mount

  return (
    <div>
      {tweets?.data?.map((tweet) => (
        <div key={tweet.id}>
          {/* Display your tweet data here */}
          <p>{tweet.title}</p>
          <p>{tweet.created_at}</p>
          <p>{tweet.profiles?.name}</p>
          <p>{tweet.profiles?.username}</p>
          <p>{tweet.profiles?.avatar_url}</p>
          <p>------------------</p>
        </div>
      ))}
    </div>
  );
}
