@echo off
echo Starting Timechimp MCP Server on Windows 11...
echo.

REM Check if the project is built
if not exist "dist\index.js" (
    echo ERROR: Project not built. Please run setup-windows.bat first.
    echo Or run: npm run build:win
    pause
    exit /b 1
)

REM Check if API key is set
if "%TIMECHIMP_API_KEY%"=="" (
    echo WARNING: TIMECHIMP_API_KEY environment variable is not set.
    echo Please set it using: set TIMECHIMP_API_KEY=your_actual_api_key_here
    echo.
    echo Cannot start server without API key.
    pause
    exit /b 1
)

echo Starting server with API key: %TIMECHIMP_API_KEY:~0,10%...
echo.

REM Start the server
npm run start:win 