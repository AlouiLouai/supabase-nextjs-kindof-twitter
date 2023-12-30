interface TweetData {
    id: string;
    created_at: string;
    title: string;
    user_id: string | null;
    profiless: {
      avatar_url: string;
      name: string;
      id: string;
      username: string;
    } | null;
  }
  