export interface FilteringRule {
  id: number;
  action: string;
  url: string;
  type: Types[];
  reason?: string;
  usuarios: User[];  // Lista de usuarios asociados a la regla
  roles: Role[];     // Lista de roles asociados a la regla
}

export interface User {
  id: string;
  username: string;
  userIP: string;
  email: string;
  role: 'student' | 'teacher' | 'public';
  action: 'bloquear' | 'autorizar';
}
export interface Role {
  role_id: number;
  role: 'student' | 'teacher' | 'public';
  action: 'bloquear' | 'autorizar';
}

export interface Hisotry {
  id?: string;
  user_id: number;
  url: string;
  action: string;
  userIP: string;
  user_rol: 'student' | 'teacher' | 'public';
  timestamp: string;
}

export interface Types {
  id: number;
  type: 'sport' | 'politics' | 'social' | 'entertainment' | 'health' | 'news' | 'sport' ;
}
