'use client'
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import Likes from "../likes/page";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface TweetsProps {
  session: Session;
}

export default function Tweets({ session }: TweetsProps) {
  const [tweets, setTweets] = useState<TweetWithAuthor[]>();
  const supabase = createClientComponentClient();
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel("realtime tweets")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tweets",
        },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);
  useEffect(() => {
    async function fetchTweets() {
      try {
        const supabase = createClientComponentClient<Database>();
        const data = await supabase.from('tweets').select('*, author: profiiles(*), likes(user_id)');
        if (data) {
          const result = data?.data?.map((tweet) => ({
            ...tweet,
            author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
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
        <div
        key={tweet.id}
        className="border border-gray-800 border-t-0 px-4 py-8 flex"
      >
        <div className="h-12 w-12">
          <Image
            className="rounded-full"
            src={tweet.author.avatar_url}
            alt="tweet user avatar"
            width={48}
            height={48}
          />
        </div>
        <div className="ml-4">
          <p>
            <span className="font-bold">{tweet.author.name}</span>
            <span className="text-sm ml-2 text-gray-400">
              {tweet.author.username}
            </span>
          </p>
          <p>{tweet.title}</p>
          <Likes tweet={tweet} />
        </div>
      </div>
      ))}
    </div>
  );
}
