import csvtojson from "csvtojson"
import fs from "fs"
const CSV_FILE_PATH = ".csv/data-csv.csv"

async function fromCSVtoTXT() {
  try {
    const onError = (err) => {
      console.error(err)
    }

    const onComplete = () => {
      console.log("completed")
    }

    csvtojson()
      .fromFile(CSV_FILE_PATH)
      .subscribe(
        (json) => {
          const parsedJson = {}
          for (const key of Object.keys(json)) {
            parsedJson[key.toLocaleLowerCase()] = json[key]
          }
          fs.appendFile(
            "data-csv.txt",
            `${JSON.stringify(parsedJson)}\n`,
            (err) => {
              if (err) {
                console.error(err)
                throw new Error(err)
              }
            }
          )
        },
        onError,
        onComplete
      )
  } catch (err) {
    throw new Error(err)
  }
}

fromCSVtoTXT()
