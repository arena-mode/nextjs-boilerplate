import { NextResponse } from 'next/server';
import supabaseClient from '../../utils/supabaseClient';
import youtubeService from '../../utils/youtubeService';

export async function GET(request) {
  try {
    // Check for secret token to secure the endpoint
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    
    // Set a secure token - you can change this to something more secure
    const secretToken = 'your-secure-token-here';
    
    if (token !== secretToken) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }
    
    // Run the sync
    const result = await youtubeService.syncLatestVideos(supabaseClient, 10);
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('YouTube sync error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
