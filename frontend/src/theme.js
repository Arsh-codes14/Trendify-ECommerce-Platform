// INFO: Each category gets its own candy colour and emoji, used on cards, tiles and filters.
// Full class names are written out so Tailwind can find them.
export const categoryStyles = {
  Women: { tint: "bg-bubble-light", solid: "bg-bubble", emoji: "👗" },
  Men: { tint: "bg-sky-light", solid: "bg-sky", emoji: "👕" },
  Kids: { tint: "bg-lemon-light", solid: "bg-lemon", emoji: "🧸" },
};

export const getCategoryStyle = (category) =>
  categoryStyles[category] || { tint: "bg-lilac-light", solid: "bg-lilac", emoji: "✨" };
