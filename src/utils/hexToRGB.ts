export function hexToRGB(hex: string) {
  // Check if the HEX string is valid.
  if (hex.length !== 7 || hex[0] !== "#") {
    return null;
  }

  // Split the HEX string into three pairs of characters.
  const pairs = hex.slice(1).match(/../g);

  // Convert each pair of characters to a decimal number.
  const rgb = pairs!.map((pair) => parseInt(pair, 16));

  // Return the RGB array.
  return rgb;
}
