export interface FilteringRule {
  id: string;
  action: string;
  url: string;
  type: string;
  reason?: string;
  userIP?: string;
  role:  'student' | 'teacher' | 'public';
}

export interface User {
  id: string;
  username: string;
  user_ip: string;
  email: string;
  role: 'student' | 'teacher' | 'public';
}
