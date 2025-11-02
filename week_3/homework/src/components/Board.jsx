// 보드 컴포넌트
import Card from "./Card";

export default function Board({ cards, cols, openIds, matched, onFlip }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, 4rem)` }}
    >
      {cards.map((c) => (
        <Card
          key={c.id}
          value={c.value}
          open={openIds.includes(c.id)}
          matched={matched.has(c.id)}
          onClick={() => onFlip(c.id)}
        />
      ))}
    </div>
  );
}
