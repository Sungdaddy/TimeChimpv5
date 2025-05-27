# Timechimp MCP Server

A Model Context Protocol (MCP) server for integrating with Timechimp's v2 API. This server provides comprehensive access to Timechimp's time tracking, project management, and invoicing features through MCP tools.

**✅ Windows 11 Compatible** | **✅ Cross-Platform** | **✅ Production Ready**

## 🚀 Quick Start

### Windows 11 Users

#### Option 1: Using Batch Script (Recommended)
1. **Download and extract** this repository
2. **Double-click** `scripts/setup-windows.bat` to install and build
3. **Set your API key:**
   ```cmd
   set TIMECHIMP_API_KEY=your_actual_api_key_here
   ```
4. **Double-click** `scripts/run-windows.bat` to start the server

#### Option 2: Using PowerShell
1. **Open PowerShell as Administrator**
2. **Navigate to the project folder**
3. **Run the setup script:**
   ```powershell
   .\scripts\setup-windows.ps1
   ```
4. **Set your API key:**
   ```powershell
   $env:TIMECHIMP_API_KEY='your_actual_api_key_here'
   ```
5. **Start the server:**
   ```powershell
   npm run start
   ```

#### Option 3: Using Command Prompt
1. **Open Command Prompt**
2. **Navigate to the project folder**
3. **Install and build:**
   ```cmd
   npm run setup:win
   ```
4. **Set your API key:**
   ```cmd
   set TIMECHIMP_API_KEY=your_actual_api_key_here
   ```
5. **Start the server:**
   ```cmd
   npm run start:win
   ```

### macOS/Linux Users

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sungdaddy/TimeChimpv5.git
   cd TimeChimpv5
   ```

2. **Install and build:**
   ```bash
   npm run setup
   ```

3. **Set your API key:**
   ```bash
   export TIMECHIMP_API_KEY=your_actual_api_key_here
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

## 📋 Prerequisites

- **Node.js 18.0.0 or higher** - [Download from nodejs.org](https://nodejs.org/)
- **npm 8.0.0 or higher** (comes with Node.js)
- **Timechimp API Key** - Get from your Timechimp account settings

## Features

This MCP server provides access to the following Timechimp functionality:

### 📊 Core Features
- **Users Management**: Create, read, and manage users
- **Projects**: Manage projects and their settings
- **Customers**: Handle customer information
- **Time Tracking**: Create and manage time entries
- **Tasks**: Organize work with project tasks
- **Expenses**: Track and manage expenses
- **Mileage**: Record mileage entries
- **Tags**: Organize data with tags
- **Invoices**: Access invoice information
- **Health Check**: Verify API connectivity

### 🛠️ Available Tools

#### Users
- `get_users` - Get all users
- `get_user_by_id` - Get specific user by ID
- `create_user` - Create new user

#### Projects
- `get_projects` - Get all projects
- `get_project_by_id` - Get specific project by ID
- `create_project` - Create new project

#### Customers
- `get_customers` - Get all customers
- `get_customer_by_id` - Get specific customer by ID
- `create_customer` - Create new customer

#### Time Entries
- `get_time_entries` - Get time entries (with optional filters)
- `get_time_entry_by_id` - Get specific time entry by ID
- `create_time_entry` - Create new time entry

#### Tasks
- `get_tasks` - Get tasks (optionally filtered by project)
- `get_task_by_id` - Get specific task by ID
- `create_task` - Create new task

#### Expenses
- `get_expenses` - Get expenses (with optional filters)
- `create_expense` - Create new expense

#### Mileage
- `get_mileage` - Get mileage entries (with optional filters)
- `create_mileage` - Create new mileage entry

#### Tags
- `get_tags` - Get all tags
- `create_tag` - Create new tag

#### Invoices
- `get_invoices` - Get all invoices

#### Utilities
- `health_check` - Check API connectivity

## Installation

### Manual Installation

1. **Clone or download the project:**
   ```bash
   git clone https://github.com/Sungdaddy/TimeChimpv5.git
   cd TimeChimpv5
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the project:**
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables

Create a `.env` file in the project root or set environment variables:

**Windows (Command Prompt):**
```cmd
set TIMECHIMP_API_KEY=your_actual_api_key_here
```

**Windows (PowerShell):**
```powershell
$env:TIMECHIMP_API_KEY='your_actual_api_key_here'
```

**macOS/Linux:**
```bash
export TIMECHIMP_API_KEY=your_actual_api_key_here
```

### Getting Your API Key

1. Log in to your Timechimp account
2. Go to Settings → API
3. Generate or copy your API key
4. The API key should start with `TC_`

## Usage

### Running the Server

**Windows:**
```cmd
# Development mode
npm run dev:win

# Production mode
npm run start:win
```

**macOS/Linux:**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

### Using with MCP Clients

The server communicates via stdio and can be used with any MCP-compatible client.

#### Example MCP Client Configuration

```json
{
  "mcpServers": {
    "timechimp": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "TIMECHIMP_API_KEY": "your_actual_api_key_here"
      }
    }
  }
}
```

## API Examples

### Creating a Time Entry

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

### Getting Time Entries with Filters

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

### Creating a Project

```json
{
  "tool": "create_project",
  "arguments": {
    "name": "New Website Project",
    "description": "Building a new company website",
    "customer_id": 789,
    "billable": true,
    "hourly_rate": 75.00
  }
}
```

### Creating a Customer

```json
{
  "tool": "create_customer",
  "arguments": {
    "name": "Acme Corporation",
    "email": "contact@acme.com",
    "phone": "+1-555-0123",
    "address": "123 Business St, City, State 12345"
  }
}
```

## Error Handling

The server includes comprehensive error handling:

- **Authentication errors**: Invalid API key
- **Validation errors**: Invalid input parameters
- **API errors**: Timechimp API issues
- **Network errors**: Connection problems

All errors are returned in a structured format with descriptive messages.

## Development

### Project Structure

```
src/
├── index.ts          # Main MCP server implementation
├── client.ts         # Timechimp API client
└── types.ts          # TypeScript type definitions

