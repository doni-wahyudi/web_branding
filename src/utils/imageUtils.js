/**
 * imageUtils.js
 * 
 * Utility untuk konversi gambar ke WebP dan upload ke Supabase Storage.
 * Digunakan oleh Admin panel saat menambah/mengganti gambar.
 */

import { supabase } from './supabaseClient';

/**
 * Konversi File gambar (PNG/JPG/dll) ke format WebP menggunakan Canvas API.
 * @param {File} file - File gambar asli dari <input type="file">
 * @param {number} quality - Kualitas WebP: 0.0 - 1.0 (default: 0.85)
 * @returns {Promise<File>} - File baru dalam format WebP
 */
export async function convertToWebP(file, quality = 0.85) {
  return new Promise((resolve, reject) => {
    // Jika sudah WebP, langsung return
    if (file.type === 'image/webp') {
      resolve(file);
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Gagal mengkonversi gambar ke WebP'));
            return;
          }
          // Ganti ekstensi filename ke .webp
          const webpName = file.name.replace(/\.[^/.]+$/, '') + '.webp';
          const webpFile = new File([blob], webpName, {
            type: 'image/webp',
            lastModified: Date.now(),
          });
          resolve(webpFile);
        },
        'image/webp',
        quality
      );

      URL.revokeObjectURL(objectUrl);
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Gagal memuat gambar untuk dikonversi'));
    };

    img.src = objectUrl;
  });
}

/**
 * Upload gambar ke Supabase Storage bucket tertentu.
 * Secara otomatis mengkonversi ke WebP sebelum upload.
 * 
 * @param {File} file          - File gambar dari input
 * @param {string} bucket      - Nama bucket Supabase ('post-images', 'profile-images', dll)
 * @param {string} [folder=''] - Subfolder opsional di dalam bucket
 * @param {number} [quality]   - Kualitas WebP (default: 0.85)
 * @returns {Promise<{url: string, path: string}>} - Public URL dan path file
 */
export async function uploadImage(file, bucket, folder = '', quality = 0.85) {
  if (!supabase) {
    throw new Error('Supabase belum terhubung. Periksa file .env');
  }

  // 1. Konversi ke WebP
  const webpFile = await convertToWebP(file, quality);

  // 2. Buat path unik: folder/timestamp-namafile.webp
  const timestamp = Date.now();
  const cleanName = webpFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const filePath = folder
    ? `${folder}/${timestamp}-${cleanName}`
    : `${timestamp}-${cleanName}`;

  // 3. Upload ke Supabase Storage
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, webpFile, {
      cacheControl: '3600',
      upsert: false,
      contentType: 'image/webp',
    });

  if (error) throw error;

  // 4. Ambil public URL
  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    path: data.path,
  };
}

/**
 * Hapus gambar dari Supabase Storage.
 * @param {string} bucket - Nama bucket
 * @param {string} path   - Path file di dalam bucket
 */
export async function deleteImage(bucket, path) {
  if (!supabase) throw new Error('Supabase belum terhubung');

  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
}

/**
 * Buat preview URL lokal dari File object (untuk preview sebelum upload).
 * Selalu konversi ke WebP dulu agar preview sesuai hasil akhir.
 * @param {File} file
 * @returns {Promise<string>} - Object URL untuk ditampilkan di <img src>
 */
export async function createWebPPreview(file) {
  const webpFile = await convertToWebP(file);
  return URL.createObjectURL(webpFile);
}

/**
 * BUCKET MAP — referensi nama bucket per section.
 * Gunakan ini saat memanggil uploadImage() agar konsisten.
 * 
 * @example
 * import { BUCKETS, uploadImage } from '../utils/imageUtils';
 * const { url } = await uploadImage(file, BUCKETS.POSTS);
 */
export const BUCKETS = {
  PROFILE:      'profile-images',      // Foto profil & hero halaman utama
  POSTS:        'post-images',          // Cover artikel/kabar (Kabar page)
  TRACK_RECORD: 'track-record-images',  // Foto rekam jejak/timeline
  ASPIRASI:     'aspirasi-assets',      // QR code & aset aspirasi
  DOCUMENTS:    'documents',            // PDF & dokumen admin (private)
};
