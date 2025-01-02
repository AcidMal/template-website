import type { APIRoute } from 'astro';

interface Tweet {
  id: string;
  text: string;
  created_at: string;
}

const mockTweets: Tweet[] = [
  {
    id: '1',
    text: 'You havent set your Twitter Bearer Token or Username in the .env file',
    created_at: '2024-12-27T17:00:00'
  },
  {
    id: '2',
    text: 'These are sample messages to show you how the Twitter Feed works',
    created_at: '2024-12-27T14:30:00'
  },
  {
    id: '3',
    text: 'Once you have set your Twitter Bearer Token and Username in the .env file, the Twitter Feed will work.',
    created_at: '2024-12-27T09:15:00'
  }
];

export const GET: APIRoute = async ({ request }) => {
  console.log('API route called');
  
  const username = import.meta.env.TWITTER_USERNAME;
  const bearerToken = import.meta.env.TWITTER_BEARER_TOKEN;

  console.log('Environment variables:', { 
    username: username ? 'Set' : 'Not set', 
    bearerToken: bearerToken ? 'Set' : 'Not set' 
  });

  if (!username || !bearerToken) {
    console.error('Twitter credentials not configured');
    return new Response(JSON.stringify({ data: mockTweets, source: 'mock', error: 'Credentials not configured' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    console.log(`Fetching user data for ${username}`);
    const userResponse = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );

    console.log('User response status:', userResponse.status);

    if (!userResponse.ok) {
      const errorData = await userResponse.text();
      console.error('Twitter API Error:', errorData);
      throw new Error(`Failed to fetch user data: ${userResponse.status} ${userResponse.statusText}`);
    }
    
    const userData = await userResponse.json();
    console.log('User data fetched successfully:', userData);
    
    if (!userData.data?.id) {
      console.error('User ID not found in response:', userData);
      throw new Error('Failed to fetch user ID');
    }

    console.log(`Fetching tweets for user ID: ${userData.data.id}`);
    const tweetsResponse = await fetch(
      `https://api.twitter.com/2/users/${userData.data.id}/tweets?tweet.fields=created_at&max_results=5`,
      {
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }
    );

    console.log('Tweets response status:', tweetsResponse.status);

    if (!tweetsResponse.ok) {
      const errorData = await tweetsResponse.text();
      console.error('Twitter API Error:', errorData);
      throw new Error(`Failed to fetch tweets: ${tweetsResponse.status} ${tweetsResponse.statusText}`);
    }

    const tweets = await tweetsResponse.json();
    console.log('Tweets fetched successfully:', tweets);

    return new Response(JSON.stringify({ data: tweets.data, source: 'api' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: unknown) {
    console.error('Detailed Twitter API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(JSON.stringify({ data: mockTweets, source: 'mock', error: errorMessage }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};


