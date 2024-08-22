"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export default function GamePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const password = Cookies.get("password");

    if (password === "3C4deskP") {
      setIsAuthenticated(true);
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handlePlayGame = (path: string) => {
    router.push(path);
  };

  if (isAuthenticated === null) {
    // 認証が完了するまで何も表示しない
    return null;
  }

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">
          矢口くんのゲーム
        </h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Roll a Ball</h2>
            <p className="text-gray-600">
              ボールを転がして、揺れる床に気をつけながらコインを全部取ることを目指す。シンプルながらも中毒性のあるゲーム♪ クリア後特典とかも、実装してみようかな？
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={() => handlePlayGame('/gametest/rollaball')}
                className="inline-block bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
              >
                ゲームをプレイする
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden opacity-50">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">テトリス</h2>
            <p className="text-gray-600">
              定番のパズルゲーム、テトリス！！
            </p>
            <div className="mt-4 text-center">
              <button
                className="inline-block bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                disabled
              >
                テスト中
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden opacity-50">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">花火対決</h2>
            <p className="text-gray-600">
              初めて作った対戦ゲーム♪ 花火を持ち寄り、相手より先に花火が落ちた方が負け！！早く作って、妹と遊びたいな！
            </p>
            <div className="mt-4 text-center">
              <button
                className="inline-block bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                disabled
              >
                テスト中
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden opacity-50">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">未定</h2>
            <p className="text-gray-600">
              いつか妹に配信してもらいたいな...
            </p>
            <div className="mt-4 text-center">
              <button
                className="inline-block bg-gray-400 text-white font-bold py-2 px-4 rounded-lg cursor-not-allowed"
                disabled
              >
                テスト中
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
