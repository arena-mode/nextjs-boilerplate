'use client';

import { createClient } from '@supabase/supabase-js';

// Use environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check for missing environment variables
if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase environment variables are missing!', {
    supabaseUrl,
    supabaseKey,
  });
}

// No non-null assertion ("!") since it's a JavaScript file
const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: 'crypto-bellwether-auth',
  },
});

// Test query on initialization
if (typeof window !== 'undefined') {
  supabaseClient
    .from('content')
    .select('*')
    .limit(1)
    .then(result => {
      console.log('Initialization test query result:', result);
    })
    .catch(error => {
      console.error('Initialization test query error:', error);
    });
}

export default supabaseClient;
