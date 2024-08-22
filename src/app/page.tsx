"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function YaguchiKunPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const password = Cookies.get("password");

    if (password === "yourPassword") {
      setIsAuthenticated(true);
    } else {
      router.push("/signin");
    }
  }, [router]);

  if (isAuthenticated === null) {
    // 認証が完了するまで何も表示しない
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-10">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-yellow-600">矢口くんのページ</h1>
        <p className="text-lg text-gray-700 mt-4">理工展公式マスコットキャラクター</p>
      </header>

      <section className="flex flex-col items-center">
        <Image
          src="/path_to_your_image/bloom______.png" // Ensure the image is placed correctly in the public folder
          alt="矢口くん"
          width={320}
          height={370}
          className="rounded-lg shadow-lg mb-8"
        />
      </section>

      <section className="grid lg:grid-cols-2 gap-10 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-600">日記</h2>
          <p className="mt-4 text-gray-600">
            ここには矢口くんの日記や最新情報が表示されます。イベントの思い出や活動報告をお楽しみください。
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600">ゲーム</h2>
          <p className="mt-4 text-gray-600">
            矢口くんが登場するゲームの情報をここに掲載します。理工展のテーマ「ピース」を撃ち出して楽しむシューティングゲームなどが紹介されます。
          </p>
          <a
            href="https://wce.jp/works/game/?name=yaguchi-kun"
            className="text-indigo-500 hover:underline mt-2 block"
            target="_blank"
            rel="noopener noreferrer"
          >
            ゲームをプレイする
          </a>
        </div>
      </section>
    </main>
  );
}
