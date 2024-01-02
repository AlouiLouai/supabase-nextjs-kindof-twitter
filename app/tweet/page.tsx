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
        const data = await supabase.from('tweets').select('*, profiiles(*)');
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
      <pre>{JSON.stringify(tweets?.data, null, 2)}</pre>
    </div>
  );
}
