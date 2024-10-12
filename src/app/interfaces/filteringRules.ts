export interface FilteringRule {
  id: number;
  action: string;
  url: string;
  type: string;
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
}
export interface Role {
  role_id: number;
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
