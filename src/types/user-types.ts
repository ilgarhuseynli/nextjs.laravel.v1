export type Address = {
  city?: string;
  street?: string;
  country?: string;
  postal_code?: string;
};

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  image: string;
  address: Address;
  phone: string;
  email: string;
  created_at: number;
};

export type UserListResponse = {
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
};

export type UserListParams = {
  name?: string;
  type?: string;
  role_id?: string;
  limit?: string | number;
  sort?: string;
  sort_type?: string;
  page?: string | number;
};
