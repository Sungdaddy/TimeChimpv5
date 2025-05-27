#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import { TimechimpClient } from './client.js';
import { z } from 'zod';

// Validation schemas
const GetByIdSchema = z.object({
  id: z.number().int().positive(),
});

const GetTimeEntriesSchema = z.object({
  user_id: z.number().int().positive().optional(),
  project_id: z.number().int().positive().optional(),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
});

const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  role: z.string().optional(),
  active: z.boolean().optional(),
});

const CreateProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  customer_id: z.number().int().positive().optional(),
  active: z.boolean().optional(),
  billable: z.boolean().optional(),
  hourly_rate: z.number().positive().optional(),
});

const CreateCustomerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  active: z.boolean().optional(),
});

const CreateTimeEntrySchema = z.object({
  user_id: z.number().int().positive(),
  project_id: z.number().int().positive(),
  task_id: z.number().int().positive().optional(),
  date: z.string(),
  hours: z.number().positive(),
  description: z.string().optional(),
  billable: z.boolean().optional(),
});

const CreateTaskSchema = z.object({
  name: z.string().min(1),
  project_id: z.number().int().positive(),
  description: z.string().optional(),
  active: z.boolean().optional(),
  billable: z.boolean().optional(),
  hourly_rate: z.number().positive().optional(),
});

const CreateExpenseSchema = z.object({
  user_id: z.number().int().positive(),
  project_id: z.number().int().positive().optional(),
  date: z.string(),
  amount: z.number().positive(),
  description: z.string().optional(),
  category: z.string().optional(),
  billable: z.boolean().optional(),
});

const CreateMileageSchema = z.object({
  user_id: z.number().int().positive(),
  project_id: z.number().int().positive().optional(),
  date: z.string(),
  distance: z.number().positive(),
  description: z.string().optional(),
  rate_per_km: z.number().positive().optional(),
  billable: z.boolean().optional(),
});

const CreateTagSchema = z.object({
  name: z.string().min(1),
  color: z.string().optional(),
});

class TimechimpMCPServer {
  private server: Server;
  private client: TimechimpClient;

