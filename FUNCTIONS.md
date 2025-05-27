# Timechimp MCP Server Functions

This document lists all available functions in the Timechimp MCP server.

## User Management

### `get_users`
**Description**: Get all users from Timechimp  
**Parameters**: None  
**Returns**: Array of user objects

### `get_user_by_id`
**Description**: Get a specific user by ID  
**Parameters**:
- `id` (number, required): User ID  
**Returns**: User object

### `create_user`
**Description**: Create a new user  
**Parameters**:
- `name` (string, required): User name
- `email` (string, required): User email
- `role` (string, optional): User role
- `active` (boolean, optional): Whether user is active  
**Returns**: Created user object

## Project Management

### `get_projects`
**Description**: Get all projects from Timechimp  
**Parameters**: None  
**Returns**: Array of project objects

### `get_project_by_id`
**Description**: Get a specific project by ID  
**Parameters**:
- `id` (number, required): Project ID  
**Returns**: Project object

### `create_project`
**Description**: Create a new project  
**Parameters**:
- `name` (string, required): Project name
- `description` (string, optional): Project description
- `customer_id` (number, optional): Customer ID
- `active` (boolean, optional): Whether project is active
- `billable` (boolean, optional): Whether project is billable
- `hourly_rate` (number, optional): Hourly rate  
**Returns**: Created project object

## Customer Management

### `get_customers`
**Description**: Get all customers from Timechimp  
**Parameters**: None  
**Returns**: Array of customer objects

### `get_customer_by_id`
**Description**: Get a specific customer by ID  
**Parameters**:
- `id` (number, required): Customer ID  
**Returns**: Customer object

### `create_customer`
**Description**: Create a new customer  
**Parameters**:
- `name` (string, required): Customer name
- `email` (string, optional): Customer email
- `phone` (string, optional): Customer phone
- `address` (string, optional): Customer address
- `active` (boolean, optional): Whether customer is active  
**Returns**: Created customer object

## Time Tracking

### `get_time_entries`
**Description**: Get time entries with optional filters  
**Parameters**:
- `user_id` (number, optional): Filter by user ID
- `project_id` (number, optional): Filter by project ID
- `date_from` (string, optional): Filter from date (YYYY-MM-DD)
- `date_to` (string, optional): Filter to date (YYYY-MM-DD)  
**Returns**: Array of time entry objects

### `get_time_entry_by_id`
**Description**: Get a specific time entry by ID  
**Parameters**:
- `id` (number, required): Time entry ID  
**Returns**: Time entry object

### `create_time_entry`
**Description**: Create a new time entry  
**Parameters**:
- `user_id` (number, required): User ID
- `project_id` (number, required): Project ID
- `task_id` (number, optional): Task ID
- `date` (string, required): Date (YYYY-MM-DD)
- `hours` (number, required): Number of hours
- `description` (string, optional): Description
- `billable` (boolean, optional): Whether time is billable  
**Returns**: Created time entry object

## Task Management

### `get_tasks`
**Description**: Get tasks, optionally filtered by project  
**Parameters**:
- `project_id` (number, optional): Filter by project ID  
**Returns**: Array of task objects

### `get_task_by_id`
**Description**: Get a specific task by ID  
**Parameters**:
- `id` (number, required): Task ID  
**Returns**: Task object

### `create_task`
**Description**: Create a new task  
**Parameters**:
- `name` (string, required): Task name
- `project_id` (number, required): Project ID
- `description` (string, optional): Task description
- `active` (boolean, optional): Whether task is active
- `billable` (boolean, optional): Whether task is billable
- `hourly_rate` (number, optional): Hourly rate  
**Returns**: Created task object

## Expense Management

### `get_expenses`
**Description**: Get expenses with optional filters  
**Parameters**:
- `user_id` (number, optional): Filter by user ID
- `project_id` (number, optional): Filter by project ID
- `date_from` (string, optional): Filter from date (YYYY-MM-DD)
- `date_to` (string, optional): Filter to date (YYYY-MM-DD)  
**Returns**: Array of expense objects

### `create_expense`
**Description**: Create a new expense  
**Parameters**:
- `user_id` (number, required): User ID
- `project_id` (number, optional): Project ID
- `date` (string, required): Date (YYYY-MM-DD)
- `amount` (number, required): Expense amount
- `description` (string, optional): Description
- `category` (string, optional): Expense category
- `billable` (boolean, optional): Whether expense is billable  
**Returns**: Created expense object

## Mileage Tracking

### `get_mileage`
**Description**: Get mileage entries with optional filters  
**Parameters**:
- `user_id` (number, optional): Filter by user ID
- `project_id` (number, optional): Filter by project ID
- `date_from` (string, optional): Filter from date (YYYY-MM-DD)
- `date_to` (string, optional): Filter to date (YYYY-MM-DD)  
**Returns**: Array of mileage objects

### `create_mileage`
**Description**: Create a new mileage entry  
**Parameters**:
- `user_id` (number, required): User ID
- `project_id` (number, optional): Project ID
- `date` (string, required): Date (YYYY-MM-DD)
- `distance` (number, required): Distance in kilometers
- `description` (string, optional): Description
- `rate_per_km` (number, optional): Rate per kilometer
- `billable` (boolean, optional): Whether mileage is billable  
**Returns**: Created mileage object

## Tag Management

### `get_tags`
**Description**: Get all tags from Timechimp  
**Parameters**: None  
**Returns**: Array of tag objects

### `create_tag`
**Description**: Create a new tag  
**Parameters**:
- `name` (string, required): Tag name
- `color` (string, optional): Tag color  
**Returns**: Created tag object

## Invoice Management

### `get_invoices`
**Description**: Get all invoices from Timechimp  
**Parameters**: None  
**Returns**: Array of invoice objects

## Utilities

### `health_check`
**Description**: Check if the Timechimp API connection is working  
**Parameters**: None  
**Returns**: Object with `healthy` boolean property

## Usage Examples

### Create a time entry
```json
{
  "tool": "create_time_entry",
  "arguments": {
    "user_id": 123,
    "project_id": 456,
    "date": "2024-01-15",
    "hours": 8.5,
    "description": "Working on project features",
    "billable": true
  }
}
```

### Get time entries for a specific user
```json
{
  "tool": "get_time_entries",
  "arguments": {
    "user_id": 123,
    "date_from": "2024-01-01",
    "date_to": "2024-01-31"
  }
}
```

### Create a new project
```json
{
  "tool": "create_project",
  "arguments": {
    "name": "Website Redesign",
    "description": "Complete redesign of company website",
    "customer_id": 789,
    "billable": true,
    "hourly_rate": 75.00
  }
}
```

### Check API health
```json
{
  "tool": "health_check",
  "arguments": {}
}
``` 