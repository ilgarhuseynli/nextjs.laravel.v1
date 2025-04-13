export type Address = {
  city?: string;
  state?: string;
  street?: string;
  unit?: string;
  latitude?: string;
  longitude?: string;
  country?: string;
  postal_code?: string;
  note?: string;
  is_primary?: boolean;
};

export type Phone = {
  number: string;
  is_primary?: boolean;
};

export type TUserList = {
  id: number;
  email: string;
  phone: string;
  role: string;
  address: Address;
  name: string;
  first_name: string;
  last_name: string;
  avatar: string;
  is_company: boolean;
  image: string;
  created_at: number;
};

export type UserForm = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  addresses: Address[];
  phones: Phone[];
};

export type User = {
  id: number;
  email: string;
  phone: string;
  address: Address;
  first_name: string;
  last_name: string;
  avatar: string;
  is_company: boolean;
  address_list: Address[];
  phones: Phone[];
  birth_date: string;
  type: number;
  gender: number;
  name: string;
  image: string;
  send_notification: boolean;
  administrator_level: string;

  password: string;
  password_confirmation: string;
  created_at: number;
};

export type UserListResponse = {
  data: TUserList[];
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
