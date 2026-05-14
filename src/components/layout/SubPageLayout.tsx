import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MobileLayout from "./MobileLayout";
import React from "react";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

export function SubPageLayout({ title, children }: PageProps) {
  return (
    <MobileLayout>
      <header className="sticky top-0 z-20 bg-[#111111]/90 backdrop-blur-md border-b border-[#2A2A2A] px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="p-2 -ml-2 rounded-full hover:bg-[#1A1A1A] transition-colors text-gray-300 hover:text-primary"
        >
          <ArrowLeft size={24} />
        </Link>
        <h1 className="font-semibold text-[16px] text-white absolute left-1/2 -translate-x-1/2">
          {title}
        </h1>
        <div className="w-10"></div> {/* Spacer for centering */}
      </header>
      
      <main className="flex-1 overflow-y-auto pb-24 p-6 custom-scrollbar text-gray-200">
        {children}
      </main>
    </MobileLayout>
  );
}
