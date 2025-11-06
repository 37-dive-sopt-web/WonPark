import questionImg from "../assets/question.png";

export default function Card({ value, open, matched, onClick, size = 100 }) {
  const face = open || matched;

  return (
    <button
      onClick={onClick}
      disabled={matched}
      className="aspect-square [perspective:800px] flex items-center justify-center"
      aria-label={face ? `카드 ${value}` : "뒤집힌 카드"}
      style={{ width: `${size}px` }}
    >
      <div
        className={`relative w-full h-full duration-300 [transform-style:preserve-3d] ${
          face ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* back */}
        <div className="absolute inset-0 rounded-xl bg-pink-300 text-white flex items-center justify-center [backface-visibility:hidden] shadow">
          <img
            src={questionImg}
            alt="?"
            className="w-1/4 h-1/4 object-contain"
          />
        </div>
        {/* front */}
        <div
          className={`absolute inset-0 rounded-xl bg-white flex items-center justify-center text-xl font-mono [backface-visibility:hidden] [transform:rotateY(180deg)] shadow ${
            matched ? "ring-2 ring-pink-400" : ""
          }`}
        >
          {value}
        </div>
      </div>
    </button>
  );
}
