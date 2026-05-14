import { Link } from "react-router-dom";
import { Phone, CalendarCheck } from "lucide-react";
import MobileLayout from "../components/layout/MobileLayout";

export default function Main() {
  return (
    <MobileLayout>
      {/* Top Image Fixed Positioned */}
      <div className="absolute top-0 left-0 right-0 w-full h-[65%] z-0 pointer-events-none bg-[#111111] overflow-hidden">
        {/* 공통 배경 이미지 (jpg/png 둘 다 사용 가능하도록 기본은 jpg로 세팅) */}
        <img 
          src="/images/background.jpg" 
          alt="Background" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('images.unsplash.com')) {
              target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop";
            }
          }}
        />
        
        {/* 배경을 살짝 눌러주어 텍스트와 메인 인물을 돋보이게 하는 오버레이 */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* 인물 누끼 이미지 (가운데 정렬, 하단에 밀착) */}
        <img 
          src="/images/profile.png" 
          alt="Profile" 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[95%] object-contain object-bottom"
          onError={(e) => {
            // Fallback for preview before user uploads their own image
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('images.unsplash.com')) {
              target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop";
              // fallback 이미지가 누끼가 아닌 일반 사진일 경우를 대비해 스타일을 임시로 cover로 변경합니다
              target.className = "absolute inset-0 w-full h-full object-cover";
            }
          }}
        />
        {/* Gradient that fades smoothly into the black background */}
        <div className="absolute bottom-0 left-0 right-0 w-full h-[40%] bg-gradient-to-t from-[#111111] via-[#111111]/70 to-transparent"></div>
      </div>

      {/* 
        This absolute container forces NO SCROLL. 
        It sits precisely at bottom 0 and allows flex-col placement without expanding past viewport height.
      */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-10 flex flex-col justify-end px-5 pb-6 overflow-hidden pointer-events-none">
        
        <div className="flex flex-col w-full pointer-events-auto">
          {/* Profile Title & Sub */}
          <div className="mb-6">
            <h2 className="text-[28px] font-extrabold text-white tracking-tight mb-2 drop-shadow-md">
              이호준 <span className="text-secondary font-medium text-[16px] ml-0.5">지점장</span>
            </h2>
            <p className="text-[14px] text-gray-300 font-medium leading-[1.5] drop-shadow-md">
              복잡한 보험, 명쾌하게 풀어드립니다.<br/>당신의 삶을 위한 가장 안전한 마스터 플랜.
            </p>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-3 w-full mb-6">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 py-5 px-3 rounded-[20px] text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <span className="text-[26px] font-bold text-secondary block mb-1 leading-none tracking-tight">99.8%</span>
              <span className="text-[12px] text-gray-400 font-medium tracking-wide">누적 상담 만족도</span>
            </div>
            <div className="bg-black/40 backdrop-blur-md border border-white/10 py-5 px-3 rounded-[20px] text-center shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              <span className="text-[26px] font-bold text-secondary block mb-1 leading-none tracking-tight">800+</span>
              <span className="text-[12px] text-gray-400 font-medium tracking-wide">누적 컨설팅 건수</span>
            </div>
          </div>
          
          {/* Action Buttons inside the same non-scroll flow */}
          <div className="flex gap-2.5 w-full">
            <a 
              href="tel:010-9905-8064"
              className="w-[110px] shrink-0 flex items-center justify-center gap-1.5 bg-[#2A2A2A] border border-white/5 text-white py-[18px] rounded-[18px] font-bold text-[14px] hover:bg-[#333] transition-colors whitespace-nowrap shadow-lg"
            >
              <Phone size={18} className="text-gray-400 shrink-0" />
              <span className="shrink-0">전화상담</span>
            </a>
            <Link 
              to="/booking" 
              className="flex-1 shrink-0 flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-secondary text-white py-[18px] rounded-[18px] font-extrabold text-[15px] shadow-[0_6px_24px_rgba(0,102,255,0.25)] hover:brightness-110 transition-all whitespace-nowrap"
            >
              <span className="shrink-0">상담 예약하기</span>
              <CalendarCheck size={18} className="shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
