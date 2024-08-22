"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FiRefreshCcw } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

type DiaryEntry = {
  date: string;
  content: string;
  image?: string;
};

export default function DiaryPage() {

  const router = useRouter(); 
  useEffect(() => {
    const password = Cookies.get("password");

    if (password === "3C4deskP") {
      setIsAuthenticated(true);
    } else {
      router.push("/signin");
    }
  }, [router]);
  
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isDesignChanged, setIsDesignChanged] = useState(false);
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([
    {
      date: "2024-08-22",
      content:
        "ページの仕組みも、少しずつわかってきたから、そろそろデザインを綺麗にしたいな！ ...だけど、日記を書いてもページが更新されない。本当はボタンを押したら追加されるようにしたいんだけど、今はそれだと上手くいかない。ともだちに教わったやり方で実装してみたけど...。 「直感的」って、こういうことじゃない気がするなぁ...。",
      image: "/diaryyaguchi2.png",
    },
    {
      date: "2024-08-21",
      content:
        "ボクの写真が日記に追加できたよ！写真がどこにあるかの設定が間違ってたみたい...。クイズゲームを作った時はうまくいったんだけどなぁ。でも、あの時もなんでかわからないバグがあった気がする。",
      image: "/diaryyaguchi1.png",
    },
    {
      date: "2024-08-20",
      content:
        "日記を書けるページを作ってみたよ！情報局のともだちに教わってそのままコピーして作ってみたけど、なんだかデザインがうまくいかないなあ。写真もうまく表示されないよ... かっこいいページになったら、妹に見せたいな！",
      image: "/images/friends.png",
    },
  ]);

  const circleRef = useRef<HTMLDivElement | null>(null);
  const [currentQuadrant, setCurrentQuadrant] = useState(0);
  const [mouseTrail, setMouseTrail] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const password = Cookies.get("password");

    if (password === "yourPassword") {
      setIsAuthenticated(true);
    } else {
      router.push("/signin");
    }
  }, [router]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons !== 1 || !circleRef.current) return;

    const rect = circleRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    setMouseTrail((prevTrail) => [...prevTrail, { x, y }]);

    const angle = Math.atan2(y, x);
    const quadrant = getQuadrant(angle);

    if (quadrant === currentQuadrant + 1 || (currentQuadrant === 4 && quadrant === 1)) {
      setCurrentQuadrant(quadrant);
    }

    if (currentQuadrant === 4 && quadrant === 1) {
      handleDesignChange(); // Change design when a full circle is completed
      setCurrentQuadrant(0);
      setMouseTrail([]); // Reset trail after successful circle
    }
  };

  const getQuadrant = (angle: number) => {
    if (angle >= 0 && angle < Math.PI / 2) return 1;
    if (angle >= Math.PI / 2 && angle < Math.PI) return 2;
    if (angle >= -Math.PI && angle < -Math.PI / 2) return 3;
    return 4;
  };

  const handleMouseDown = () => {
    toast.error("エラーが発生しました。日記を更新できません。");
    setCurrentQuadrant(0); // Reset on mousedown
    setMouseTrail([]); // Reset trail on mousedown
  };

  const handleDesignChange = () => {
    toast.success("最新の日記を取得しました。");
    setIsDesignChanged(true);
    setDiaryEntries((prevEntries) => [
      {
        date: "2024-08-23",
        content:
          "今日、ページのデザインを大幅に変更したよ！シンプルでモダンな感じにしてみたんだ。色はあまり使わない方が、かっこいいデザインになるんだね。この調子でボクのページを増やしていきたいな。作ったゲームを紹介する/gameページを作ろうかな! ...でも、まだテストだから、URLはその後に「test」をつけておこうっと。今晩までに線香花火ゲームを作らないと。自分の作ったゲームだけど、妹とは正々堂々勝負したいな!",
        image: "/diaryyaguchi3.png",
      },
      ...prevEntries,
    ]);
  };

  if (isAuthenticated === null) {
    return null; // Show nothing while authentication is in progress
  }

  return (
    <main
      className={`min-h-screen p-10 text-white ${isDesignChanged
        ? "bg-white text-black"
        : "bg-gradient-to-b from-gray-900 via-purple-700 to-pink-500"
        }`}
    >
      <Toaster />
      <header className="relative text-center mb-12">
        <h1
          className={`text-6xl font-bold ${isDesignChanged ? "text-black" : "text-yellow-400"
            }`}
        >
          矢口くんの日記
        </h1>
        <p className={`text-lg mt-4 ${isDesignChanged ? "text-gray-700" : "text-pink-300"}`}>
          Webページを作る練習！
        </p>
      </header>

      <section className="relative z-10 overflow-y-scroll h-1/2">
        {diaryEntries.map((entry, index) => (
          <div
            key={index}
            className={`w-full p-6 mb-6 rounded-lg transform ${isDesignChanged
              ? "bg-gray-100 text-black shadow-none rotate-0"
              : "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-yellow-100 rotate-1 shadow-2xl hover:rotate-3"
              } transition-transform duration-500 ease-in-out`}
          >
            <h2
              className={`text-2xl font-semibold ${isDesignChanged ? "text-black" : "text-yellow-300"
                }`}
            >
              {entry.date}
            </h2>
            <p className={`mt-4 text-lg ${isDesignChanged ? "text-gray-700" : "text-pink-100"}`}>
              {entry.content}
            </p>
            {entry.image && (
              <div className="mt-4">
                <Image
                  src={entry.image}
                  alt="Diary entry image"
                  width={400}
                  height={300}
                  className={`rounded-lg transform hover:scale-105 transition-transform duration-300 ${isDesignChanged ? "border border-gray-300 shadow-none" : "border-none shadow-lg"
                    }`}
                />
              </div>
            )}
          </div>
        ))}
      </section>

      <div
        className="mx-auto mt-4 relative w-24 h-24 border-4 border-gray-400 rounded-full flex items-center justify-center"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        ref={circleRef}
      >
        <FiRefreshCcw className="cursor-pointer w-16 h-16 text-gray-400 hover:text-gray-200 absolute z-10" />
      </div>
    </main>
  );
}
