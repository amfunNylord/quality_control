const testsPath = 'tests.txt';
const outputPath = 'output.txt';
const resultPath = 'result.txt';

const fs = require('fs');
const data = fs.readFileSync(testsPath, 'utf-8').split('\r\n');

const paramsAndResult = data.map(n => n.split(' '));

const childProcess = require('child_process');

fs.writeFileSync(resultPath, '');

for (let i = 0; i < paramsAndResult.length; i++) {
    array = paramsAndResult[i];
    const result = array[array.length - 1];

    let command = 'app.exe ';
    
    for (let i = 0; i < array.length - 1; i++) {
        command += array[i] + ' ';
    }
    
    command += `>${outputPath}`;
    
    try {
        childProcess.execSync(command);
    } catch (error) {
        console.error(`exec error: ${error.message}`);
        continue;
    }

    const output = fs.readFileSync(outputPath, 'utf-8').split('\n');

    if (output[0] == result)
    {
        fs.appendFileSync(resultPath, 'success\n');
    }
    else
    {
        fs.appendFileSync(resultPath, 'error\n');
    }
}

if (fs.existsSync(outputPath)) {
    fs.unlinkSync(outputPath);
}