export const LEVELS = {
  1: { rows: 4, cols: 4, limit: 45 },
  2: { rows: 4, cols: 6, limit: 60 },
  3: { rows: 6, cols: 6, limit: 100 },
};

export function buildDeck(level = 1) {
  const { rows, cols } = LEVELS[level] ?? LEVELS[1];
  const total = rows * cols;

  if (total % 2) throw new Error("카드 개수는 짝수여야 합니다");
  const pairs = total / 2;

  const base = Array.from({ length: pairs }, (_, i) => i + 1);

  const duplicated = base.flatMap((v) => [
    { id: `${v}-a`, value: v },
    { id: `${v}-b`, value: v },
  ]);
  return shuffle(duplicated);
}

export function shuffle(array, rng = Math.random) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
