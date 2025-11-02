export default function Card({ value, open, matched, onClick }) {
  const face = open || matched;
  return (
    <button
      onClick={onClick}
      disabled={matched}
      className="w-16 h-16 [perspective:800px]"
      aria-label={face ? `카드 ${value}` : "뒤집힌 카드"}
    >
      <div
        className={`relative w-full h-full duration-300 [transform-style:preserve-3d] ${
          face ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* back */}
        <div className="absolute inset-0 rounded-xl bg-teal-500 text-white flex items-center justify-center text-lg font-mono [backface-visibility:hidden] shadow">
          ?
        </div>
        {/* front */}
        <div
          className={`absolute inset-0 rounded-xl bg-white flex items-center justify-center text-lg font-mono [backface-visibility:hidden] [transform:rotateY(180deg)] shadow ${
            matched ? "ring-2 ring-pink-400" : ""
          }`}
        >
          {value}
        </div>
      </div>
    </button>
  );
}
