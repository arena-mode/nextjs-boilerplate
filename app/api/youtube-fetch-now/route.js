import { NextResponse } from 'next/server';
import supabaseClient from '../../utils/supabaseClient';
import youtubeService from '../../utils/youtubeService';

export async function GET() {
  try {
    // Run the sync immediately for the most recent 20 videos
    const result = await youtubeService.syncLatestVideos(supabaseClient, 20);
    
    return NextResponse.json({
      success: true,
      message: `Fetched ${result.videoCount} videos, added ${result.videosAdded} new ones to the database`,
      details: result
    });
  } catch (error) {
    console.error('YouTube immediate fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
