const fs = require('fs');
const path = require('path')
function resolvePackageFiles() {
    // Array of file paths you want to modify
    const cjsfilePath = path.resolve(__dirname, '../dist/package.json');
    // New content that you want to replace in the files
    const commonJS = '"type": "commonjs"';
    const module = '"type": "module"';
    // Read the file content
    fs.readFile(cjsfilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Replace the old content with the new content
        const updatedContent = data.replace(/"type": "commonjs"/g, commonJS);

        // Write the updated content back to the file
        fs.writeFile(cjsfilePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log(`Content has been updated in: ${cjsfilePath}`);
            }
        });
    });
    fs.readFile(mjsfilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        // Replace the old content with the new content
        const updatedContent = data.replace(/"type": "commonjs"/g, module);

        // Write the updated content back to the file
        fs.writeFile(mjsfilePath, updatedContent, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log(`Content has been updated in: ${mjsfilePath}`);
            }
        });
    });
}

resolvePackageFiles();