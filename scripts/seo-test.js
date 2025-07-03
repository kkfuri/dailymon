#!/usr/bin/env node

/**
 * SEO Test Script for Dailymon
 * This script validates basic SEO implementation
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Running SEO Implementation Tests...\n');

// Test 1: Check if required SEO files exist
const requiredFiles = [
  'public/robots.txt',
  'public/site.webmanifest',
  'public/favicon-32x32.png',
  'public/favicon-16x16.png',
  'src/utils/seo.ts',
  'src/pages/sitemap.xml.tsx'
];

console.log('📁 Checking required SEO files...');
requiredFiles.forEach(file => {
  const filePath = path.join(process.cwd(), file);
  const exists = fs.existsSync(filePath);
  console.log(`  ${exists ? '✅' : '❌'} ${file}`);
});

// Test 2: Validate robots.txt content
console.log('\n🤖 Validating robots.txt...');
try {
  const robotsPath = path.join(process.cwd(), 'public/robots.txt');
  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  
  const hasUserAgent = robotsContent.includes('User-agent: *');
  const hasSitemap = robotsContent.includes('Sitemap:');
  const hasAllow = robotsContent.includes('Allow: /');
  
  console.log(`  ${hasUserAgent ? '✅' : '❌'} User-agent directive`);
  console.log(`  ${hasSitemap ? '✅' : '❌'} Sitemap reference`);
  console.log(`  ${hasAllow ? '✅' : '❌'} Allow directive`);
} catch (error) {
  console.log('  ❌ Error reading robots.txt');
}

// Test 3: Validate manifest.json
console.log('\n📱 Validating web manifest...');
try {
  const manifestPath = path.join(process.cwd(), 'public/site.webmanifest');
  const manifestContent = fs.readFileSync(manifestPath, 'utf8');
  const manifest = JSON.parse(manifestContent);
  
  const hasName = manifest.name;
  const hasDescription = manifest.description;
  const hasIcons = manifest.icons && manifest.icons.length > 0;
  const hasStartUrl = manifest.start_url;
  
  console.log(`  ${hasName ? '✅' : '❌'} App name`);
  console.log(`  ${hasDescription ? '✅' : '❌'} Description`);
  console.log(`  ${hasIcons ? '✅' : '❌'} Icons array`);
  console.log(`  ${hasStartUrl ? '✅' : '❌'} Start URL`);
} catch (error) {
  console.log('  ❌ Error reading/parsing manifest');
}

// Test 4: Check package.json for next-seo dependency
console.log('\n📦 Checking dependencies...');
try {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageContent = fs.readFileSync(packagePath, 'utf8');
  const packageJson = JSON.parse(packageContent);
  
  const hasNextSeo = packageJson.dependencies && packageJson.dependencies['next-seo'];
  console.log(`  ${hasNextSeo ? '✅' : '❌'} next-seo installed`);
} catch (error) {
  console.log('  ❌ Error reading package.json');
}

// Test 5: Validate SEO utility functions
console.log('\n🛠️ Checking SEO utilities...');
try {
  const seoUtilsPath = path.join(process.cwd(), 'src/utils/seo.ts');
  const seoContent = fs.readFileSync(seoUtilsPath, 'utf8');
  
  const hasDefaultSEO = seoContent.includes('export const defaultSEO');
  const hasPokemonSEO = seoContent.includes('generatePokemonSEO');
  const hasTypeSEO = seoContent.includes('generateTypeSEO');
  const hasStructuredData = seoContent.includes('generateStructuredData');
  
  console.log(`  ${hasDefaultSEO ? '✅' : '❌'} Default SEO config`);
  console.log(`  ${hasPokemonSEO ? '✅' : '❌'} Pokemon SEO generator`);
  console.log(`  ${hasTypeSEO ? '✅' : '❌'} Type SEO generator`);
  console.log(`  ${hasStructuredData ? '✅' : '❌'} Structured data generator`);
} catch (error) {
  console.log('  ❌ Error reading SEO utilities');
}

console.log('\n🎉 SEO Implementation Test Complete!');
console.log('\n💡 Next steps:');
console.log('  1. Set up your environment variables (.env.local)');
console.log('  2. Test the sitemap at /sitemap.xml');
console.log('  3. Validate structured data with Google\'s Rich Results Test');
console.log('  4. Submit sitemap to Google Search Console');
console.log('  5. Monitor Core Web Vitals with PageSpeed Insights');