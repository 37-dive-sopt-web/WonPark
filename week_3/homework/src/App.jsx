import { useEffect, useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import Board from "./components/Board";
import Panel from "./components/Panel";
import Ranking from "./components/Ranking";
import Modal from "./components/Modal";
import Button from "./components/Button";

import useGameLogic from "./hooks/useGameLogic";
import useTimer from "./hooks/useTimer";
import useRanking from "./hooks/useRanking";
import { useMatchConfetti, fireWinConfetti } from "./hooks/useConfetti";

import { LEVELS } from "./game/gameSetup";
import { STATUS } from "./game/rules";

export default function App() {
  const [tab, setTab] = useState("game");
  const hasRecordedRef = useRef(false);

  const {
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
  } = useGameLogic(1);

  const isRunning = status === STATUS.READY;
  const {
    timeRemaining,
    isTimeUp,
    reset: resetTimer,
  } = useTimer(config.limit, isRunning);

  const successPairs = useMemo(() => matched.size / 2, [matched]);
  const remainPairs = useMemo(
    () => pairsTotal - successPairs,
    [pairsTotal, successPairs]
  );

  const { add } = useRanking();

  useMatchConfetti(matched.size);

  useEffect(() => {
    reset(level);
    hasRecordedRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isRunning && isTimeUp) setStatus(STATUS.LOSE);
  }, [isRunning, isTimeUp, setStatus]);

  useEffect(() => {
    if (status === STATUS.IDLE || status === STATUS.READY) {
      hasRecordedRef.current = false;
    }
  }, [status]);

  useEffect(() => {
    let interval = null;
    let timeout = null;

    if (status === STATUS.WIN && !hasRecordedRef.current) {
      const elapsed = LEVELS[level].limit - timeRemaining;
      add({ level, seconds: elapsed });
      hasRecordedRef.current = true;

      interval = fireWinConfetti(3000);
    }
    if (status === STATUS.WIN || status === STATUS.LOSE) {
      timeout = setTimeout(() => {
        reset(level);
        resetTimer();
        hasRecordedRef.current = false;
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [status, level, timeRemaining, add, reset, resetTimer]);

  return (
    <div className="min-h-screen bg-pink-50">
      <Header tab={tab} onChange={setTab} />

      {tab === "game" ? (
        <main className="max-w-5xl mx-auto px-6 pb-12">
          <div className="grid grid-cols-[1fr_22rem] gap-6 p-3 justify-center items-start">
            {/* 보드 */}
            <section className="p-6 bg-pink-100 rounded-2xl w-[700px] h-[700px] flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">게임 보드</h2>
                <Button
                  onClick={() => {
                    reset(level);
                    resetTimer();
                  }}
                >
                  게임 리셋
                </Button>
              </div>
              <div className="flex justify-center items-center flex-1">
                <Board
                  cards={cards}
                  cols={config.cols}
                  rows={config.rows}
                  openIds={openIds}
                  matched={matched}
                  onFlip={flip}
                />
              </div>
            </section>

            {/* 패널 */}
            <Panel
              level={level}
              onChangeLevel={(lv) => {
                reset(lv);
                resetTimer();
              }}
              timeLeft={timeRemaining}
              successPairs={successPairs}
              totalPairs={pairsTotal}
              remainPairs={remainPairs}
              message={
                status === STATUS.WIN
                  ? "축하합니다! 클리어 "
                  : status === STATUS.LOSE
                  ? "시간 초과! 패배 "
                  : message
              }
              history={history.map((h) => ({
                firstValue: h.a,
                secondValue: h.b,
                isMatch: h.ok,
                id: h.ts,
              }))}
            />
          </div>

          {/* 모달 */}
          <Modal
            open={status === STATUS.WIN}
            title="게임 클리어!"
            actions={
              <Button onClick={() => setTab("ranking")}>랭킹 보러가기</Button>
            }
          >
            성공입니다. 3초 후 자동으로 새 게임을 시작합니다.
          </Modal>

          <Modal open={status === STATUS.LOSE} title="아쉽네요 ">
            3초 후 자동으로 새 게임을 시작합니다.
          </Modal>
        </main>
      ) : (
        <Ranking />
      )}
    </div>
  );
}
