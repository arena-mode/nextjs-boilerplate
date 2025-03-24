import { NextResponse } from 'next/server';
import supabaseClient from '../../../utils/supabaseClient';
import youtubeService from '../../../utils/youtubeService';

export async function GET() {
  try {
    // Run the sync immediately
    const result = await youtubeService.syncLatestVideos(supabaseClient, 20);
    
    return NextResponse.json({
      success: true,
      message: `Fetched videos from YouTube channel`,
      details: result
    });
  } catch (error) {
    console.error('YouTube fetch error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
