
import React, { useState } from 'react';
import { Video, Phone, Mic, X, ArrowRight, MessageCircle, Copy, CheckCircle2 } from 'lucide-react';
import { Contact } from '../types';

interface CallModalProps {
  contact: Contact;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
}

const CallModal: React.FC<CallModalProps> = ({ contact, onClose, onEdit }) => {
  const [step, setStep] = useState<'select' | 'guide'>('select');
  const [callType, setCallType] = useState<'video' | 'audio'>('video');
  const [copied, setCopied] = useState(false);

  const handlePhoneCall = () => {
    window.location.href = `tel:${contact.phoneNumber}`;
  };

  const startWechatFlow = (type: 'video' | 'audio') => {
    setCallType(type);
    setStep('guide');
    
    // 自动复制微信备注名，辅助老人如果没跳过去可以搜索
    try {
      navigator.clipboard.writeText(contact.wechatName);
      setCopied(true);
    } catch (err) {
      console.error('Clipboard copy failed', err);
    }
  };

  const launchWechat = () => {
    // 尝试唤起微信
    window.location.href = "weixin://";
    // 延迟一秒后提示如果没成功该怎么办
    setTimeout(() => {
      console.log("WeChat launch triggered");
    }, 1000);
  };

  if (step === 'guide') {
    return (
      <div className="fixed inset-0 z-[60] flex flex-col bg-slate-900 text-white animate-in fade-in zoom-in duration-300">
        <div className="p-6 flex justify-between items-center bg-slate-800">
          <button onClick={() => setStep('select')} className="text-xl flex items-center gap-2">
            <X className="w-8 h-8" /> 返回
          </button>
          <span className="text-xl font-bold">微信呼叫引导</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="w-32 h-32 rounded-3xl overflow-hidden border-4 border-green-500 shadow-2xl shadow-green-500/20">
              <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-3xl font-bold">正在找：{contact.name}</h2>
            <div className="bg-green-600/20 px-4 py-2 rounded-full flex items-center gap-2 border border-green-500/30">
              <MessageCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">微信备注：{contact.wechatName}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-xl flex-shrink-0">1</div>
              <p className="text-2xl leading-relaxed">点击下方蓝色按钮，<span className="text-blue-400 font-bold">打开微信</span></p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-xl flex-shrink-0">2</div>
              <p className="text-2xl leading-relaxed">在微信列表里，点一下<span className="text-green-400 font-bold">“{contact.wechatName}”</span>的头像</p>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold text-xl flex-shrink-0">3</div>
              <p className="text-2xl leading-relaxed">点右下角的<span className="text-orange-400 font-bold">加号(+)</span>，点<span className="text-orange-400 font-bold">{callType === 'video' ? '视频通话' : '语音通话'}</span></p>
            </div>
          </div>

          {copied && (
            <div className="bg-white/10 p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-400 w-6 h-6" />
                <span className="text-lg">已帮您记住了名字</span>
              </div>
              <span className="text-sm opacity-50">搜索时长按可粘贴</span>
            </div>
          )}
        </div>

        <div className="p-6 bg-slate-800 safe-bottom">
          <button 
            onClick={launchWechat}
            className="w-full bg-blue-500 text-white py-8 rounded-[32px] text-3xl font-bold shadow-2xl active:scale-95 transition-transform flex items-center justify-center gap-4"
          >
            去微信找 {contact.name}
            <ArrowRight className="w-10 h-10" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative bg-neutral-900 text-white rounded-t-[50px] p-6 pb-12 animate-in slide-in-from-bottom duration-300 w-full max-w-lg mx-auto border-t border-white/10">
        <div className="w-16 h-1.5 bg-neutral-700 rounded-full mx-auto mb-10" />
        
        <div className="flex items-center gap-6 mb-10">
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-2 border-white/20">
            <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h2 className="text-4xl font-bold mb-2">{contact.name}</h2>
            <p className="text-xl text-neutral-400">微信备注：{contact.wechatName}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <button 
            onClick={() => startWechatFlow('video')}
            className="flex items-center justify-between bg-green-600 text-white p-8 rounded-3xl active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-6">
              <Video className="w-12 h-12 fill-white" />
              <span className="text-3xl font-bold text-left">微信视频<br/><span className="text-lg font-normal opacity-80">面对面聊天</span></span>
            </div>
            <ArrowRight className="w-8 h-8 opacity-50 group-active:opacity-100" />
          </button>

          <button 
            onClick={() => startWechatFlow('audio')}
            className="flex items-center justify-between bg-orange-500 text-white p-8 rounded-3xl active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-6">
              <Mic className="w-12 h-12 fill-white" />
              <span className="text-3xl font-bold text-left">微信语音<br/><span className="text-lg font-normal opacity-80">只说话不看脸</span></span>
            </div>
            <ArrowRight className="w-8 h-8 opacity-50 group-active:opacity-100" />
          </button>

          <button 
            onClick={handlePhoneCall}
            className="flex items-center justify-between bg-blue-600 text-white p-8 rounded-3xl active:scale-[0.98] transition-all group"
          >
            <div className="flex items-center gap-6">
              <Phone className="w-12 h-12 fill-white" />
              <span className="text-3xl font-bold text-left">手机拨打<br/><span className="text-lg font-normal opacity-80">不需要流量</span></span>
            </div>
            <ArrowRight className="w-8 h-8 opacity-50 group-active:opacity-100" />
          </button>

          <div className="grid grid-cols-2 gap-4 mt-4">
             <button 
              onClick={() => onEdit(contact)}
              className="flex items-center justify-center py-5 rounded-2xl text-xl font-bold bg-neutral-800 text-neutral-400 active:bg-neutral-700"
            >
              修改资料
            </button>
            <button 
              onClick={onClose}
              className="flex items-center justify-center py-5 rounded-2xl text-xl font-bold bg-neutral-800 text-rose-500 active:bg-neutral-700"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
