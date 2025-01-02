import React, { useEffect, useState } from 'react';

interface Tweet {
  id: string;
  text: string;
  created_at: string;
}

interface TwitterResponse {
  data: Tweet[];
  source: 'api' | 'mock';
  error?: string;
}

const TwitterFeed: React.FC = () => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dataSource, setDataSource] = useState<'api' | 'mock' | null>(null);

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch('/api/tweets');
        const data: TwitterResponse = await response.json();
        
        setTweets(data.data);
        setDataSource(data.source);
        
        if (data.error) {
          setError(`API Error: ${data.error}`);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tweets:', err);
        setError('Failed to fetch tweets');
        setLoading(false);
      }
    };

    fetchTweets();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Latest Tweets</h2>
      {error && (
        <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
      )}
      {dataSource === 'mock' && (
        <p className="text-yellow-500 dark:text-yellow-400 mb-4">
          Note: Displaying mock data due to API unavailability.
        </p>
      )}
      <div className="space-y-4">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <p className="text-gray-800 dark:text-gray-200">{tweet.text}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {new Date(tweet.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <a
        href={`https://twitter.com/${import.meta.env.PUBLIC_TWITTER_USERNAME}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-purple-400 ease-in-out duration-300 hover:ease-in-out hover:duration-300
        hover:text-purple-600 dark:text-purple-400 hover:ease-in-out hover:duration-300 
        dark:hover:text-purple-300"
      >
        View more on Twitter
      </a>
    </div>
  );
};

export default TwitterFeed;


