import childProcess from 'child_process';

const execProcess = (command) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    if (error !== null) {
      console.log(`error: ${error}`);
    }
  });
}

execProcess('node -v');

const spawnProcess = (command, args) => {
  const process = childProcess.spawn(command, args);
  let fullData = '';
  let dataChunks = 0;

  process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  process.stdout.on('data', (data) => {
    fullData += data;
    dataChunks += 1;
    console.log(`stdout: ${data}`);
  });

  // end of data stream, there we can output the data
  process.stdout.on('end', () => {
    console.log(`end: ${fullData}`);
    console.log(`chunks: ${dataChunks}`);
  });

  // event when process is finished
  // there we can get to know with what code it was ended (0 - success, 1 - error)
  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

spawnProcess('node', ['-v']);