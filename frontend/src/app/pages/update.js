const fs = require('fs');

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace Names
    content = content.replace(/Enicworld/g, 'Eniacworld');
    content = content.replace(/enicworld/g, 'eniacworld');
    
    fs.writeFileSync(filePath, content);
}

try {
    processFile('d:\\newNexa\\fb-bulk-poster\\frontend\\src\\app\\pages\\privacy.tsx');
    processFile('d:\\newNexa\\fb-bulk-poster\\frontend\\src\\app\\pages\\terms.tsx');
    console.log("Success");
} catch(e) {
    console.error(e);
}
                                                          