import { useState } from "react";
import useRanking from "../hooks/useRanking";
import Button from "./Button";

export default function Ranking() {
  const { list, clear } = useRanking();
  const [refreshKey, setRefreshKey] = useState(0);
  const rows = list();

  const handleClear = () => {
    clear();
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pb-12">
      <div className="p-6 bg-white rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">랭킹</h2>
          <div className="flex items-center gap-3">
            <Button onClick={handleClear} variant="clear">
              기록 초기화
            </Button>
          </div>
        </div>

        <table className="w-full bg-pink-50 rounded-xl overflow-hidden">
          <thead className="bg-pink-200/60">
            <tr>
              <th className="p-3 text-left w-20">순위</th>
              <th className="p-3 text-left">레벨</th>
              <th className="p-3 text-left">클리어 시간(초)</th>
              <th className="p-3 text-left">기록 시각</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="p-4 text-gray-500" colSpan={4}>
                  아직 기록이 없어요.
                </td>
              </tr>
            ) : (
              rows.map((r, i) => (
                <tr key={`${r.at}-${r.level}`} className="border-t">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">Level {r.level}</td>
                  <td className="p-3">{r.seconds.toFixed(2)}</td>
                  <td className="p-3">{new Date(r.at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
