import * as publicHolidayService from "../../services/public-holidays.service"

const year = 2024
const country = "GB"
const countrySecondary = "FR"

describe("public-holidays-service", () => {
  describe("getListOfPublicHolidays", () => {
    it("fetches a shorten list of holidays", async () => {
      const holidaysResult = await publicHolidayService.getListOfPublicHolidays(
        year,
        country
      )
      expect(holidaysResult.length).toBeGreaterThan(0)
      holidaysResult.forEach((result) => {
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("localName")
        expect(result).toHaveProperty("date")
      })
    })
    it("fetches different lists for each country", async () => {
      const holidaysResult1 =
        await publicHolidayService.getListOfPublicHolidays(year, country)
      const holidaysResult2 =
        await publicHolidayService.getListOfPublicHolidays(
          year,
          countrySecondary
        )
      expect(holidaysResult1.length).toBeGreaterThan(0)
      expect(holidaysResult2.length).toBeGreaterThan(0)
      expect(holidaysResult1).not.toMatchObject(holidaysResult2)
    })
  })

  describe("getNextPublicHolidays", () => {
    it("fetches a shorten list of holidays for the country", async () => {
      const holidaysResult = await publicHolidayService.getNextPublicHolidays(
        country
      )
      expect(holidaysResult.length).toBeGreaterThan(0)
      holidaysResult.forEach((result) => {
        expect(result).toHaveProperty("name")
        expect(result).toHaveProperty("localName")
        expect(result).toHaveProperty("date")
      })
    })
    it("fetches different lists for each country", async () => {
      const holidaysResult1 = await publicHolidayService.getNextPublicHolidays(
        country
      )
      const holidaysResult2 = await publicHolidayService.getNextPublicHolidays(
        countrySecondary
      )
      expect(holidaysResult1.length).toBeGreaterThan(0)
      expect(holidaysResult2.length).toBeGreaterThan(0)
      expect(holidaysResult1).not.toMatchObject(holidaysResult2)
    })
  })

  describe("checkIfTodayIsPublicHoliday", () => {
    it("returns false if today is not a holiday", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2024-09-01"))
      const result = await publicHolidayService.checkIfTodayIsPublicHoliday(
        country
      )
      expect(result).toEqual(false)
    })
    it("returns true if today is a holiday", async () => {
      jest.useFakeTimers().setSystemTime(new Date("2024-12-25"))
      const result = await publicHolidayService.checkIfTodayIsPublicHoliday(
        country
      )
      expect(result).toEqual(false)
    })
  })
})
