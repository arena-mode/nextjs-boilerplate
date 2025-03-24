// app/api/youtube-subscribe/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const channelId = 'UC5exs6N3ojtspNCkF9qfpGg';
    const callbackUrl = 'https://your-domain.com/api/youtube-webhook';
    
    // Subscribe to the channel's update feed
    const response = await fetch('https://pubsubhubbub.appspot.com/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'hub.callback': callbackUrl,
        'hub.mode': 'subscribe',
        'hub.topic': `https://www.youtube.com/xml/feeds/videos.xml?channel_id=${channelId}`,
        'hub.verify': 'async',
        'hub.lease_seconds': 864000, // 10 days
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to subscribe: ${response.status}`);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Subscription request sent' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json({ 
      success: false, 
      message: error.message 
    }, { status: 500 });
  }
}
