export type UserRole = "admin" | "member";

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceHistory {
  id: string;
  user_id: string;
  client_id: string;
  service_name: string;
  service_date: string; // YYYY-MM-DD
  notes: string | null;
  created_at: string;
}

export type ApiResponse<T> =
  | { data: T; error: null }
  | { data: null; error: string };
