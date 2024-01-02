interface TweetData {
    user_has_liked_tweet: boolean;
    likesnumber: number;
    id: string;
    created_at: string;
    title: string;
    user_id: string | null;
    profiiles: {
      avatar_url: string;
      name: string;
      id: string;
      username: string;
    } | null;
    likes: {
      created_at: string;
      id: number;
      tweet_id: string;
      user_id: string;
    }[];
  }
  