import { createTheme } from "@mantine/core";

// Agricultural Green palette for AgroMarket
export const mantineTheme = createTheme({
  primaryColor: "agro-green",
  fontFamily: "system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  headings: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    fontWeight: "700",
  },
  colors: {
    // Agricultural Earth & Green palette
    "agro-green": [
      "#f0f8f0", // 0 - Very light green
      "#d3e8d3", // 1 - Light green
      "#a8d5a8", // 2 - Soft green
      "#7cbd7c", // 3 - Medium green
      "#5ba85b", // 4 - Primary green
      "#3d8a3d", // 5 - Dark green
      "#2d6b2d", // 6 - Forest green
      "#1f4c1f", // 7 - Deep forest green
      "#122e12", // 8 - Very dark green
      "#0a1a0a", // 9 - Almost black green
    ],
    "agro-earth": [
      "#fefbf3", // 0 - Cream
      "#f5ede1", // 1 - Light beige
      "#e8d4b8", // 2 - Soft beige
      "#daba8e", // 3 - Medium earth
      "#cc9f64", // 4 - Golden earth
      "#b8843a", // 5 - Primary earth
      "#906b2e", // 6 - Dark earth
      "#6b5025", // 7 - Deep earth
      "#463518", // 8 - Very dark earth
      "#2a2010", // 9 - Almost black earth
    ],
  },
  defaultRadius: "md",
});

