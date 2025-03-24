export async function GET() {
  // Direct import of the fetch function
  async function fetchYouTubeVideos() {
    try {
      const YOUTUBE_API_KEY = 'AIzaSyAK9AmKzRz10Y1GjQVDzMU7nC0Sw0LjTxk';
      const CHANNEL_ID = 'UC5exs6N3ojtspNCkF9qfpGg';
      
      const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        success: true,
        message: 'Fetched videos directly from YouTube',
        data: data
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
  
  const result = await fetchYouTubeVideos();
  return Response.json(result);
}
