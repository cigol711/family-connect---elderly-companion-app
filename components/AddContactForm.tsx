
import React, { useState } from 'react';
import { Camera, ChevronLeft, Play, UserCircle } from 'lucide-react';
import { Contact } from '../types';

interface AddContactFormProps {
  initialContact?: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
}

const AddContactForm: React.FC<AddContactFormProps> = ({ 
  initialContact, 
  onSave, 
  onCancel,
  onDelete 
}) => {
  const [formData, setFormData] = useState<Omit<Contact, 'id'>>({
    name: initialContact?.name || '',
    wechatName: initialContact?.wechatName || '',
    phoneNumber: initialContact?.phoneNumber || '',
    avatar: initialContact?.avatar || '',
    enableWechatVideo: initialContact?.enableWechatVideo ?? true,
    enableWechatAudio: initialContact?.enableWechatAudio ?? true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.wechatName) {
      alert('请填写姓名和微信备注');
      return;
    }
    onSave({
      ...formData,
      id: initialContact?.id || Date.now().toString(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="flex items-center justify-between p-6 bg-white sticky top-0 z-10 shadow-sm">
        <button onClick={onCancel} className="p-2">
          <ChevronLeft className="w-8 h-8" />
        </button>
        <h1 className="text-2xl font-bold">{initialContact ? '修改联系人' : '添加联系人'}</h1>
        <button className="flex items-center gap-1 text-slate-500">
          <Play className="w-5 h-5 fill-slate-500" />
          <span className="font-medium">视频教程</span>
        </button>
      </header>

      <form onSubmit={handleSubmit} className="p-6 space-y-8 max-w-md mx-auto">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-200 flex items-center justify-center border-4 border-white shadow-md">
              {formData.avatar ? (
                <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <UserCircle className="w-20 h-20 text-slate-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 bg-slate-800 p-2 rounded-full cursor-pointer border-2 border-white text-white">
              <Camera className="w-5 h-5" />
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <p className="text-slate-400">点击头像上传/修改对方照片</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xl font-bold flex items-center gap-1">
              姓名 <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
              placeholder="你对ta的称呼，如：张三，李四..."
              className="w-full p-4 rounded-xl bg-slate-100 border-none text-xl outline-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xl font-bold flex items-center gap-1">
              微信备注 <span className="text-rose-500">*</span>
              <span className="text-sm font-normal text-rose-500 ml-2">(与微信内备注保持一致)</span>
            </label>
            <input
              type="text"
              value={formData.wechatName}
              onChange={e => setFormData(p => ({ ...p, wechatName: e.target.value }))}
              placeholder="你在微信里对ta的备注名称..."
              className="w-full p-4 rounded-xl bg-slate-100 border-none text-xl outline-blue-500"
              required
            />
          </div>

          <div className="space-y-4">
            <label className="text-xl font-bold flex items-center gap-1">
              一键拨打 <span className="text-rose-500">*</span>
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 text-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableWechatAudio}
                  onChange={e => setFormData(p => ({ ...p, enableWechatAudio: e.target.checked }))}
                  className="w-6 h-6 rounded-full border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                微信语音
              </label>
              <label className="flex items-center gap-3 text-xl cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enableWechatVideo}
                  onChange={e => setFormData(p => ({ ...p, enableWechatVideo: e.target.checked }))}
                  className="w-6 h-6 rounded-full border-slate-300 text-blue-500 focus:ring-blue-500"
                />
                微信视频
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xl font-bold">手机号码</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={e => setFormData(p => ({ ...p, phoneNumber: e.target.value }))}
              placeholder="ta的手机号"
              className="w-full p-4 rounded-xl bg-slate-100 border-none text-xl outline-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-5 rounded-full text-2xl font-bold shadow-lg active:scale-95 transition-transform"
          >
            保存
          </button>
          {initialContact && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(initialContact.id)}
              className="w-full bg-rose-50 text-rose-500 py-4 rounded-full text-xl font-bold active:bg-rose-100"
            >
              删除联系人
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddContactForm;
