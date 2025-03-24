import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Supabase credentials
    const SUPABASE_URL = 'https://sosrdqwwmyzvnspfmyjd.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNvc3JkcXd3bXl6dm5zcGZteWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjIwMTAsImV4cCI6MjA1ODIzODAxMH0.3AQ3bXJh-KDw7KMlsLQAm5hkaYJultt3HX4febYhrAQ';
    
    // YouTube API parameters
    const YOUTUBE_API_KEY = 'AIzaSyAK9AmKzRz10Y1GjQVDzMU7nC0Sw0LjTxk';
    const CHANNEL_ID = 'UC5exs6N3ojtspNCkF9qfpGg';
    
    // Fetch videos from YouTube
    const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
    const ytResponse = await fetch(youtubeUrl);
    
    if (!ytResponse.ok) {
      throw new Error(`YouTube API error: ${ytResponse.status}`);
    }
    
    const ytData = await ytResponse.json();
    
    // Process videos
    const results = [];
    
    for (const item of ytData.items) {
      const video = {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      };
      
      // Check if video already exists in Supabase
      const checkUrl = `${SUPABASE_URL}/rest/v1/content?media_url=eq.${encodeURIComponent(video.url)}&select=id`;
      const checkResponse = await fetch(checkUrl, {
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`
        }
      });
      
      if (!checkResponse.ok) {
        results.push({
          videoId: video.videoId,
          status: 'error',
          message: `Failed to check for existing video: ${checkResponse.status}`
        });
        continue;
      }
      
      const existingVideos = await checkResponse.json();
      
      // Skip if video already exists
      if (existingVideos && existingVideos.length > 0) {
        results.push({
          videoId: video.videoId,
          status: 'skipped',
          message: 'Video already exists'
        });
        continue;
      }
      
      // Add to content table
      const insertUrl = `${SUPABASE_URL}/rest/v1/content`;
      const insertResponse = await fetch(insertUrl, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify({
          title: video.title,
          body: video.description,
          media_url: video.url,
          tab: 'videos',
          tier: 'free',
          created_at: new Date(video.publishedAt).toISOString(),
          notified: false,
          send_notification: false
        })
      });
      
      if (!insertResponse.ok) {
        results.push({
          videoId: video.videoId,
          status: 'error',
          message: `Failed to insert video: ${insertResponse.status}`
        });
        continue;
      }
      
      const newVideo = await insertResponse.json();
      results.push({
        videoId: video.videoId,
        status: 'added',
        contentId: newVideo[0].id
      });
    }
    
    return NextResponse.json({
      success: true,
      message: `Processed ${ytData.items.length} videos`,
      results
    });
  } catch (error) {
    console.error('YouTube sync error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
