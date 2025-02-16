import React, { ReactNode } from "react";

interface IphoneProps {
  children: ReactNode;
}

export default function Iphone15pro({ children }: IphoneProps) {
  return (
    <div className="relative mx-auto w-[350px] h-[678px] rounded-[50px] border-[12px] border-gray-400 bg-white shadow-2xl overflow-hidden">

      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-[20px] shadow-md"></div>

      <header className="absolute top-[4.5rem] left-1/2 transform -translate-x-1/2 text-haibu_purple text-5xl font-bold">
        20:23
      </header>

      <div className="absolute top-[45%] -left-[8px] transform -translate-y-[50%] w-[3px] h-[80px] bg-gray-400 rounded"></div>
      <div className="absolute top-[25%] -left-[8px] w-[3px] h-[40px] bg-gray-400 rounded"></div>

      <main className="flex flex-col mt-[3rem] items-center justify-center w-full h-full bg-white rounded-[38px] p-4">
        {children}
      </main>
    </div>
  );
}
