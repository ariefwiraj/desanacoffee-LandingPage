const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/routes');
fs.readdirSync(dir).forEach(f => {
  if (f.endsWith('.ts')) {
    const filePath = path.join(dir, f);
    let c = fs.readFileSync(filePath, 'utf8');
    c = c.replace(/req\.params\.id(?! as string)/g, '(req.params.id as string)');
    fs.writeFileSync(filePath, c);
  }
});
console.log('Fixed typescript req.params.id errors');
