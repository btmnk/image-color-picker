function componentToHex(component: number): string {
  const hex = component.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

export function rgbToHex(r: number, g: number, b: number): `#${string}` {
  return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}
