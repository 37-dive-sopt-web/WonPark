const STORAGE_KEY = "memorygame.records";

export default function useRanking() {
  const read = () => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
    } catch {
      return [];
    }
  };
  const write = (rows) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));

  const add = ({ level, seconds }) => {
    const row = {
      level,
      seconds: Math.round(seconds * 100) / 100,
      at: new Date().toISOString(),
    };
    const next = [...read(), row];
    write(next);
    return next;
  };

  const clear = () => write([]);

  const list = () =>
    read().sort((a, b) => b.level - a.level || a.seconds - b.seconds);

  return { add, clear, list };
}
