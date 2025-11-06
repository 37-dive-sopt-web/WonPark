import Card from "./Card";

export default function Board({ cards, cols, rows, openIds, matched, onFlip }) {
  const GAP_PX = 12;
  const BOARD_PADDING = 16;

  const cardSizePx =
    rows === 4 && cols === 4
      ? 120
      : rows === 4 && cols === 6
      ? 92
      : rows === 6 && cols === 6
      ? 84
      : 100;

  return (
    <div className="flex justify-center items-center">
      <div
        className="rounded-2xl bg-pink-200/30"
        style={{
          padding: BOARD_PADDING,
        }}
      >
        <div
          className="grid place-items-center"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${GAP_PX}px`,
          }}
        >
          {cards.map((c) => (
            <div
              key={c.id}
              className="w-full h-full flex items-center justify-center"
            >
              <Card
                value={c.value}
                open={openIds.includes(c.id)}
                matched={matched.has(c.id)}
                onClick={() => onFlip(c.id)}
                size={cardSizePx}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
