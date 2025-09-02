// Professional avatar generator for attorneys
// Uses a deterministic approach to generate diverse, professional avatars

const avatarStyles = {
  // Professional avatar characteristics
  styles: [
    'adventurer',
    'avataaars',
    'big-ears',
    'big-smile',
    'lorelei',
    'micah',
    'open-peeps',
    'personas'
  ],
  
  // Professional color palettes for backgrounds
  backgrounds: [
    '1e40af', // Professional blue
    '059669', // Professional teal
    'dc2626', // Professional red
    '7c3aed', // Professional purple
    'ea580c', // Professional orange
    '0891b2', // Professional cyan
    '4f46e5', // Professional indigo
    '16a34a', // Professional green
    'e11d48', // Professional rose
    '2563eb', // Professional blue alt
  ]
};

// Generate a professional avatar URL based on attorney data
export const getProfessionalAvatar = (attorney, size = 200) => {
  // Create a unique seed from attorney name
  const seed = attorney.name || attorney.initials || 'Attorney';
  const nameForAvatar = encodeURIComponent(seed);
  
  // Use a deterministic hash to select avatar style
  const hashCode = seed.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  const styleIndex = Math.abs(hashCode) % avatarStyles.styles.length;
  const bgIndex = Math.abs(hashCode) % avatarStyles.backgrounds.length;
  const style = avatarStyles.styles[styleIndex];
  const background = avatarStyles.backgrounds[bgIndex];
  
  // Use DiceBear Avatars API for professional, diverse avatars
  // This service generates professional, vector-style avatars with diverse characteristics
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${nameForAvatar}&backgroundColor=${background}&radius=10&size=${size}`;
};

// Get avatar with initials fallback (for compatibility)
export const getAvatarUrl = (attorney, size = 200) => {
  // First try to use professional avatar
  if (attorney.avatarUrl) {
    return attorney.avatarUrl;
  }
  
  // Use professional avatar generator
  return getProfessionalAvatar(attorney, size);
};

// Legacy UI Avatars for simple initials (keeping for backward compatibility)
export const getInitialsAvatar = (initials, background = '002e69', size = 64) => {
  return `https://ui-avatars.com/api/?name=${initials}&background=${background}&color=fff&size=${size}`;
};

// Generate diverse professional avatars for showcase
export const getShowcaseAvatars = () => {
  const showcaseAttorneys = [
    { name: 'Michael Wilson', role: 'Senior Attorney' },
    { name: 'Sarah Chen', role: 'Partner' },
    { name: 'Marcus Johnson', role: 'Associate' },
    { name: 'Emily Rodriguez', role: 'Senior Counsel' },
    { name: 'David Kim', role: 'Attorney' },
    { name: 'Jessica Thompson', role: 'Partner' }
  ];
  
  return showcaseAttorneys.map(attorney => ({
    ...attorney,
    avatar: getProfessionalAvatar(attorney, 64)
  }));
};

export default {
  getProfessionalAvatar,
  getAvatarUrl,
  getInitialsAvatar,
  getShowcaseAvatars
};