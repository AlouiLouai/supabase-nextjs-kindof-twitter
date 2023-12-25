interface TweetData {
    id: string;
    created_at: string;
    title: string;
    user_id: string | null;
    profiles: {
      avatar_url: string;
      name: string;
      sub: string;
      username: string;
    } | null;
  }
  