const MAX_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function validateImageFile(file: File) {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'INVALID_FILE_TYPE';
  }
  if (file.size === 0) {
    return 'EMPTY_FILE';
  }
  if (file.size > MAX_SIZE) {
    return 'FILE_TOO_LARGE';
  }
  return null;
}

export function errorMessage(code: string) {
  switch (code) {
    case 'INVALID_FILE_TYPE':
      return 'Unsupported file format. Please upload JPG, PNG, or WebP.';
    case 'EMPTY_FILE':
      return 'Please upload a valid image file.';
    case 'FILE_TOO_LARGE':
      return 'Image must be smaller than 10MB';
    case 'MISSING_API_KEY':
      return 'Server is missing REMOVE_BG_API_KEY.';
    default:
      return 'Failed to remove background. Please try again.';
  }
}