  constructor() {
    const apiKey = process.env.TIMECHIMP_API_KEY;
    if (!apiKey) {
      throw new Error('TIMECHIMP_API_KEY environment variable is required');
    }

    this.client = new TimechimpClient(apiKey);
    this.server = new Server(
      {
        name: 'timechimp-mcp-server',
        version: '1.0.0',
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: this.getTools(),
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          // Users
          case 'get_users':
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getUsers(), null, 2) }] };
          
          case 'get_user_by_id':
            const getUserArgs = GetByIdSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getUserById(getUserArgs.id), null, 2) }] };
          
          case 'create_user':
            const createUserArgs = CreateUserSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createUser(createUserArgs), null, 2) }] };

          // Projects
          case 'get_projects':
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getProjects(), null, 2) }] };
          
          case 'get_project_by_id':
            const getProjectArgs = GetByIdSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getProjectById(getProjectArgs.id), null, 2) }] };
          
          case 'create_project':
            const createProjectArgs = CreateProjectSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createProject(createProjectArgs), null, 2) }] };

          // Customers
          case 'get_customers':
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getCustomers(), null, 2) }] };
          
          case 'get_customer_by_id':
            const getCustomerArgs = GetByIdSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getCustomerById(getCustomerArgs.id), null, 2) }] };
          
          case 'create_customer':
            const createCustomerArgs = CreateCustomerSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createCustomer(createCustomerArgs), null, 2) }] };

          // Time Entries
          case 'get_time_entries':
            const getTimeEntriesArgs = GetTimeEntriesSchema.parse(args || {});
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getTimeEntries(getTimeEntriesArgs), null, 2) }] };
          
          case 'get_time_entry_by_id':
            const getTimeEntryArgs = GetByIdSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getTimeEntryById(getTimeEntryArgs.id), null, 2) }] };
          
          case 'create_time_entry':
            const createTimeEntryArgs = CreateTimeEntrySchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createTimeEntry(createTimeEntryArgs), null, 2) }] };

          // Tasks
          case 'get_tasks':
            const projectId = args && typeof args === 'object' && 'project_id' in args ? Number(args.project_id) : undefined;
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getTasks(projectId), null, 2) }] };
          
          case 'get_task_by_id':
            const getTaskArgs = GetByIdSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getTaskById(getTaskArgs.id), null, 2) }] };
          
          case 'create_task':
            const createTaskArgs = CreateTaskSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createTask(createTaskArgs), null, 2) }] };

          // Expenses
          case 'get_expenses':
            const getExpensesArgs = GetTimeEntriesSchema.parse(args || {});
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getExpenses(getExpensesArgs), null, 2) }] };
          
          case 'create_expense':
            const createExpenseArgs = CreateExpenseSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createExpense(createExpenseArgs), null, 2) }] };

          // Mileage
          case 'get_mileage':
            const getMileageArgs = GetTimeEntriesSchema.parse(args || {});
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getMileage(getMileageArgs), null, 2) }] };
          
          case 'create_mileage':
            const createMileageArgs = CreateMileageSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createMileage(createMileageArgs), null, 2) }] };

          // Tags
          case 'get_tags':
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getTags(), null, 2) }] };
          
          case 'create_tag':
            const createTagArgs = CreateTagSchema.parse(args);
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.createTag(createTagArgs), null, 2) }] };

          // Invoices
          case 'get_invoices':
            return { content: [{ type: 'text', text: JSON.stringify(await this.client.getInvoices(), null, 2) }] };

          // Health check
          case 'health_check':
            const isHealthy = await this.client.healthCheck();
            return { content: [{ type: 'text', text: JSON.stringify({ healthy: isHealthy }, null, 2) }] };

          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          content: [{ type: 'text', text: `Error: ${errorMessage}` }],
          isError: true,
        };
      }
    });
  }

  private getTools(): Tool[] {
    return [
      // Users
      {
        name: 'get_users',
        description: 'Get all users from Timechimp',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_user_by_id',
        description: 'Get a specific user by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'User ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_user',
        description: 'Create a new user',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'User name' },
            email: { type: 'string', description: 'User email' },
            role: { type: 'string', description: 'User role (optional)' },
            active: { type: 'boolean', description: 'Whether user is active (optional)' },
          },
          required: ['name', 'email'],
        },
      },

      // Projects
      {
        name: 'get_projects',
        description: 'Get all projects from Timechimp',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_project_by_id',
        description: 'Get a specific project by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Project ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_project',
        description: 'Create a new project',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Project name' },
            description: { type: 'string', description: 'Project description (optional)' },
            customer_id: { type: 'number', description: 'Customer ID (optional)' },
            active: { type: 'boolean', description: 'Whether project is active (optional)' },
            billable: { type: 'boolean', description: 'Whether project is billable (optional)' },
            hourly_rate: { type: 'number', description: 'Hourly rate (optional)' },
          },
          required: ['name'],
        },
      },

      // Customers
      {
        name: 'get_customers',
        description: 'Get all customers from Timechimp',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_customer_by_id',
        description: 'Get a specific customer by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Customer ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_customer',
        description: 'Create a new customer',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Customer name' },
            email: { type: 'string', description: 'Customer email (optional)' },
            phone: { type: 'string', description: 'Customer phone (optional)' },
            address: { type: 'string', description: 'Customer address (optional)' },
            active: { type: 'boolean', description: 'Whether customer is active (optional)' },
          },
          required: ['name'],
        },
      },

      // Time Entries
      {
        name: 'get_time_entries',
        description: 'Get time entries with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'number', description: 'Filter by user ID (optional)' },
            project_id: { type: 'number', description: 'Filter by project ID (optional)' },
            date_from: { type: 'string', description: 'Filter from date (YYYY-MM-DD) (optional)' },
            date_to: { type: 'string', description: 'Filter to date (YYYY-MM-DD) (optional)' },
          },
        },
      },
      {
        name: 'get_time_entry_by_id',
        description: 'Get a specific time entry by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Time entry ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_time_entry',
        description: 'Create a new time entry',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'number', description: 'User ID' },
            project_id: { type: 'number', description: 'Project ID' },
            task_id: { type: 'number', description: 'Task ID (optional)' },
            date: { type: 'string', description: 'Date (YYYY-MM-DD)' },
            hours: { type: 'number', description: 'Number of hours' },
            description: { type: 'string', description: 'Description (optional)' },
            billable: { type: 'boolean', description: 'Whether time is billable (optional)' },
          },
          required: ['user_id', 'project_id', 'date', 'hours'],
        },
      },

      // Tasks
      {
        name: 'get_tasks',
        description: 'Get tasks, optionally filtered by project',
        inputSchema: {
          type: 'object',
          properties: {
            project_id: { type: 'number', description: 'Filter by project ID (optional)' },
          },
        },
      },
      {
        name: 'get_task_by_id',
        description: 'Get a specific task by ID',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'number', description: 'Task ID' },
          },
          required: ['id'],
        },
      },
      {
        name: 'create_task',
        description: 'Create a new task',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Task name' },
            project_id: { type: 'number', description: 'Project ID' },
            description: { type: 'string', description: 'Task description (optional)' },
            active: { type: 'boolean', description: 'Whether task is active (optional)' },
            billable: { type: 'boolean', description: 'Whether task is billable (optional)' },
            hourly_rate: { type: 'number', description: 'Hourly rate (optional)' },
          },
          required: ['name', 'project_id'],
        },
      },

      // Expenses
      {
        name: 'get_expenses',
        description: 'Get expenses with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'number', description: 'Filter by user ID (optional)' },
            project_id: { type: 'number', description: 'Filter by project ID (optional)' },
            date_from: { type: 'string', description: 'Filter from date (YYYY-MM-DD) (optional)' },
            date_to: { type: 'string', description: 'Filter to date (YYYY-MM-DD) (optional)' },
          },
        },
      },
      {
        name: 'create_expense',
        description: 'Create a new expense',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'number', description: 'User ID' },
            project_id: { type: 'number', description: 'Project ID (optional)' },
            date: { type: 'string', description: 'Date (YYYY-MM-DD)' },
            amount: { type: 'number', description: 'Expense amount' },
            description: { type: 'string', description: 'Description (optional)' },
            category: { type: 'string', description: 'Expense category (optional)' },
            billable: { type: 'boolean', description: 'Whether expense is billable (optional)' },
          },
          required: ['user_id', 'date', 'amount'],
        },
      },

      // Mileage
      {
        name: 'get_mileage',
        description: 'Get mileage entries with optional filters',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'number', description: 'Filter by user ID (optional)' },
            project_id: { type: 'number', description: 'Filter by project ID (optional)' },
            date_from: { type: 'string', description: 'Filter from date (YYYY-MM-DD) (optional)' },
            date_to: { type: 'string', description: 'Filter to date (YYYY-MM-DD) (optional)' },
          },
        },
      },
      {
        name: 'create_mileage',
        description: 'Create a new mileage entry',
        inputSchema: {
          type: 'object',
          properties: {
            user_id: { type: 'number', description: 'User ID' },
            project_id: { type: 'number', description: 'Project ID (optional)' },
            date: { type: 'string', description: 'Date (YYYY-MM-DD)' },
            distance: { type: 'number', description: 'Distance in kilometers' },
            description: { type: 'string', description: 'Description (optional)' },
            rate_per_km: { type: 'number', description: 'Rate per kilometer (optional)' },
            billable: { type: 'boolean', description: 'Whether mileage is billable (optional)' },
          },
          required: ['user_id', 'date', 'distance'],
        },
      },

      // Tags
      {
        name: 'get_tags',
        description: 'Get all tags from Timechimp',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'create_tag',
        description: 'Create a new tag',
        inputSchema: {
          type: 'object',
          properties: {
            name: { type: 'string', description: 'Tag name' },
            color: { type: 'string', description: 'Tag color (optional)' },
          },
          required: ['name'],
        },
      },

      // Invoices
      {
        name: 'get_invoices',
        description: 'Get all invoices from Timechimp',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },

      // Health check
      {
        name: 'health_check',
        description: 'Check if the Timechimp API connection is working',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ];
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Timechimp MCP server running on stdio');
  }
}

// Start the server
const server = new TimechimpMCPServer();
server.run().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 