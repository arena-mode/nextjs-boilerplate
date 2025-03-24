'use client';

/**
 * YouTube Service
 * Handles fetching videos from a YouTube channel
 */

const YOUTUBE_API_KEY = 'AIzaSyAK9AmKzRz10Y1GjQVDzMU7nC0Sw0LjTxk';
const CHANNEL_ID = 'UC5exs6N3ojtspNCkF9qfpGg';

const youtubeService = {
  /**
   * Fetch latest videos from the YouTube channel
   * @param {number} maxResults - Maximum number of videos to fetch
   * @returns {Promise<Array>} - Array of video objects
   */
  async getLatestVideos(maxResults = 10) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.items) {
        return [];
      }
      
      // Format the videos into a more usable structure
      return data.items.map(item => {
        return {
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          publishedAt: item.snippet.publishedAt,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        };
      });
    } catch (error) {
      console.error('Error fetching YouTube videos:', error);
      return [];
    }
  },
  
  /**
   * Get detailed information for a specific video
   * @param {string} videoId - YouTube video ID
   * @returns {Promise<Object>} - Video details
   */
  async getVideoDetails(videoId) {
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoId}&part=snippet,contentDetails,statistics`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`YouTube API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        throw new Error('Video not found');
      }
      
      const video = data.items[0];
      
      return {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnailUrl: video.snippet.thumbnails.high.url,
        duration: video.contentDetails.duration,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        commentCount: video.statistics.commentCount
      };
    } catch (error) {
      console.error('Error fetching video details:', error);
      return null;
    }
  },
  
  /**
   * Store YouTube videos to Supabase content table
   * @param {Object} supabaseClient - Supabase client
   * @param {Array} videos - Array of YouTube video objects
   * @returns {Promise<Array>} - Array of successfully inserted video IDs
   */
  async storeVideosToSupabase(supabaseClient, videos) {
    try {
      const successfulInserts = [];
      
      for (const video of videos) {
        // Check if video already exists in the database
        const { data: existingVideos, error: checkError } = await supabaseClient
          .from('content')
          .select('id')
          .eq('media_url', video.url)
          .limit(1);
        
        if (checkError) {
          console.error('Error checking for existing video:', checkError);
          continue;
        }
        
        // Skip if video already exists
        if (existingVideos && existingVideos.length > 0) {
          console.log(`Video ${video.id} already exists in database`);
          continue;
        }
        
        // Prepare the content object for Supabase
        const contentItem = {
          title: video.title,
          body: video.description,
          media_url: video.url,
          tab: 'videos',
          tier: 'free', // Default to free tier
          created_at: new Date(video.publishedAt).toISOString(),
          notified: false,
          send_notification: false
        };
        
        // Insert the video into Supabase
        const { data, error } = await supabaseClient
          .from('content')
          .insert(contentItem)
          .select();
        
        if (error) {
          console.error('Error inserting video:', error);
          continue;
        }
        
        successfulInserts.push(video.id);
        console.log(`Successfully inserted video ${video.id}`);
      }
      
      return successfulInserts;
    } catch (error) {
      console.error('Error storing videos to Supabase:', error);
      return [];
    }
  },
  
  /**
   * Fetch and store latest YouTube videos
   * @param {Object} supabaseClient - Supabase client
   * @param {number} maxResults - Maximum number of videos to fetch and store
   * @returns {Promise<Object>} - Results of the operation
   */
  async syncLatestVideos(supabaseClient, maxResults = 10) {
    try {
      // Fetch latest videos from YouTube
      const videos = await this.getLatestVideos(maxResults);
      
      if (videos.length === 0) {
        return {
          success: false,
          message: 'No videos fetched from YouTube',
          videosAdded: 0
        };
      }
      
      // Store videos to Supabase
      const successfulInserts = await this.storeVideosToSupabase(supabaseClient, videos);
      
      return {
        success: true,
        message: `Successfully synced ${successfulInserts.length} videos`,
        videoCount: videos.length,
        videosAdded: successfulInserts.length
      };
    } catch (error) {
      console.error('Error syncing YouTube videos:', error);
      return {
        success: false,
        message: `Error syncing videos: ${error.message}`,
        videosAdded: 0
      };
    }
  }
};

export default youtubeService;
