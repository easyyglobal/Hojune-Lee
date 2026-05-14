import React from "react";

interface MobileLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-white flex items-center justify-center p-0 md:p-6 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.05) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 40%)'
        }}
      ></div>

      <div className="relative z-10 flex items-center gap-[60px] w-full max-w-[1024px] justify-center">
        {/* Desktop Side Info */}
        <div className="hidden lg:block w-[400px]">
          <div className="inline-flex items-center px-4 py-2 bg-[#1A1A1A] rounded-[30px] border border-primary/20 mb-3 text-[14px] font-semibold text-primary">
            Premium Consulting
          </div>
          <h1 className="text-[40px] lg:text-[46px] font-extrabold leading-[1.2] tracking-tight text-white mb-6">
            당신의 삶을 지키는<br/>가장 <span className="text-primary">합리적인</span> 선택
          </h1>
          <p className="text-[18px] leading-[1.6] text-gray-400 mb-8">
            복잡한 보험 증권, 분석은 전문가에게 맡기고<br/>꼭 필요한 보장만 챙기세요. 거품은 빼고 신뢰는 더했습니다.
          </p>
          
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[12px] font-extrabold">01</div>
              <div className="text-[15px] font-medium text-gray-300">전문가 1:1 맞춤형 컨설팅</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[12px] font-extrabold">02</div>
              <div className="text-[15px] font-medium text-gray-300">내 보험의 정확한 진단과 솔루션</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-[12px] font-extrabold">03</div>
              <div className="text-[15px] font-medium text-gray-300">30초면 끝나는 간편 예약</div>
            </div>
          </div>
        </div>

        {/* Mobile Container */}
        <div className="w-full sm:max-w-[400px] md:max-w-[360px] bg-[#111111] min-h-[100dvh] md:min-h-[680px] md:h-[680px] md:rounded-[48px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] relative z-10 overflow-hidden flex flex-col mx-auto md:border-[8px] md:border-[#1F1F1F]">
          {children}
        </div>
      </div>
    </div>
  );
}
