
export type View = 'view-details' | 'view-comparison' | 'view-gallery' | 'view-event-film' | 'view-printing';

export type Theme = 'theme-default' | 'theme-bright' | 'theme-romantic' | 'theme-classic';

export interface Package {
    id: string;
    name: string;
    price: number;
    isCombo?: boolean;
    location_details: string[];
    product_details: string[];
    shooting_service_details: string[];
    wedding_service_details: string[];
    comp_location: string;
    comp_frame: string;
    comp_album: string;
    comp_video: string;
    comp_shoot_outfits: string;
    comp_wedding_level: string;
}

export const themes: Record<Theme, { 
    name: string; 
    emoji: string; 
    accent: string; 
    text: string; 
}> = {
    'theme-default': { name: 'Sang Trọng', emoji: '👑', accent: '#B8860B', text: '#1F2937' },
    'theme-bright': { name: 'Tươi Sáng', emoji: '☀️', accent: '#008080', text: '#111827' },
    'theme-romantic': { name: 'Lãng Mạn', emoji: '💖', accent: '#800020', text: '#4B0000' },
    'theme-classic': { name: 'Cổ Điển', emoji: '📘', accent: '#003366', text: '#1F2937' },
};
