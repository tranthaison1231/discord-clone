export interface User {
  id: number;
  name: string;
  avatar: string;
  roles: string[];
  backgroundColor: string;
}

export interface Message {
  id: number;
  sender: User;
  createdAt: string;
  message: string;
}
