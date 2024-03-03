import os from "os"
import fs from "fs"
import childProcess from "child_process"

const WINDOWS_COMMAND = `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
const UNIX_LIKE_OS = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1"

const isWindows = () => {
  return os.platform() === "win32"
}

const getCommands = () => {
  return isWindows() ? WINDOWS_COMMAND : UNIX_LIKE_OS
}

const execProcess = (command, cb) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      cb(stderr)
    }
    cb(null, stdout)
  })
}

function timeout() {
  return new Promise((resolve, reject) => setTimeout(resolve, 100))
}

async function main() {
  let minute = 0;
  const fullLog = []
  const commands = getCommands()

  while(true){
    await timeout()
    minute++
    execProcess(commands, (stderr, stdout) => {
      if (stderr) {
        throw new Error("Error executing the command")
      }
      console.clear()
      console.log(stdout)
      fullLog.push(`${Date.now()}: ${stdout}`)
      if(minute % 600 === 0){
        fs.appendFile('activityMonitor.log', fullLog.join(''), (err) => {
          if (err) throw err;
        });
      }
    })
  }
}


main();