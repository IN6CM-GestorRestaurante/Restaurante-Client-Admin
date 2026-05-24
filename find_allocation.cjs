const fs = require('fs');
const path = require('path');

const brainDir = "C:\\Users\\olive\\.gemini\\antigravity\\brain";
console.log("Searching for getSmartTableAllocation in transcripts...");

const folders = fs.readdirSync(brainDir).filter(f => {
    return fs.statSync(path.join(brainDir, f)).isDirectory() && f !== 'tempmediaStorage';
});

folders.forEach(folder => {
    const transcriptPath = path.join(brainDir, folder, '.system_generated', 'logs', 'transcript.jsonl');
    if (!fs.existsSync(transcriptPath)) return;
    
    const content = fs.readFileSync(transcriptPath, 'utf8');
    if (content.includes('getSmartTableAllocation')) {
        console.log(`Found in Convo: ${folder}`);
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.includes('getSmartTableAllocation') && line.includes('replace_file_content')) {
                console.log(`  -> Step match: ${line.substring(0, 300)}...`);
            }
        });
    }
});
