import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateImports(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    
    if (fs.statSync(fullPath).isDirectory()) {
      await updateImports(fullPath);
    } else if (file.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');

      // Replace all relative imports without extensions
      content = content.replace(/from '(\..*)';/g, "from '$1.js';");

      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated imports in: ${fullPath}`);
    }
  }
}

// Run for the "src" directory
await updateImports(path.join(__dirname, '../src'));
