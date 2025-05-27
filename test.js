#!/usr/bin/env node

// Simple test script to verify the MCP server works
import { spawn } from 'child_process';

console.log('Testing Timechimp MCP Server...');

// Set the API key for testing
process.env.TIMECHIMP_API_KEY = 'TC_1Q0e1E3I1M2m0e363Y0C162e0G0e3A0e1o2O2m3M3U3U3I1c2S0S2i3g2i943';

// Start the server
const server = spawn('node', ['dist/index.js'], {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env }
});

let output = '';
let errorOutput = '';

server.stdout.on('data', (data) => {
  output += data.toString();
});

server.stderr.on('data', (data) => {
  errorOutput += data.toString();
  console.log('Server stderr:', data.toString());
});

// Send a list tools request
const listToolsRequest = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/list',
  params: {}
};

setTimeout(() => {
  console.log('Sending list tools request...');
  server.stdin.write(JSON.stringify(listToolsRequest) + '\n');
}, 1000);

// Send a health check request
const healthCheckRequest = {
  jsonrpc: '2.0',
  id: 2,
  method: 'tools/call',
  params: {
    name: 'health_check',
    arguments: {}
  }
};

setTimeout(() => {
  console.log('Sending health check request...');
  server.stdin.write(JSON.stringify(healthCheckRequest) + '\n');
}, 2000);

// Clean up after 5 seconds
setTimeout(() => {
  console.log('Test completed.');
  console.log('Server output:', output);
  console.log('Server error output:', errorOutput);
  server.kill();
  process.exit(0);
}, 5000);

server.on('error', (error) => {
  console.error('Server error:', error);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
}); 