'use client';
import supabaseClient from './supabaseClient';

// Function to check if admin is logged in
export const checkAdminAuth = async () => {
  try {
    // Admin auth is done using a special email address
    const { data: { session } } = await supabaseClient.auth.getSession();
    
    if (session) {
      // We have an active session
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error checking auth status:', error);
    return false;
  }
};

// Function to log in as admin
export const loginAsAdmin = async (password) => {
  try {
    if (password !== 'CryptoBellwether') {
      return { success: false, error: 'Invalid password' };
    }
    
    // Use a special admin email with magic link (no need to send actual email)
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: 'admin@cryptobellwether.com',
      password: 'CryptoBellwether'
    });
    
    if (error) {
      throw error;
    }
    
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: error.message };
  }
};

// Function to log out
export const logout = async () => {
  try {
    await supabaseClient.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { success: false, error: error.message };
  }
};
