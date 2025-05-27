@echo off
echo Setting up Timechimp MCP Server for Windows 11...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js and npm are installed.
echo.

REM Install dependencies
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

REM Build the project
echo Building the project...
npm run build:win
if %errorlevel% neq 0 (
    echo ERROR: Failed to build the project
    pause
    exit /b 1
)

echo.
echo Setup completed successfully!
echo.
echo To run the server:
echo   npm run start:win
echo.
echo To run in development mode:
echo   npm run dev:win
echo.
echo Make sure to set your TIMECHIMP_API_KEY environment variable:
echo   set TIMECHIMP_API_KEY=your_api_key_here
echo.
pause 