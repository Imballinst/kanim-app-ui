export const primaryMineshaft = '#353535';
export const secondaryWilliam = '#3c6e71';
export const tertiaryWhite = '#fff';
export const tertiaryAlto = '#d9d9d9';
export const tertiarySanjuan = '#284b63';
export const hexToRGB = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(${r}, ${g}, ${b}, 1)`;
};

// Mixed colors
export const lightSanjuan = hexToRGB(tertiarySanjuan, 0.2);
