import { supabase } from '../config/supabase';
import crypto from 'crypto';
import path from 'path';
import fs from 'fs';

const BUCKET_NAME = 'desana-images';
const UPLOADS_DIR = path.join(__dirname, '../../uploads');

export const storageService = {
  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uniqueSuffix = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}`;
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${uniqueSuffix}-${cleanOriginalName}`;

    // Use local storage if configured
    if (process.env.STORAGE_PROVIDER === 'local') {
      if (!fs.existsSync(UPLOADS_DIR)) {
        try { fs.mkdirSync(UPLOADS_DIR, { recursive: true }); } catch (e) {}
      }
      const filePath = path.join(UPLOADS_DIR, filename);
      await fs.promises.writeFile(filePath, file.buffer);
      return `/uploads/${filename}`;
    }

    // Default to Supabase storage
    if (!supabase) throw new Error("Supabase client not initialized.");

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filename, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw new Error(`Failed to upload to Supabase: ${error.message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filename);

    return publicUrlData.publicUrl;
  },

  async deleteFile(imageUrl: string): Promise<void> {
    if (!supabase || !imageUrl) return;

    try {
      // Extract filename from the URL
      // Example URL: https://xyz.supabase.co/storage/v1/object/public/desana-images/123-file.png
      const parts = imageUrl.split('/');
      const filename = parts[parts.length - 1];
      
      if (filename) {
        await supabase.storage.from(BUCKET_NAME).remove([filename]);
      }
    } catch (e) {
      console.error('Failed to delete file from Supabase', e);
    }
  }
};
