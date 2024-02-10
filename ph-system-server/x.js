const { exec } = require('child_process');

// Replace 'your-executable.exe' with the actual path to your .exe file
const exePath = 'C:\\PROGRA~1\\doctor-prescription-full\\update.exe';

// Replace 'arguments' with any command-line arguments your executable requires
const arguments = ['arg1', 'arg2'];

exec(`${exePath} ${arguments.join(' ')}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
