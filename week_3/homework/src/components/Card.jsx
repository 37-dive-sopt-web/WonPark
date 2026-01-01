import { memo } from "react";
import questionImg from "../assets/question.png";

function Card({ value, open, matched, onClick, size = 100 }) {
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
        className={`relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d] ${
          face ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* back */}
        <div className="absolute inset-0 rounded-xl bg-pink-300 text-white flex items-center justify-center [backface-visibility:hidden] shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <img
            src={questionImg}
            alt="?"
            className="w-1/4 h-1/4 object-contain transition-transform duration-300"
          />
        </div>
        {/* front */}
        <div
          className={`absolute inset-0 rounded-xl bg-white flex items-center justify-center text-xl font-mono [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-lg transition-all duration-500 ${
            matched ? "ring-2 ring-pink-400" : ""
          }`}
        >
          {value}
        </div>
      </div>
    </button>
  );
}

export default memo(Card);
