import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import { insertOrUpdateProfileMiddleware } from './utils/insert-profile';
import NewTweet from './new-tweet';
import Tweets from './tweet/page';
import createProfile from './utils/insert-profiles';

export default async function Home() {

  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  createProfile(supabase);

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      <Tweets />
    </>
  )
}
