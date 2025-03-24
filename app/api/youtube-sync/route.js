// app/api/youtube-webhook/route.js
import { NextResponse } from 'next/server';
import supabaseClient from '../../utils/supabaseClient';
import youtubeService from '../../utils/youtubeService';
import crypto from 'crypto';

export async function GET(request) {
  // Handle the verification challenge from YouTube
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get('hub.challenge');
  const mode = searchParams.get('hub.mode');
  
  if (mode === 'subscribe' && challenge) {
    return new Response(challenge, { status: 200 });
  }
  
  return new Response('Bad request', { status: 400 });
}

export async function POST(request) {
  try {
    // Verify the request is from YouTube
    const body = await request.text();
    
    // Process the notification and sync the latest videos
    await youtubeService.syncLatestVideos(supabaseClient, 5);
    
    return new Response('OK', { status: 200 });
  } catch (error) {
    console.error('YouTube webhook error:', error);
    return new Response(error.message, { status: 500 });
  }
}
