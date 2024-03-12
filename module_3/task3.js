import csvtojson from "csvtojson"
import fs from "fs"
const CSV_FILE_PATH = ".csv/data-csv.csv"
const TXT_FILE_PATH = ".csv/data-txt.txt"

const onError = (err) => {
  console.error(err)
  throw new Error(err)
}

const processedJson = (json) => {
  const parsedJson = {}
  for (const key of Object.keys(json)) {
    parsedJson[key.toLocaleLowerCase()] = json[key]
  }
  return parsedJson
}

async function fromCSVtoTXT() {
  try {
    const readeableStream = fs.createReadStream(CSV_FILE_PATH)
    readeableStream.setEncoding("utf8")
    const writeableStream = fs.createWriteStream(TXT_FILE_PATH)

    readeableStream.pipe(csvtojson({ignoreColumns: /Amount/})).subscribe((json, _lineNumber) => {
      const processed = processedJson(json)
      writeableStream.write(`${JSON.stringify(processed)}\n`)
    }, onError)
    readeableStream.on("end", () => {
      console.log("finish")
    })
  } catch (err) {
    onError(err)
  }
}

fromCSVtoTXT()
