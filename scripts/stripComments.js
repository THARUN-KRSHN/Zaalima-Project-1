import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function stripComments(source) {
    let out = '';
    let i = 0;
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let inTemplateLiteral = false;
    let inSingleLineComment = false;
    let inMultiLineComment = false;
    
    while (i < source.length) {
        let char = source[i];
        let nextChar = source[i + 1] || '';
        
        if (inSingleLineComment) {
            if (char === '\n' || char === '\r') {
                inSingleLineComment = false;
                out += char;
            }
        } else if (inMultiLineComment) {
            if (char === '*' && nextChar === '/') {
                inMultiLineComment = false;
                i++; 
            }
        } else if (inSingleQuote) {
            if (char === '\\') {
                out += char + nextChar;
                i++;
            } else if (char === "'") {
                inSingleQuote = false;
                out += char;
            } else {
                out += char;
            }
        } else if (inDoubleQuote) {
            if (char === '\\') {
                out += char + nextChar;
                i++;
            } else if (char === '"') {
                inDoubleQuote = false;
                out += char;
            } else {
                out += char;
            }
        } else if (inTemplateLiteral) {
            if (char === '\\') {
                out += char + nextChar;
                i++;
            } else if (char === '`') {
                inTemplateLiteral = false;
                out += char;
            } else {
                out += char;
            }
        } else {
            if (char === '/' && nextChar === '/') {
                inSingleLineComment = true;
                i++; 
            } else if (char === '/' && nextChar === '*') {
                inMultiLineComment = true;
                i++; 
            } else if (char === "'") {
                inSingleQuote = true;
                out += char;
            } else if (char === '"') {
                inDoubleQuote = true;
                out += char;
            } else if (char === '`') {
                inTemplateLiteral = true;
                out += char;
            } else {
                out += char;
            }
        }
        i++;
    }
    
    return out;
}

function processDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
                processDirectory(fullPath);
            }
        } else {
            const ext = path.extname(file);
            if (['.js', '.jsx', '.css'].includes(ext)) {
                if (fullPath === __filename) continue; 
                const content = fs.readFileSync(fullPath, 'utf8');
                const clean = stripComments(content);
                fs.writeFileSync(fullPath, clean, 'utf8');
            }
        }
    }
}

const projectRoot = path.resolve(__dirname, '..', '..');
const backendDir = path.join(projectRoot, 'backend');
const frontendSrcDir = path.join(projectRoot, 'frontend', 'src');

console.log(`Starting comment cleanup from: ${projectRoot}`);
if (fs.existsSync(backendDir)) {
    console.log('Processing backend folder...');
    processDirectory(backendDir);
}
if (fs.existsSync(frontendSrcDir)) {
    console.log('Processing frontend src folder...');
    processDirectory(frontendSrcDir);
}
console.log('Comment cleanup complete!');
