"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FaBook, FaGamepad } from "react-icons/fa";
import Image from "next/image";

export default function YaguchiKunPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const [buttonSequence, setButtonSequence] = useState<string[]>([]);

  useEffect(() => {
    console.error("正しい答えは、最期から誕生へ向かわなければなりません。")
    const password = Cookies.get("password");

    if (password === "3C4deskP") {
      setIsAuthenticated(true);
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleButtonClick = (button: string) => {
    const newSequence = [...buttonSequence, button];
    setButtonSequence(newSequence);

    const correctSequence = ["ち", "ま", "ぼ", "つ"];
    if (newSequence.length === correctSequence.length) {
      if (JSON.stringify(newSequence) === JSON.stringify(correctSequence)) {
        console.log("演算結果は？？？？？？");
      }
      setButtonSequence([]);
    } else if (newSequence[newSequence.length - 1] !== correctSequence[newSequence.length - 1]) {
      setButtonSequence([]);
    }
  };

  if (isAuthenticated === null) {
    // 認証が完了するまで何も表示しない
    return null;
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700 animate-pulse">矢口くんのページへようこそ！</h1>
      <section className="grid lg:grid-cols-2 gap-10 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FaBook className="text-3xl text-orange-600 mr-2" />
            <h2 className="text-2xl font-semibold text-orange-600">日記</h2>
          </div>
          <p className="mt-4 text-gray-600">
            矢口くんの日記を読んで、日々の出来事を覗いてみよう！
          </p>
          <Image src="/diaryyaguchi1.png" alt="日記イメージ" width={200} height={150} className="my-4 rounded-md" />
          <a
            href="/diary"
            className="text-indigo-500 hover:underline mt-2 block text-center py-2 px-4 bg-indigo-100 rounded-full hover:bg-indigo-200 transition-colors duration-300"
          >
            日記ページにアクセス
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
          <div className="flex items-center mb-4">
            <FaGamepad className="text-3xl text-blue-600 mr-2" />
            <h2 className="text-2xl font-semibold text-blue-600">ゲーム</h2>
          </div>
          <p className="mt-4 text-gray-600">
            矢口くんが作ったオリジナルゲームで遊んでみよう！
          </p>
          <Image src="/floor_texture.jpg" alt="ゲームイメージ" width={200} height={150} className="my-4 rounded-md" />
          <a
            className="text-gray-400 mt-2 block text-center py-2 px-4 mt-12 bg-gray-200 rounded-full cursor-not-allowed"
          >
            未作成
          </a>
        </div>
      </section>
      
      <div className="mt-64 flex gap-4 justify-center">
        <button onClick={() => handleButtonClick("ち")} className="bg-white p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform scale-x-[-1] text-white">
          ち
        </button>
        <button onClick={() => handleButtonClick("ま")} className="bg-white p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform scale-x-[-1] text-white">
          ま
        </button>
        <button onClick={() => handleButtonClick("つ")} className="bg-white p-4 rounded-lg hover:bg-gray-100 transition-colors duration-300 transform scale-x-[-1] text-white">
          つ
        </button>
        <button onClick={() => handleButtonClick("ぼ")} className="bg-white p-4 rounded-lg  hover:bg-gray-100 transition-colors duration-300 transform scale-x-[-1] text-white">
          ぼ
        </button>
      </div>
    </main>
  );
}
