import { useEffect, useMemo, useRef, useState } from "react";
import { buildDeck, LEVELS } from "../game/gameSetup";
import { STATUS } from "../game/rules";

export default function useGameLogic(initialLevel = 1) {
  const [level, setLevel] = useState(initialLevel);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [cards, setCards] = useState([]);
  const [openIds, setOpenIds] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("카드를 눌러 게임을 시작");
  const lockRef = useRef(false);

  const config = LEVELS[level];
  const pairsTotal = useMemo(() => (config.rows * config.cols) / 2, [config]);

  const reset = (nextLevel = level) => {
    setLevel(nextLevel);
    setCards(buildDeck(nextLevel));
    setMatched(new Set());
    setOpenIds([]);
    setHistory([]);
    setMessage("카드를 눌러 게임을 시작");
    setStatus(STATUS.IDLE);
  };

  const flip = (cardId) => {
    if (lockRef.current) {
      setMessage("두 장 비교 중이에요");
      return;
    }

    if (status === STATUS.IDLE) {
      setStatus(STATUS.READY);
    }

    if (status !== STATUS.READY && status !== STATUS.IDLE) return;

    if (matched.has(cardId)) {
      setMessage("이미 매치된 카드예요");
      return;
    }
    if (openIds.includes(cardId)) {
      setMessage("이미 선택한 카드예요");
      return;
    }
    if (openIds.length === 2) {
      setMessage("동시에 두 장까지만 선택 가능");
      return;
    }

    const nextOpen = [...openIds, cardId];
    setOpenIds(nextOpen);
    setMessage(nextOpen.length === 1 ? "한 장 더 선택하세요" : "비교 중...");

    if (nextOpen.length === 2) {
      lockRef.current = true;
      const [a, b] = nextOpen;
      const ca = cards.find((c) => c.id === a);
      const cb = cards.find((c) => c.id === b);
      const ok = ca.value === cb.value;

      setHistory((prev) => [
        { a: ca.value, b: cb.value, ok, ts: Date.now() },
        ...prev,
      ]);

      setTimeout(
        () => {
          if (ok) {
            setMatched((prev) => new Set([...prev, a, b]));
            setMessage("매치 성공!");
          } else {
            setMessage("불일치! 다시 시도");
          }
          setOpenIds([]);
          lockRef.current = false;
        },
        ok ? 120 : 700
      );
    }
  };

  useEffect(() => {
    if (
      status === STATUS.READY &&
      matched.size === cards.length &&
      cards.length
    ) {
      setStatus(STATUS.WIN);
    }
  }, [matched, cards, status]);

  return {
    level,
    config,
    status,
    cards,
    openIds,
    matched,
    history,
    message,
    reset,
    flip,
    setStatus,
    pairsTotal,
  };
}
