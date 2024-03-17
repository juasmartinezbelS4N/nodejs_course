import * as helpers from "../../helpers"
import { PublicHoliday } from "../../types"

describe("validateInput", () => {
  const invalidCountry = "CO"
  const validCountry = "FR"
  const invalidYear = 1900
  const validYear = 2024

  it("throws error when country is not supported", () => {
    const input = { country: invalidCountry, year: validYear }
    expect(() => {
      helpers.validateInput(input)
    }).toThrow(`Country provided is not supported, received: ${invalidCountry}`)
  })

  it("throws error when year is not supported", () => {
    const input = { country: validCountry, year: invalidYear }
    expect(() => {
      helpers.validateInput(input)
    }).toThrow(`Year provided not the current, received: ${invalidYear}`)
  })

  it("returns true when input is correct", () => {
    const input = { country: validCountry, year: validYear }
    expect(helpers.validateInput(input)).toEqual(true)
  })
})

describe("shortenPublicHoliday", () => {
  const holiday: PublicHoliday = {
    date: "2024-05-01",
    localName: "Work Day",
    name: "Work Day",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: 1900,
    types: [],
  }

  it("returns short version of the holiday", () => {
    const shortHoliday = helpers.shortenPublicHoliday(holiday)
    expect(shortHoliday).toMatchObject({
      name: holiday.name,
      localName: holiday.localName,
      date: holiday.date,
    })
  })
})
