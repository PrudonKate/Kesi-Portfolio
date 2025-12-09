import { supabase } from '../config/supabase';

/**
 * Upload an image to Supabase Storage
 * @param {File} file - The image file to upload
 * @param {string} bucket - The storage bucket name (default: 'portfolio-images')
 * @param {string} folder - The folder path in storage (e.g., 'profile', 'projects')
 * @returns {Promise<string>} - The public URL of the uploaded image
 */
export const uploadImage = async (file, bucket = 'portfolio-images', folder = 'images') => {
  if (!file) throw new Error('No file provided');

  // Create a unique filename
  const timestamp = Date.now();
  const fileExt = file.name.split('.').pop();
  const filename = `${folder}/${timestamp}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  try {
    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Delete an image from Supabase Storage
 * @param {string} imageUrl - The public URL of the image to delete
 * @param {string} bucket - The storage bucket name
 * @returns {Promise<boolean>} - Success status
 */
export const deleteImage = async (imageUrl, bucket = 'portfolio-images') => {
  try {
    // Extract the file path from the URL
    const urlParts = imageUrl.split(`${bucket}/`);
    if (urlParts.length < 2) throw new Error('Invalid image URL');
    
    const filePath = urlParts[1];

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

/**
 * Validate image file
 * @param {File} file - The file to validate
 * @returns {boolean} - Whether the file is valid
 */
export const validateImage = (file) => {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!validTypes.includes(file.type)) {
    alert('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
    return false;
  }

  if (file.size > maxSize) {
    alert('Image size should be less than 5MB');
    return false;
  }

  return true;
};
