import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import AuthButtonServer from './auth-button-server';
import { redirect } from 'next/navigation';
import { insertOrUpdateProfile } from './utils/insert-profile';
import NewTweet from './new-tweet';
import Tweets from './tweet/page';

export default async function Home() {

  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }
  insertOrUpdateProfile(supabase);

  return (
    <>
      <AuthButtonServer />
      <NewTweet />
      <Tweets />
    </>
  )
}
