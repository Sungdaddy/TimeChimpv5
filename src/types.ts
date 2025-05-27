export interface TimechimpUser {
  id: number;
  name: string;
  email: string;
  role?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpProject {
  id: number;
  name: string;
  description?: string;
  customer_id?: number;
  active?: boolean;
  billable?: boolean;
  hourly_rate?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpCustomer {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpTimeEntry {
  id: number;
  user_id: number;
  project_id: number;
  task_id?: number;
  date: string;
  hours: number;
  description?: string;
  billable?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpTask {
  id: number;
  name: string;
  project_id: number;
  description?: string;
  active?: boolean;
  billable?: boolean;
  hourly_rate?: number;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpInvoice {
  id: number;
  customer_id: number;
  invoice_number: string;
  date: string;
  due_date?: string;
  status: string;
  total_amount: number;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpExpense {
  id: number;
  user_id: number;
  project_id?: number;
  date: string;
  amount: number;
  description?: string;
  category?: string;
  billable?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpMileage {
  id: number;
  user_id: number;
  project_id?: number;
  date: string;
  distance: number;
  description?: string;
  rate_per_km?: number;
  billable?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpTag {
  id: number;
  name: string;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TimechimpApiResponse<T> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    per_page?: number;
  };
}

export interface TimechimpApiError {
  error: string;
  message: string;
  status_code: number;
} 