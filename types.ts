
export interface Contact {
  id: string;
  name: string;
  wechatName: string;
  phoneNumber: string;
  avatar: string;
  enableWechatVideo: boolean;
  enableWechatAudio: boolean;
}

export type View = 'home' | 'add' | 'edit';
