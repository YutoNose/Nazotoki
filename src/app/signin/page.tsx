"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignInPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = () => {
    const correctPassword = "yourPassword";

    if (password === correctPassword) {
      Cookies.set("password", correctPassword, { expires: 1 }); // 1日間有効
      router.push("/");
    } else {
      setError("パスワードが間違っています。");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">矢口くんのページ</h1>
        <input
          type="password"
          placeholder="パスワードを入力"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 mb-4"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <button
          onClick={handleSignIn}
          className="w-full py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors"
        >
          サインイン
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
