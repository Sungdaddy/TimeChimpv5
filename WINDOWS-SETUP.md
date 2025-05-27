# Windows 11 Setup Guide for Timechimp MCP Server

This guide provides detailed instructions for setting up and running the Timechimp MCP Server on Windows 11.

## Prerequisites

### 1. Install Node.js

1. **Download Node.js** from [https://nodejs.org/](https://nodejs.org/)
2. **Choose the LTS version** (recommended for most users)
3. **Run the installer** and follow the setup wizard
4. **Verify installation** by opening Command Prompt and running:
   ```cmd
   node --version
   npm --version
   ```

### 2. Get Your Timechimp API Key

1. Log in to your Timechimp account
2. Navigate to **Settings → API**
3. Generate or copy your API key
4. Your API key should start with `TC_`

## Installation Methods

### Method 1: Easy Setup (Recommended for Beginners)

1. **Download the project** from [https://github.com/Sungdaddy/TimeChimpv5](https://github.com/Sungdaddy/TimeChimpv5)
2. **Extract the ZIP file** to a folder (e.g., `C:\TimeChimpv5`)
3. **Navigate to the project folder**
4. **Double-click** `scripts\setup-windows.bat`
5. **Wait for installation** to complete
6. **Set your API key** (see Environment Variables section below)
7. **Double-click** `scripts\run-windows.bat` to start the server

### Method 2: Command Prompt

1. **Open Command Prompt** (Press `Win + R`, type `cmd`, press Enter)
2. **Navigate to the project folder:**
   ```cmd
   cd C:\path\to\TimeChimpv5
   ```
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

### Method 3: PowerShell

1. **Open PowerShell as Administrator** (Right-click Start button → Windows PowerShell (Admin))
2. **Navigate to the project folder:**
   ```powershell
   cd C:\path\to\TimeChimpv5
   ```
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

## Environment Variables

### Setting API Key Temporarily (Current Session Only)

**Command Prompt:**
```cmd
set TIMECHIMP_API_KEY=TC_1Q0e1E3I1M2m0e363Y0C162e0G0e3A0e1o2O2m3M3U3U3I1c2S0S2i3g2i943
```

**PowerShell:**
```powershell
$env:TIMECHIMP_API_KEY='TC_1Q0e1E3I1M2m0e363Y0C162e0G0e3A0e1o2O2m3M3U3U3I1c2S0S2i3g2i943'
```

### Setting API Key Permanently (System-wide)

1. **Open System Properties:**
   - Press `Win + R`, type `sysdm.cpl`, press Enter
   - OR Right-click "This PC" → Properties → Advanced system settings

2. **Click "Environment Variables"**

3. **Under "User variables" or "System variables", click "New"**

4. **Enter:**
   - Variable name: `TIMECHIMP_API_KEY`
   - Variable value: `TC_1Q0e1E3I1M2m0e363Y0C162e0G0e3A0e1o2O2m3M3U3U3I1c2S0S2i3g2i943`

5. **Click OK** to save

6. **Restart Command Prompt/PowerShell** for changes to take effect

## Running the Server

### Development Mode (with auto-restart)
```cmd
npm run dev:win
```

### Production Mode
```cmd
npm run start:win
```

### Using the Batch Scripts
- **Setup:** Double-click `scripts\setup-windows.bat`
- **Run:** Double-click `scripts\run-windows.bat`

## Troubleshooting

### Common Issues

#### 1. "node is not recognized as an internal or external command"
**Solution:** Node.js is not installed or not in PATH
- Reinstall Node.js from [nodejs.org](https://nodejs.org/)
- Make sure to check "Add to PATH" during installation
- Restart Command Prompt/PowerShell

#### 2. "npm is not recognized as an internal or external command"
**Solution:** npm is not installed or not in PATH
- npm comes with Node.js, so reinstall Node.js
- Restart Command Prompt/PowerShell

#### 3. "TIMECHIMP_API_KEY environment variable is required"
**Solution:** API key not set
- Set the environment variable as shown above
- Make sure there are no extra spaces in the API key
- Restart Command Prompt/PowerShell after setting system variables

#### 4. "Permission denied" or "Access denied" errors
**Solution:** Run as Administrator
- Right-click Command Prompt/PowerShell → "Run as administrator"
- Or try installing in a different folder (not in Program Files)

#### 5. Windows Defender blocking the application
**Solution:** Add exception to Windows Defender
- Open Windows Security
- Go to Virus & threat protection
- Add an exclusion for the project folder

#### 6. "Cannot find module" errors
**Solution:** Dependencies not installed
- Run `npm install` in the project folder
- Make sure you're in the correct directory

### Getting Help

If you encounter issues:

1. **Check the error message** carefully
2. **Try running as Administrator**
3. **Restart your computer** (sometimes helps with PATH issues)
4. **Check the GitHub issues** at [https://github.com/Sungdaddy/TimeChimpv5/issues](https://github.com/Sungdaddy/TimeChimpv5/issues)
5. **Create a new issue** with your error message and system details

## System Requirements

- **Windows 11** (also works on Windows 10)
- **Node.js 18.0.0 or higher**
- **npm 8.0.0 or higher**
- **4GB RAM minimum** (8GB recommended)
- **Internet connection** for API calls

## Next Steps

Once the server is running:

1. **Test the connection** using the health check function
2. **Configure your MCP client** to use the server
3. **Start using the Timechimp functions** in your applications

For detailed function documentation, see [FUNCTIONS.md](FUNCTIONS.md).

## Security Notes

- **Keep your API key secure** - don't share it publicly
- **Use environment variables** instead of hardcoding the API key
- **Regularly update** the server and dependencies
- **Monitor API usage** in your Timechimp account 