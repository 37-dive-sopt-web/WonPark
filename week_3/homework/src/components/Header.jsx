import Button from "./Button";

export default function Header({ tab, onChange }) {
  return (
    <header className="max-w-5xl mx-auto px-6 py-4">
      <div className="bg-white rounded-3xl px-6 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">숫자카드 짝맞추기</h1>
        <nav className="flex gap-2">
          <Button
            type="button"
            aria-pressed={tab === "game"}
            variant={tab === "game" ? "tab-active" : "tab-inactive"}
            onClick={() => onChange("game")}
            className="shadow-sm disabled:opacity-60"
          >
            게임
          </Button>
          <Button
            type="button"
            aria-pressed={tab === "ranking"}
            variant={tab === "ranking" ? "tab-active" : "tab-inactive"}
            onClick={() => onChange("ranking")}
            className="shadow-sm disabled:opacity-60"
          >
            랭킹
          </Button>
        </nav>
      </div>
    </header>
  );
}
