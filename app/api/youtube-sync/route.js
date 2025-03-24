import { NextResponse } from 'next/server';
import supabaseClient from '../../../utils/supabaseClient';

export async function GET() {
  try {
    // First, fetch videos from YouTube
    const YOUTUBE_API_KEY = 'AIzaSyAK9AmKzRz10Y1GjQVDzMU7nC0Sw0LjTxk';
    const CHANNEL_ID = 'UC5exs6N3ojtspNCkF9qfpGg';
    
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Format the videos
    const videos = data.items.map(item => {
      return {
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        url: `https://www.youtube.com/watch?v=${item.id.videoId}`
      };
    });
    
    // Store videos to Supabase
    const results = [];
    
    for (const video of videos) {
      // Check if video already exists
      const { data: existingVideos } = await supabaseClient
        .from('content')
        .select('id')
        .eq('media_url', video.url)
        .limit(1);
      
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
      const { data: newVideo, error } = await supabaseClient
        .from('content')
        .insert({
          title: video.title,
          body: video.description,
          media_url: video.url,
          tab: 'videos',
          tier: 'free',
          created_at: new Date(video.publishedAt).toISOString(),
          notified: false,
          send_notification: false
        })
        .select();
      
      if (error) {
        results.push({
          videoId: video.videoId,
          status: 'error',
          message: error.message
        });
      } else {
        results.push({
          videoId: video.videoId,
          status: 'added',
          contentId: newVideo[0].id
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: `Processed ${videos.length} videos`,
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
