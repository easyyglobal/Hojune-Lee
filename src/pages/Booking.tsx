import { useState } from "react";
import { Check, Calendar as CalendarIcon, Clock, User, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isBefore, startOfDay, isAfter, addMonths, subMonths, isSameMonth } from "date-fns";
import { ko } from "date-fns/locale";
import { SubPageLayout } from "../components/layout/SubPageLayout";
import MobileLayout from "../components/layout/MobileLayout";
import { cn } from "../lib/utils";

// Time slots
const TIMES = [
  "08:00", "09:00", "10:00", "11:00", "13:00", "14:00", 
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00"
];

export default function Booking() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", location: "" });
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  const today = startOfDay(new Date());
  const maxDate = addDays(today, 30); // 한 달 뒤까지만 선택 가능

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setStep((s) => s + 1);
  
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 환경변수 관련 문제 방지를 위해 앱스스크립트 URL을 명시적으로 고정합니다.
      const webhookUrl = "https://script.google.com/macros/s/AKfycbytyN_IrJqK2bI6LDRTDMLpSxWUcWzqCgNzWBovHCuEL7OZHc228JcZ9Or5RaeTzxOa/exec";
      
      const payload = {
        manager: "김별이", // 담당자 구분 (다른 사람 앱으로 만들 때 이 이름을 변경하세요)
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
        time: selectedTime,
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        timestamp: format(new Date(), "yyyy-MM-dd HH:mm:ss")
      };

      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });
      
      setStep(4);
    } catch (error) {
      console.error("Booking submission failed:", error);
      alert("예약 처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim().length > 1 && formData.phone.trim().length > 9 && formData.location.trim().length > 1;

  // Calendar logic
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate
  });

  const nextMonth = () => {
    // maxDate가 포함된 달까지만 넘길 수 있게 제한
    if (isBefore(currentMonth, startOfMonth(maxDate))) {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };
  const prevMonth = () => {
    if (isAfter(currentMonth, startOfMonth(today))) {
      setCurrentMonth(subMonths(currentMonth, 1));
    }
  };

  if (step === 4) {
    return (
      <MobileLayout>
        <div className="flex-1 flex flex-col justify-center items-center text-center p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 size={40} className="text-primary" />
          </div>
          <h2 className="text-[24px] font-extrabold text-primary mb-2">예약 완료!</h2>
          <p className="text-gray-400 mb-8 border-b border-white/10 pb-8 w-full border-dashed leading-relaxed">
            <strong className="text-white">{selectedDate && format(selectedDate, "M월 d일 (E)", { locale: ko })} {selectedTime}</strong><br/>
            요청하신 연락처로 확정 안내를 드리겠습니다.
          </p>
          <a href="/" className="w-full p-[18px] bg-gradient-to-r from-primary to-secondary text-white font-extrabold rounded-[18px] block hover:brightness-110 transition-all shadow-[0_10px_25px_rgba(0,102,255,0.2)]">
            홈으로 돌아가기
          </a>
        </div>
      </MobileLayout>
    );
  }

  return (
    <SubPageLayout title="상담 예약">
      {/* Progress Steps */}
      <div className="flex justify-between items-center mb-8 px-4 relative">
        <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-[#2A2A2A] -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-8 h-[2px] bg-primary -translate-y-1/2 z-0 transition-all duration-300" 
          style={{ width: `${(step - 1) * 50}%` }}
        ></div>
        
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm relative z-10 transition-colors duration-300 shadow-sm",
              step > s ? "bg-primary text-white" : step === s ? "bg-primary text-white ring-4 ring-primary/20" : "bg-[#1A1A1E] text-gray-500 border-2 border-[#2A2A2A]"
            )}
          >
            {step > s ? <Check size={16} /> : s}
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
              <CalendarIcon className="text-primary" size={24} /> 
              날짜를 선택해주세요
            </h2>
            
            {/* Calendar */}
            <div className="bg-[#1A1A1E] rounded-[24px] p-5 border border-white/5 shadow-lg">
              <div className="flex justify-between items-center mb-4 px-2">
                <button onClick={prevMonth} disabled={isSameMonth(currentMonth, today)} className="p-1 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 rounded-full transition-colors text-white">
                  <ChevronLeft size={20} />
                </button>
                <div className="font-bold text-lg text-white">
                  {format(currentMonth, "yyyy. MM")}
                </div>
                <button onClick={nextMonth} disabled={isSameMonth(currentMonth, maxDate)} className="p-1 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5 rounded-full transition-colors text-white">
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                  <div key={day} className="text-[12px] font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-2 gap-x-1">
                {calendarDays.map((day, idx) => {
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isPast = isBefore(day, today);
                  const isTooFar = isAfter(day, maxDate);
                  const isCurrentMonth = isSameMonth(day, currentMonth);
                  const isDisabled = isPast || isTooFar || !isCurrentMonth;
                  const isWeekend = day.getDay() === 0 || day.getDay() === 6;

                  return (
                    <button
                      key={idx}
                      disabled={isDisabled}
                      onClick={() => setSelectedDate(day)}
                      className={cn(
                        "h-10 w-full flex items-center justify-center rounded-full text-[15px] transition-all duration-200 font-medium",
                        isDisabled ? "text-gray-700 opacity-30 cursor-not-allowed" : "cursor-pointer hover:bg-white/10",
                        isSelected ? "bg-primary text-white font-bold shadow-[0_4px_12px_rgba(0,102,255,0.3)] hover:bg-primary" : "",
                        !isSelected && !isDisabled && isWeekend ? "text-red-400" : (!isDisabled && !isSelected ? "text-gray-200" : "")
                      )}
                    >
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
              <Clock className="text-primary" size={24} /> 
              시간을 선택해주세요
            </h2>
            <div className="grid grid-cols-3 gap-3">
              {TIMES.map((time, i) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={i}
                    onClick={() => setSelectedTime(time)}
                    className={cn(
                      "py-4 px-2 rounded-[16px] border text-sm font-semibold transition-all duration-200 focus:outline-none",
                      isSelected
                        ? "bg-primary border-primary text-white shadow-[0_4px_15px_rgba(0,102,255,0.2)]" 
                        : "bg-[#1A1A1E] border-white/5 hover:border-primary/50 text-gray-300"
                    )}
                  >
                    {time}
                  </button>
                )
              })}
            </div>
           </div>
        )}

        {step === 3 && (
           <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 text-white">
              <User className="text-primary" size={24} /> 
              연락처를 남겨주세요
            </h2>
            <p className="text-[14px] text-gray-400 mb-6 bg-[#1A1A1E] p-4 rounded-[16px] border border-white/5 shadow-inner">
              선택하신 일정: <strong className="text-white ml-1">{selectedDate && format(selectedDate, "M월 d일", { locale: ko })} {selectedTime}</strong>
            </p>
            <form id="bookingForm" onSubmit={handleBooking} className="space-y-5">
              <div>
                <label className="block text-[13px] font-semibold text-gray-400 mb-2 ml-1 uppercase tracking-wider">이름</label>
                <input 
                  type="text" 
                  required
                  placeholder="예: 홍길동"
                  className="w-full bg-[#1A1A1E] border border-white/10 rounded-[16px] px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-white placeholder-gray-600"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-400 mb-2 ml-1 uppercase tracking-wider">휴대폰 번호</label>
                <input 
                  type="tel" 
                  required
                  maxLength={13}
                  placeholder="예: 010-0000-0000"
                  className="w-full bg-[#1A1A1E] border border-white/10 rounded-[16px] px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-white placeholder-gray-600"
                  value={formData.phone}
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9]/g, "");
                    if (value.length > 3 && value.length <= 7) {
                      value = `${value.slice(0, 3)}-${value.slice(3)}`;
                    } else if (value.length > 7) {
                      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7, 11)}`;
                    }
                    setFormData(p => ({ ...p, phone: value }));
                  }}
                />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-gray-400 mb-2 ml-1 uppercase tracking-wider">상담 희망 지역</label>
                <input 
                  type="text" 
                  required
                  placeholder="예: 제주시 노형동, 서귀포시 등"
                  className="w-full bg-[#1A1A1E] border border-white/10 rounded-[16px] px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium text-white placeholder-gray-600"
                  value={formData.location}
                  onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                />
              </div>
            </form>
           </div>
        )}
      </div>

      {/* Bottom Action Area */}
      <div className="absolute bottom-6 left-6 right-6">
        {step === 1 && (
          <button 
            disabled={!selectedDate}
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white p-[18px] rounded-[18px] font-extrabold filter disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_10px_25px_rgba(0,102,255,0.2)]"
          >
            다음 단계
          </button>
        )}
        
        {step === 2 && (
          <div className="flex gap-3">
             <button onClick={() => setStep(1)} className="w-[80px] bg-[#1A1A1E] border border-white/10 text-white font-bold rounded-[18px] shrink-0 hover:bg-[#222]">이전</button>
             <button 
              disabled={!selectedTime}
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white p-[18px] rounded-[18px] font-extrabold filter disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_10px_25px_rgba(0,102,255,0.2)] disabled:grayscale"
            >
              다음 단계
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex gap-3">
             <button type="button" onClick={() => setStep(2)} className="w-[80px] bg-[#1A1A1E] border border-white/10 text-white font-bold rounded-[18px] shrink-0 hover:bg-[#222]">이전</button>
             <button 
              type="submit"
              form="bookingForm"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white p-[18px] rounded-[18px] font-extrabold filter disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 shadow-[0_10px_25px_rgba(0,102,255,0.2)] disabled:grayscale"
            >
              {isSubmitting ? "예약 진행 중..." : "예약 완료하기"}
            </button>
          </div>
        )}
      </div>
    </SubPageLayout>
  );
}
