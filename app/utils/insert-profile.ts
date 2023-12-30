import { SupabaseClient } from "@supabase/supabase-js";

let middlewareHasRun = false; // Variable to track if middleware has run

export async function insertOrUpdateProfileMiddleware(supabase: SupabaseClient) {
  try {
    const { data } = await supabase.auth.getUser();

    // Check if there's a connected user and the middleware hasn't run yet
    if (data && !middlewareHasRun) {
      middlewareHasRun = true; // Set the flag to indicate the middleware has run

      const userMetadata = data?.user?.user_metadata;
      const userId = data?.user?.id

      if (userMetadata) {
        const exist = await supabase.from('profiless').select().eq('id', userId).single();
        console.log('exist:', exist);

        if (!exist.error && !exist.data) {
          const insertResult = await supabase.from('profiless').insert({
            id: userId,
            avatar_url: userMetadata.avatar_url,
            name: userMetadata.name,
            username: userMetadata.user_name
          });
          return insertResult;
        } else {
          console.error('User already exists in the database or an error occurred:', exist.error);
        }
      } else {
        console.error('User metadata not available.');
        return null;
      }
    } else {
      console.error('No connected user or middleware already executed.');
      return null;
    }
  } catch (error) {
    console.error('Error running profile middleware:', error);
    throw error;
  }
}

