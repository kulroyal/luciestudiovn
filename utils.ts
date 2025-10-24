// A utility function to optimize image URLs using the images.weserv.nl proxy.
// This service allows for on-the-fly image transformation (resizing, compression, format conversion).
export const optimizeImageUrl = (url: string, width: number, quality = 80): string => {
    if (!url) return '';
    
    // We remove the protocol from the original URL because the proxy requires it.
    const cleanUrl = url.replace(/^https?:\/\//, '');

    // Construct the new URL for the proxy.
    // - url: The target image URL (without protocol).
    // - w: The desired width of the image.
    // - q: The quality of the output image (0-100).
    // - output: The desired format, 'webp' is a modern, efficient format.
    // - il: Interlacing for progressive loading.
    return `https://images.weserv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&q=${quality}&output=webp&il`;
};
