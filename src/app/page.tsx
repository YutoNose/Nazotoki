"use client";

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
    <main className="min-h-screen p-10">
      <section className="grid lg:grid-cols-2 gap-10 mt-10">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-600">日記</h2>
          <p className="mt-4 text-gray-600">
            矢口くんの日記を読む
          </p>
          <a
            href="/diary"
            className="text-indigo-500 hover:underline mt-2 block"
          >
            日記ページにアクセス
          </a>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-600">ゲーム</h2>
          <p className="mt-4 text-gray-600">
            マイゲーム
          </p>
          <a
            href="/game"
            className="text-indigo-500 hover:underline mt-2 block"
          >
            ゲームページにアクセス
          </a>
        </div>
      </section>
    </main>
  );
}
