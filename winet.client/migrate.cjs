const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\\\Users\\\\tobia\\\\Documents\\\\Repositories\\\\winet\\\\winet_web\\\\src\\\\components';
const destDir = 'c:\\\\Users\\\\tobia\\\\Documents\\\\Repositories\\\\winet\\\\winet.client\\\\src\\\\components';

if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, {recursive: true});
if (!fs.existsSync(path.join(destDir, 'layout'))) fs.mkdirSync(path.join(destDir, 'layout'), {recursive: true});
if (!fs.existsSync(path.join(destDir, 'ui'))) fs.mkdirSync(path.join(destDir, 'ui'), {recursive: true});

const files = fs.readdirSync(srcDir);
files.forEach(file => {
    if (file.includes('3D')) return; // skip 3D files
    
    let content = fs.readFileSync(path.join(srcDir, file), 'utf8');
    
    // Replace react-router-dom with Tanstack Router
    content = content.replace(/from 'react-router-dom'/g, "from '@tanstack/react-router'");
    
    // Replace navigate('path') with navigate({to: 'path'})
    content = content.replace(/navigate\('([^']+)'\)/g, "navigate({to: '$1'})");
    
    // Remove dangerouslySetInnerHTML for Navbar, Footer, FloatingContact and add import
    if (file === 'Navbar.tsx') {
        content = content.replace(/<style dangerouslySetInnerHTML=\{{[^}]+\}\}\s*\/>/g, '');
        content = "import './Navbar.css';\n" + content;
    }
    if (file === 'Footer.tsx') {
        content = content.replace(/<style dangerouslySetInnerHTML=\{{[^}]+\}\}\s*\/>/g, '');
        content = "import './Footer.css';\n" + content;
    }
    if (file === 'FloatingContact.tsx') {
        content = content.replace(/<style dangerouslySetInnerHTML=\{{[^}]+\}\}\s*\/>/g, '');
        content = "import './FloatingContact.css';\n" + content;
    }

    // Determine dest dir based on component
    let destPath = path.join(destDir, file);
    if (file === 'Navbar.tsx' || file === 'Footer.tsx' || file === 'FloatingContact.tsx') {
        destPath = path.join(destDir, 'layout', file);
    } else {
        destPath = path.join(destDir, 'ui', file);
    }
    
    fs.writeFileSync(destPath, content);
    console.log('Migrated', file);
});
