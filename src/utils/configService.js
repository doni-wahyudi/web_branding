/**
 * configService.js
 * Fetches site_config from Supabase and merges with static siteConfig fallback.
 */
import { supabase } from './supabaseClient';
import staticConfig from '../data/siteConfig';

let cachedConfig = null;

export async function getSiteConfig() {
  if (cachedConfig) return cachedConfig;
  if (!supabase) return staticConfig;

  try {
    const { data } = await supabase.from('site_config').select('key, value');
    if (!data?.length) return staticConfig;

    const map = {};
    data.forEach(row => { map[row.key] = row.value; });

    cachedConfig = {
      ...staticConfig,
      name:       map.candidate_name      || staticConfig.name,
      tagline:    map.candidate_tagline   || staticConfig.tagline,
      title:      map.candidate_title     || staticConfig.title,
      fullTitle:  map.candidate_fulltitle || staticConfig.fullTitle,
      party:      map.party               || staticConfig.party,
      partyFull:  map.party_full          || staticConfig.partyFull,
      dapil:      map.dapil               || staticConfig.dapil,
      subtitle:   map.subtitle            || staticConfig.subtitle,
      whatsapp:   map.whatsapp_number     || staticConfig.whatsapp,
      email:      map.email               || staticConfig.email,
      address:    map.address             || staticConfig.address,
      profileImage: map.profile_image_url || null,
      social: {
        instagram: map.social_instagram || staticConfig.social.instagram,
        facebook:  map.social_facebook  || staticConfig.social.facebook,
        twitter:   map.social_twitter   || staticConfig.social.twitter,
        youtube:   map.social_youtube   || staticConfig.social.youtube,
        tiktok:    map.social_tiktok    || staticConfig.social.tiktok,
      },
      stats:     map.stats_json     ? JSON.parse(map.stats_json)     : staticConfig.stats,
      kecamatan: map.kecamatan_json ? JSON.parse(map.kecamatan_json) : staticConfig.kecamatan,
    };
    return cachedConfig;
  } catch (err) {
    console.error('configService: failed to load from Supabase', err.message);
    return staticConfig;
  }
}

/** Invalidate cache so next call re-fetches */
export function invalidateConfigCache() {
  cachedConfig = null;
}
