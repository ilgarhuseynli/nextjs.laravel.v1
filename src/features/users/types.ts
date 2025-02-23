export interface User {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  avatar: boolean;
  created_at: number;
  address?: {
    street?: string;
    city?: string;
    country?: string;
    postal_code?: string;
  };
}

export interface UserListResponse {
  data: User[];
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface UserListParams {
  name?: string;
  type?: string;
  role_id?: string;
  limit?: string;
  sort?: string;
  sort_type?: string;
}
