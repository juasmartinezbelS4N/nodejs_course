import axios from "axios"
import * as publicHolidayService from "../../services/public-holidays.service"
import { PublicHoliday } from "../../types"
import { PUBLIC_HOLIDAYS_API_URL } from "../../config"

const mockedHolidays: PublicHoliday[] = [
  {
    date: "2023-12-25",
    localName: "Christmas",
    name: "Christmas",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: 1900,
    types: [],
  },
  {
    date: "2024-01-01",
    localName: "New year",
    name: "New year",
    countryCode: "FR",
    fixed: true,
    global: true,
    counties: null,
    launchYear: 1900,
    types: [],
  },
]

const year = 2024
const country = "FR"

describe("public-holidays-service", () => {
  let axiosSpy: jest.SpyInstance
  beforeEach(() => {
    axiosSpy = jest
      .spyOn(axios, "get")
      .mockImplementation(() => Promise.resolve({ data: mockedHolidays, status: 200 }))
  })

  describe("getListOfPublicHolidays", () => {
    it("returns shorten list of holidays", async () => {
      const result = await publicHolidayService.getListOfPublicHolidays(
        year,
        country
      )
      expect(result).toMatchObject([
        {
          name: mockedHolidays[0].name,
          localName: mockedHolidays[0].localName,
          date: mockedHolidays[0].date,
        },
        {
          name: mockedHolidays[1].name,
          localName: mockedHolidays[1].localName,
          date: mockedHolidays[1].date,
        },
      ])
    })

    it("expects the call to be called properly", async () => {
      await publicHolidayService.getListOfPublicHolidays(year, country)
      expect(axiosSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`
      )
    })

    it("returns empty if an error takes place", async () => {
      axiosSpy.mockReturnValue(new Error("no connection"))
      const result = await publicHolidayService.getListOfPublicHolidays(
        year,
        country
      )
      expect(result).toMatchObject([])
    })
  })

  describe("getNextPublicHolidays", () => {
    it("returns shorten list of holidays", async () => {
      const result = await publicHolidayService.getNextPublicHolidays(
        country
      )
      expect(result).toMatchObject([
        {
          name: mockedHolidays[0].name,
          localName: mockedHolidays[0].localName,
          date: mockedHolidays[0].date,
        },
        {
          name: mockedHolidays[1].name,
          localName: mockedHolidays[1].localName,
          date: mockedHolidays[1].date,
        },
      ])
    })

    it("expects the call to be called properly", async () => {
      await publicHolidayService.getNextPublicHolidays(country)
      expect(axiosSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`
      )
    })

    it("returns empty if an error takes place", async () => {
      axiosSpy.mockReturnValue(new Error("no connection"))
      const result = await publicHolidayService.getNextPublicHolidays(
        country
      )
      expect(result).toMatchObject([])
    })
  })

  describe("checkIfTodayIsPublicHoliday", () => {
    it("returns true if call works", async () => {
      const result = await publicHolidayService.checkIfTodayIsPublicHoliday(
        country
      )
      expect(result).toEqual(true)
    })

    it("expects the call to be called properly", async () => {
      await publicHolidayService.checkIfTodayIsPublicHoliday(country)
      expect(axiosSpy).toHaveBeenCalledWith(
        `${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`
      )
    })

    it("returns false if call fails", async () => {
      axiosSpy.mockReturnValue(new Error("no connection"))
      const result = await publicHolidayService.checkIfTodayIsPublicHoliday(
        country
      )
      expect(result).toEqual(false)
    })
  })
})
