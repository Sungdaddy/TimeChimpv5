import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {
  TimechimpUser,
  TimechimpProject,
  TimechimpCustomer,
  TimechimpTimeEntry,
  TimechimpTask,
  TimechimpInvoice,
  TimechimpExpense,
  TimechimpMileage,
  TimechimpTag,
  TimechimpApiResponse,
  TimechimpApiError
} from './types.js';

export class TimechimpClient {
  private client: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: 'https://v2.api.timechimp.com',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      timeout: 30000
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const apiError: TimechimpApiError = {
            error: error.response.data?.error || 'API Error',
            message: error.response.data?.message || error.message,
            status_code: error.response.status
          };
          throw apiError;
        }
        throw error;
      }
    );
  }

  // Users API
  async getUsers(): Promise<TimechimpUser[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpUser[]>>('/users');
    return response.data.data;
  }

  async getUserById(id: number): Promise<TimechimpUser> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpUser>>(`/users/${id}`);
    return response.data.data;
  }

  async createUser(user: Partial<TimechimpUser>): Promise<TimechimpUser> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpUser>>('/users', user);
    return response.data.data;
  }

  async updateUser(id: number, user: Partial<TimechimpUser>): Promise<TimechimpUser> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpUser>>(`/users/${id}`, user);
    return response.data.data;
  }

  async deleteUser(id: number): Promise<void> {
    await this.client.delete(`/users/${id}`);
  }

  // Projects API
  async getProjects(): Promise<TimechimpProject[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpProject[]>>('/projects');
    return response.data.data;
  }

  async getProjectById(id: number): Promise<TimechimpProject> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpProject>>(`/projects/${id}`);
    return response.data.data;
  }

  async createProject(project: Partial<TimechimpProject>): Promise<TimechimpProject> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpProject>>('/projects', project);
    return response.data.data;
  }

  async updateProject(id: number, project: Partial<TimechimpProject>): Promise<TimechimpProject> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpProject>>(`/projects/${id}`, project);
    return response.data.data;
  }

  async deleteProject(id: number): Promise<void> {
    await this.client.delete(`/projects/${id}`);
  }

  // Customers API
  async getCustomers(): Promise<TimechimpCustomer[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpCustomer[]>>('/customers');
    return response.data.data;
  }

  async getCustomerById(id: number): Promise<TimechimpCustomer> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpCustomer>>(`/customers/${id}`);
    return response.data.data;
  }

  async createCustomer(customer: Partial<TimechimpCustomer>): Promise<TimechimpCustomer> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpCustomer>>('/customers', customer);
    return response.data.data;
  }

  async updateCustomer(id: number, customer: Partial<TimechimpCustomer>): Promise<TimechimpCustomer> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpCustomer>>(`/customers/${id}`, customer);
    return response.data.data;
  }

  async deleteCustomer(id: number): Promise<void> {
    await this.client.delete(`/customers/${id}`);
  }

  // Time Entries API
  async getTimeEntries(params?: { user_id?: number; project_id?: number; date_from?: string; date_to?: string }): Promise<TimechimpTimeEntry[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpTimeEntry[]>>('/time', { params });
    return response.data.data;
  }

  async getTimeEntryById(id: number): Promise<TimechimpTimeEntry> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpTimeEntry>>(`/time/${id}`);
    return response.data.data;
  }

  async createTimeEntry(timeEntry: Partial<TimechimpTimeEntry>): Promise<TimechimpTimeEntry> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpTimeEntry>>('/time', timeEntry);
    return response.data.data;
  }

  async updateTimeEntry(id: number, timeEntry: Partial<TimechimpTimeEntry>): Promise<TimechimpTimeEntry> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpTimeEntry>>(`/time/${id}`, timeEntry);
    return response.data.data;
  }

  async deleteTimeEntry(id: number): Promise<void> {
    await this.client.delete(`/time/${id}`);
  }

  // Tasks API
  async getTasks(projectId?: number): Promise<TimechimpTask[]> {
    const params = projectId ? { project_id: projectId } : {};
    const response = await this.client.get<TimechimpApiResponse<TimechimpTask[]>>('/tasks', { params });
    return response.data.data;
  }

  async getTaskById(id: number): Promise<TimechimpTask> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpTask>>(`/tasks/${id}`);
    return response.data.data;
  }

  async createTask(task: Partial<TimechimpTask>): Promise<TimechimpTask> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpTask>>('/tasks', task);
    return response.data.data;
  }

  async updateTask(id: number, task: Partial<TimechimpTask>): Promise<TimechimpTask> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpTask>>(`/tasks/${id}`, task);
    return response.data.data;
  }

  async deleteTask(id: number): Promise<void> {
    await this.client.delete(`/tasks/${id}`);
  }

  // Invoices API
  async getInvoices(): Promise<TimechimpInvoice[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpInvoice[]>>('/invoices');
    return response.data.data;
  }

  async getInvoiceById(id: number): Promise<TimechimpInvoice> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpInvoice>>(`/invoices/${id}`);
    return response.data.data;
  }

  async createInvoice(invoice: Partial<TimechimpInvoice>): Promise<TimechimpInvoice> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpInvoice>>('/invoices', invoice);
    return response.data.data;
  }

  async updateInvoice(id: number, invoice: Partial<TimechimpInvoice>): Promise<TimechimpInvoice> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpInvoice>>(`/invoices/${id}`, invoice);
    return response.data.data;
  }

  async deleteInvoice(id: number): Promise<void> {
    await this.client.delete(`/invoices/${id}`);
  }

  // Expenses API
  async getExpenses(params?: { user_id?: number; project_id?: number; date_from?: string; date_to?: string }): Promise<TimechimpExpense[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpExpense[]>>('/expenses', { params });
    return response.data.data;
  }

  async getExpenseById(id: number): Promise<TimechimpExpense> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpExpense>>(`/expenses/${id}`);
    return response.data.data;
  }

  async createExpense(expense: Partial<TimechimpExpense>): Promise<TimechimpExpense> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpExpense>>('/expenses', expense);
    return response.data.data;
  }

  async updateExpense(id: number, expense: Partial<TimechimpExpense>): Promise<TimechimpExpense> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpExpense>>(`/expenses/${id}`, expense);
    return response.data.data;
  }

  async deleteExpense(id: number): Promise<void> {
    await this.client.delete(`/expenses/${id}`);
  }

  // Mileage API
  async getMileage(params?: { user_id?: number; project_id?: number; date_from?: string; date_to?: string }): Promise<TimechimpMileage[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpMileage[]>>('/mileage', { params });
    return response.data.data;
  }

  async getMileageById(id: number): Promise<TimechimpMileage> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpMileage>>(`/mileage/${id}`);
    return response.data.data;
  }

  async createMileage(mileage: Partial<TimechimpMileage>): Promise<TimechimpMileage> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpMileage>>('/mileage', mileage);
    return response.data.data;
  }

  async updateMileage(id: number, mileage: Partial<TimechimpMileage>): Promise<TimechimpMileage> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpMileage>>(`/mileage/${id}`, mileage);
    return response.data.data;
  }

  async deleteMileage(id: number): Promise<void> {
    await this.client.delete(`/mileage/${id}`);
  }

  // Tags API
  async getTags(): Promise<TimechimpTag[]> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpTag[]>>('/tags');
    return response.data.data;
  }

  async getTagById(id: number): Promise<TimechimpTag> {
    const response = await this.client.get<TimechimpApiResponse<TimechimpTag>>(`/tags/${id}`);
    return response.data.data;
  }

  async createTag(tag: Partial<TimechimpTag>): Promise<TimechimpTag> {
    const response = await this.client.post<TimechimpApiResponse<TimechimpTag>>('/tags', tag);
    return response.data.data;
  }

  async updateTag(id: number, tag: Partial<TimechimpTag>): Promise<TimechimpTag> {
    const response = await this.client.put<TimechimpApiResponse<TimechimpTag>>(`/tags/${id}`, tag);
    return response.data.data;
  }

  async deleteTag(id: number): Promise<void> {
    await this.client.delete(`/tags/${id}`);
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.client.get('/users?limit=1');
      return true;
    } catch (error) {
      return false;
    }
  }
} 