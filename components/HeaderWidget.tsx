
import React, { useState, useEffect } from 'react';
import { Settings, Cloud, Footprints } from 'lucide-react';

interface HeaderWidgetProps {
  onSettingsClick: () => void;
}

const HeaderWidget: React.FC<HeaderWidgetProps> = ({ onSettingsClick }) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const dateStr = date.toLocaleDateString('zh-CN', options).replace(/\//g, '-');
    const weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
    return `${dateStr} ${weekday}`;
  };

  const getTimePeriod = (date: Date) => {
    const hour = date.getHours();
    if (hour < 6) return '凌晨';
    if (hour < 12) return '上午';
    if (hour < 13) return '中午';
    if (hour < 18) return '下午';
    return '晚上';
  };

  return (
    <div className="bg-blue-600 rounded-3xl p-6 m-4 relative shadow-lg">
      <div className="flex justify-between items-start">
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold tracking-tighter">{formatTime(now)}</span>
          <span className="text-2xl font-medium">{getTimePeriod(now)}</span>
        </div>
        <button 
          onClick={onSettingsClick}
          className="p-2 bg-white/10 rounded-full active:scale-95 transition-transform"
        >
          <Settings className="w-8 h-8 text-white" />
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <div className="text-2xl font-medium">{formatDate(now)}</div>
        <div className="text-xl text-blue-100">十月 廿九</div> {/* Static placeholder for Lunar as per reference */}
      </div>

      <div className="mt-6 flex justify-between items-center text-xl">
        <div className="flex items-center gap-2">
          <Cloud className="w-6 h-6" />
          <span>阴 20°C</span>
        </div>
        <div className="flex items-center gap-2">
          <Footprints className="w-6 h-6" />
          <span>0步</span>
        </div>
      </div>
    </div>
  );
};

export default HeaderWidget;
