import csvtojson from "csvtojson"
import fs from "fs"
const CSV_FILE_PATH = ".csv/data-csv.csv"
const TXT_FILE_PATH = ".csv/data-txt.txt"

const onError = (err) => {
  console.error(err)
  throw new Error(err)
}

const processedJson = (json) => {
  const fullItems = []
  const byLine = json.split("\r")
  const header = byLine[0].toLowerCase().split(",")
  header.splice(2, 1)
  for (let i = 1; i < byLine.length; i++) {
    const line = byLine[i].substring(1).split(",")
    line.splice(2, 1)
    const parsed = {}
    for (const index in line) {
      parsed[header[index]] = line[index]
    }
    fullItems.push(parsed)
  }
  return fullItems
}

async function fromCSVtoTXT() {
  try {
    const readeableStream = fs.createReadStream(CSV_FILE_PATH)
    readeableStream.setEncoding("utf8")
    const writeableStream = fs.createWriteStream(TXT_FILE_PATH)

    readeableStream.on("data", (data) => {
      const processed = processedJson(data)
      processed.forEach((line) => {
        writeableStream.write(JSON.stringify(line))
        writeableStream.write("\n")
      })
    })

    readeableStream.pipe(csvtojson())
    readeableStream.on("end", () => {
      console.log("finish")
    })
  } catch (err) {
    onError(err)
  }
}

fromCSVtoTXT()
