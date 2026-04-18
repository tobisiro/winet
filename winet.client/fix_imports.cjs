const fs = require('fs');
const path = require('path');
const uiDir = 'src/components/ui';
fs.readdirSync(uiDir).forEach(file => {
    let content = fs.readFileSync(path.join(uiDir, file), 'utf8');
    content = content.replace(/from '\.\/Navbar'/g, "from '../layout/Navbar'");
    content = content.replace(/from '\.\/Footer'/g, "from '../layout/Footer'");
    content = content.replace(/from '\.\/FloatingContact'/g, "from '../layout/FloatingContact'");
    fs.writeFileSync(path.join(uiDir, file), content);
});
console.log('Fixed imports in ui components');
