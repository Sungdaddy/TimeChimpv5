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
    echo Please set it using: set TIMECHIMP_API_KEY=your_api_key_here
    echo.
    echo Using example API key for testing...
    set TIMECHIMP_API_KEY=TC_1Q0e1E3I1M2m0e363Y0C162e0G0e3A0e1o2O2m3M3U3U3I1c2S0S2i3g2i943
)

echo Starting server with API key: %TIMECHIMP_API_KEY:~0,10%...
echo.

REM Start the server
npm run start:win 