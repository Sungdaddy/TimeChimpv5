# PowerShell setup script for Timechimp MCP Server on Windows 11
Write-Host "Setting up Timechimp MCP Server for Windows 11..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: npm is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
try {
    npm install
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Build the project
Write-Host "Building the project..." -ForegroundColor Yellow
try {
    npm run build
    Write-Host "Project built successfully!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to build the project" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To run the server:" -ForegroundColor Cyan
Write-Host "  npm run start" -ForegroundColor White
Write-Host ""
Write-Host "To run in development mode:" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Make sure to set your TIMECHIMP_API_KEY environment variable:" -ForegroundColor Cyan
Write-Host "  `$env:TIMECHIMP_API_KEY='your_api_key_here'" -ForegroundColor White
Write-Host ""
Read-Host "Press Enter to exit" 