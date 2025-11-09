function StatCard({ label, children }) {
  return (
    <div className="px-4 py-3 bg-white rounded-2xl text-center shadow-sm">
      <p className="text-sm text-gray-700 mb-1">{label}</p>
      <p className="text-2xl font-extrabold flex  justify-center ">
        {children}
      </p>
    </div>
  );
}

export default function Panel({
  level = 1,
  onChangeLevel,
  timeLeft = 45.0,
  successPairs = 0,
  totalPairs = 8,
  remainPairs = 8,
  message = "카드를 눌러 게임을 시작",
  history = [],
}) {
  return (
    <aside className="p-5 w-96 bg-pink-100 rounded-3xl">
      <div className="mb-4">
        <select
          aria-label="게임 레벨 선택"
          className="w-full px-4 py-3 rounded-2xl bg-white shadow-sm"
          value={level}
          onChange={(e) => onChangeLevel?.(Number(e.target.value))}
        >
          <option value={1}>Level 1</option>
          <option value={2}>Level 2</option>
          <option value={3}>Level 3</option>
        </select>
      </div>
      {/* 카드 3개 */}
      <div className="mb-4 grid grid-cols-3 gap-3 ">
        <StatCard label="남은 시간">
          <span className="whitespace-nowrap inline-block">
            {timeLeft.toFixed(2)}
          </span>
        </StatCard>
        <StatCard label="성공한 짝">
          {successPairs}/{totalPairs}
        </StatCard>
        <StatCard label="남은 짝">{remainPairs}</StatCard>
      </div>
      {/* 안내 메시지 */}
      <h3 className="text-lg font-semibold text-black mb-2">안내 메세지</h3>
      <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
        <p className="text-sm text-gray-700 mb-1">{message}</p>
      </div>
      {/* 히스토리 목록 */}
      <h3 className="text-lg font-semibold text-black mb-2">히스토리</h3>
      <div className="bg-white rounded-2xl p-4 mb-6 min-h-[320px] flex flex-col gap-2">
        {history.length === 0 && (
          <div className="text-gray-400">아직 뒤집은 카드가 없어요</div>
        )}
        {history.map((h) => (
          <div
            key={h.id}
            className="flex justify-between items-center px-3 py-2 bg-white rounded-lg border border-gray-200"
          >
            <span
              className={`font-bold ${
                h.isMatch ? "text-green-500" : "text-red-500"
              }`}
            >
              {h.firstValue},{h.secondValue}
            </span>
            <span className="text-black font-bold">
              {h.isMatch ? "성공" : "실패"}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
}