scripts/
├── setup-windows.bat # Windows batch setup script
├── setup-windows.ps1 # Windows PowerShell setup script
└── run-windows.bat   # Windows batch run script

dist/                 # Compiled JavaScript output
package.json          # Project configuration
tsconfig.json         # TypeScript configuration
README.md            # This file
```

### Building

**Windows:**
```cmd
npm run build:win
```

**macOS/Linux:**
```bash
npm run build
```

### Testing

```bash
npm test
```

## API Reference

### Timechimp API v2

This server uses the Timechimp API v2. For detailed API documentation, visit:
- Base URL: `https://v2.api.timechimp.com`
- Authentication: API key in `api-key` header
- All requests must be made over HTTPS

### Supported Endpoints

- `/users` - User management
- `/projects` - Project management
- `/customers` - Customer management
- `/time` - Time entry management
- `/tasks` - Task management
- `/expenses` - Expense tracking
- `/mileage` - Mileage tracking
- `/tags` - Tag management
- `/invoices` - Invoice access

## Troubleshooting

### Common Issues

1. **"TIMECHIMP_API_KEY environment variable is required"**
   - Ensure you've set the `TIMECHIMP_API_KEY` environment variable
   - Check that your API key is valid and starts with `TC_`

2. **"API Error" or authentication failures**
   - Verify your API key is correct
   - Check that your Timechimp account has API access enabled

3. **Network timeouts**
   - Check your internet connection
   - Verify Timechimp's API status

4. **Windows-specific issues**
   - Ensure Node.js is properly installed and in PATH
   - Try running Command Prompt or PowerShell as Administrator
   - Check Windows Defender/Antivirus isn't blocking the application

### Debug Mode

Set the environment variable `DEBUG=1` for verbose logging:

**Windows:**
```cmd
set DEBUG=1
npm run dev:win
```

**macOS/Linux:**
```bash
DEBUG=1 npm run dev
```

## Contributing

1. Fork the repository at [https://github.com/Sungdaddy/TimeChimpv5](https://github.com/Sungdaddy/TimeChimpv5)
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues related to:
- **This MCP server**: Open an issue at [https://github.com/Sungdaddy/TimeChimpv5/issues](https://github.com/Sungdaddy/TimeChimpv5/issues)
- **Timechimp API**: Contact Timechimp support
- **MCP protocol**: Check the MCP documentation

## Repository

- **GitHub**: [https://github.com/Sungdaddy/TimeChimpv5](https://github.com/Sungdaddy/TimeChimpv5)
- **Issues**: [https://github.com/Sungdaddy/TimeChimpv5/issues](https://github.com/Sungdaddy/TimeChimpv5/issues)

---

**Note**: This is an unofficial integration. For official Timechimp integrations, check their marketplace at https://marketplace.timechimp.com/ 