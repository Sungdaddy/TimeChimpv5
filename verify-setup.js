#!/usr/bin/env node

// Verification script for Timechimp MCP Server
import { existsSync } from 'fs';
import { join } from 'path';

console.log('🔍 Verifying Timechimp MCP Server setup...\n');

const requiredFiles = [
  'package.json',
  'tsconfig.json',
  'src/index.ts',
  'src/client.ts',
  'src/types.ts',
  'scripts/setup-windows.bat',
  'scripts/setup-windows.ps1',
  'scripts/run-windows.bat',
  'README.md',
  'FUNCTIONS.md',
  'WINDOWS-SETUP.md',
  'LICENSE',
  '.gitignore',
  'env.example',
  'mcp-config.json'
];

const optionalFiles = [
  'dist/index.js',
  'EXPORT-TO-GITHUB.md'
];

let allGood = true;

console.log('✅ Checking required files:');
for (const file of requiredFiles) {
  if (existsSync(file)) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allGood = false;
  }
}

console.log('\n📋 Checking optional files:');
for (const file of optionalFiles) {
  if (existsSync(file)) {
    console.log(`   ✓ ${file}`);
  } else {
    console.log(`   ⚠️  ${file} - Optional (will be generated)`);
  }
}

// Check package.json content
console.log('\n📦 Checking package.json configuration:');
try {
  const pkg = JSON.parse(await import('fs').then(fs => fs.readFileSync('package.json', 'utf8')));
  
  const checks = [
    { key: 'name', expected: 'timechimp-mcp-server', actual: pkg.name },
    { key: 'repository.url', expected: 'https://github.com/Sungdaddy/TimeChimpv5.git', actual: pkg.repository?.url },
    { key: 'scripts.build:win', exists: !!pkg.scripts?.['build:win'] },
    { key: 'scripts.start:win', exists: !!pkg.scripts?.['start:win'] },
    { key: 'dependencies.cross-env', exists: !!pkg.dependencies?.['cross-env'] }
  ];
  
  for (const check of checks) {
    if (check.expected) {
      if (check.actual === check.expected) {
        console.log(`   ✓ ${check.key}: ${check.actual}`);
      } else {
        console.log(`   ❌ ${check.key}: Expected "${check.expected}", got "${check.actual}"`);
        allGood = false;
      }
    } else if (check.exists) {
      console.log(`   ✓ ${check.key}: Present`);
    } else {
      console.log(`   ❌ ${check.key}: Missing`);
      allGood = false;
    }
  }
} catch (error) {
  console.log(`   ❌ Error reading package.json: ${error.message}`);
  allGood = false;
}

// Check if built
console.log('\n🏗️  Checking build status:');
if (existsSync('dist/index.js')) {
  console.log('   ✓ Project is built and ready to run');
} else {
  console.log('   ⚠️  Project not built - run "npm run build" before using');
}

// Final summary
console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('🎉 SUCCESS: Project is ready for export to GitHub!');
  console.log('\nNext steps:');
  console.log('1. Follow the instructions in EXPORT-TO-GITHUB.md');
  console.log('2. Push to https://github.com/Sungdaddy/TimeChimpv5.git');
  console.log('3. Test installation on Windows 11');
} else {
  console.log('❌ ISSUES FOUND: Please fix the issues above before export');
}
console.log('='.repeat(50)); 