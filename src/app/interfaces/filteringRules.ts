export interface FilteringRule {
  id: number;
  action: string;
  url: string;
  type: string;
  reason?: string;
  ip_usuario?: string;
  role_usuario:  'student' | 'teacher' | 'public';
}

export interface User {
  id: string;
  username: string;
  user_ip: string;
  email: string;
  role: 'student' | 'teacher' | 'public';
}

export interface Hisotry {
  id?: string;
  url: string;
  stateUrl: string;
  type: string;
  userIP?: string;
  role: 'student' | 'teacher' | 'public';
  date: string;
}
