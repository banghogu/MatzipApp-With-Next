import { useEffect } from "react";

import { SiNaver } from "react-icons/si";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [router, status]);

  return (
    <div className="flex flex-col justify-center px-6 lg:px-8 h-[60vh] mt-28">
      <div className="w-full max-w-sm mx-auto">
        <div className="text-2xl italic font-semibold text-center text-blue-800">
          Nextmap
        </div>
        <div className="mt-6 text-2xl font-bold text-center text-gray-600">
          SNS 계정으로 로그인해주세요
        </div>
        <p className="mt-2 text-sm text-center text-gray-600">
          계정이 없다면 자동으로 회원가입이 진행됩니다.
        </p>
      </div>
      <div className="w-full max-w-sm mx-auto mt-10">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => signIn("naver", { callbackUrl: "/" })}
            className="text-white flex gap-3 bg-[#2db400] hover:bg-[#2db400]/90 font-medium rounded-lg w-full px-5 py-4 text-center items-center justify-center"
          >
            <SiNaver className="w-4 h-4" />
            네이버로 로그인
          </button>
        </div>
      </div>
    </div>
  );
}
