import request from "supertest"
import { PUBLIC_HOLIDAYS_API_URL } from "../../config"

const validContry = "GB"
const invalidContry = "foo-bar"
const validYear = 2024
const invalidYear = "year"
jest.setTimeout(300000)

describe("Nager.Date API", () => {
  describe("Country", () => {
    describe("/CountryInfo", () => {
      it("should return 200 and correct country info", async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/CountryInfo/${validContry}`
        )

        expect(status).toEqual(200)
        expect(body).toEqual({
          commonName: "United Kingdom",
          officialName: expect.any(String),
          countryCode: "GB",
          region: "Europe",
          borders: [expect.any(Object)],
        })
      })

      it("should return 404 if the country is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/CountryInfo/${invalidContry}`
        )
        expect(status).toEqual(404)
      })
    })
    describe("/AvailableCountries", () => {
      it("should return 200 and correct country info", async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          "/AvailableCountries"
        )

        expect(status).toEqual(200)
        expect(body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              countryCode: expect.any(String),
              name: expect.any(String),
            }),
          ])
        )
      })
    })
  })

  describe("LongWeekend", () => {
    describe("/LongWeekend", () => {
      it("should return 200 and correct info for the long weekends", async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/LongWeekend/${validYear}/${validContry}`
        )
        expect(status).toEqual(200)
        expect(body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              startDate: expect.any(String),
              endDate: expect.any(String),
              dayCount: expect.any(Number),
              needBridgeDay: expect.any(Boolean),
            }),
          ])
        )
      })
      it("should return 400 if year is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/LongWeekend/${invalidYear}/${validContry}`
        )
        expect(status).toEqual(400)
      })

      it("should return 404 if country is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/LongWeekend/${validYear}/${invalidContry}`
        )
        expect(status).toEqual(404)
      })
    })
  })

  describe("PublicHoliday", () => {
    describe("/PublicHolidays", () => {
      it("should return 200 and correct info for the public holidays", async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/PublicHolidays/${validYear}/${validContry}`
        )
        expect(status).toEqual(200)
        expect(body.length).toBeGreaterThan(0)
        body.forEach((result: any) => {
          expect(typeof result.date).toEqual("string")
          expect(typeof result.localName).toEqual("string")
          expect(typeof result.name).toEqual("string")
          expect(result.countryCode).toEqual(validContry)
          expect(typeof result.fixed).toEqual("boolean")
          expect(typeof result.global).toEqual("boolean")
          expect(result.types).toEqual(["Public"])
          if (result.launchYear)
            expect(typeof result.launchYear).toEqual("number")
          if (result.counties !== null) {
            expect(result.counties).toEqual(
              expect.arrayContaining([expect.any(String)])
            )
          }
        })
      })

      it("should return 400 if year is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/PublicHolidays/${invalidYear}/${validContry}`
        )
        expect(status).toEqual(400)
      })

      it("should return 404 if country is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/PublicHolidays/${validYear}/${invalidContry}`
        )
        expect(status).toEqual(404)
      })
    })

    describe("/IsTodayPublicHoliday", () => {
      it("returns 204 or 200 based on the date today", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/IsTodayPublicHoliday/${validContry}`
        )
        expect(status).toBeGreaterThanOrEqual(200)
        expect(status).toBeLessThanOrEqual(204)
      })
      it("returns 404 if country is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/IsTodayPublicHoliday/${invalidContry}`
        )
        expect(status).toEqual(404)
      })
    })

    describe("/NextPublicHolidays", () => {
      it("should return 200 and correct info for the next public holiday", async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/NextPublicHolidays/${validContry}`
        )
        expect(status).toEqual(200)
        expect(body.length).toBeGreaterThan(0)
        body.forEach((result: any) => {
          expect(typeof result.date).toEqual("string")
          expect(typeof result.localName).toEqual("string")
          expect(typeof result.name).toEqual("string")
          expect(result.countryCode).toEqual(validContry)
          expect(typeof result.fixed).toEqual("boolean")
          expect(typeof result.global).toEqual("boolean")
          expect(result.types).toEqual(["Public"])
          if (result.launchYear)
            expect(typeof result.launchYear).toEqual("number")
          if (result.counties !== null) {
            expect(result.counties).toEqual(
              expect.arrayContaining([expect.any(String)])
            )
          }
        })
      })

      it("should return 500 if country is invalid", async () => {
        const { status } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/NextPublicHolidays/${invalidContry}`
        )
        expect(status).toEqual(500)
      })
    })

    describe("/NextPublicHolidaysWorldwide", () => {
      it("should return 200 and correct info for the next public holiday worldwide", async () => {
        const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(
          `/NextPublicHolidaysWorldwide`
        )
        expect(status).toEqual(200)
        expect(body.length).toBeGreaterThan(0)
        body.forEach((result: any) => {
          expect(typeof result.date).toEqual("string")
          expect(typeof result.localName).toEqual("string")
          expect(typeof result.name).toEqual("string")
          expect(typeof result.countryCode).toEqual("string")
          expect(typeof result.fixed).toEqual("boolean")
          expect(typeof result.global).toEqual("boolean")
          expect(result.types).toEqual(["Public"])
          if (result.launchYear)
            expect(typeof result.launchYear).toEqual("number")
          if (result.counties !== null) {
            expect(result.counties).toEqual(
              expect.arrayContaining([expect.any(String)])
            )
          }
        })
      })
    })
  })
})
