import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const YOUTUBE_API_KEY = 'AIzaSyAK9AmKzRz10Y1GjQVDzMU7nC0Sw0LjTxk';
    const CHANNEL_ID = 'UC5exs6N3ojtspNCkF9qfpGg';
    
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the videos into a usable structure
    const videos = data.items.map(item => {
      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      };
    });
    
    return NextResponse.json({
      success: true,
      message: 'Fetched videos from YouTube channel',
      data: videos
    });
  } catch (error) {
    console.error('YouTube API error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
