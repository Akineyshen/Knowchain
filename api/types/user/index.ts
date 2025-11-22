export interface User {
  id: string;
  name: string | null;
  raw_address: string;
  ton_public_key: string | null;
  tokens: number;
  role: string;
  created_at: string;
  updated_at: string;
}
