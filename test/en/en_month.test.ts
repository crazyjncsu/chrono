import * as chrono from "../../src";
import { testSingleCase, testUnexpectedResult } from "../test_util";

test("Test - Month-Year expression", function () {
    testSingleCase(chrono, "September 2012", (result) => {
        expect(result.text).toBe("September 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "Sept 2012", (result) => {
        expect(result.text).toBe("Sept 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "Sep 2012", (result) => {
        expect(result.text).toBe("Sep 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "Sep. 2012", (result) => {
        expect(result.text).toBe("Sep. 2012");

        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "Sep-2012", (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("Sep-2012");

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "in June of 2022", (result) => {
        expect(result.text).toContain("June of 2022");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(6);
    });

    testSingleCase(chrono, "Statement of comprehensive income for the year ended Dec. 2021", (result) => {
        expect(result.text).toBe("Dec. 2021");

        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(12);

        expect(result.start.isCertain("year")).toBe(true);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);
    });
});

test("Test - Month-Only expression", function () {
    testSingleCase(chrono, "In January", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.text).toContain("January");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono, "in Jan", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.text).toContain("Jan");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(1);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2021, 1 - 1, 1, 12));
    });

    testSingleCase(chrono, "May", new Date(2020, 11 - 1, 22), (result) => {
        expect(result.text).toContain("May");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(5);
        expect(result.start.get("day")).toBe(1);

        expect(result.start.isCertain("year")).toBe(false);
        expect(result.start.isCertain("month")).toBe(true);
        expect(result.start.isCertain("day")).toBe(false);

        expect(result.start).toBeDate(new Date(2021, 5 - 1, 1, 12));
    });
});

test("Test - Month-Only Range expression", () => {
    testSingleCase(chrono, "From May to December", new Date(2023, 4 - 1, 9), (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(5);
        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(12);
    });

    testSingleCase(chrono, "From December to May", new Date(2023, 4 - 1, 9), (result) => {
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(12);
        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(5);
    });

    testSingleCase(chrono, "From May to December, 2022", new Date(2023, 4 - 1, 9), (result) => {
        expect(result.start.get("year")).toBe(2022);
        expect(result.start.get("month")).toBe(5);
        expect(result.end.get("year")).toBe(2022);
        expect(result.end.get("month")).toBe(12);
    });

    testSingleCase(chrono, "From December to May 2022", new Date(2023, 4 - 1, 9), (result) => {
        expect(result.start.get("year")).toBe(2021);
        expect(result.start.get("month")).toBe(12);
        expect(result.end.get("year")).toBe(2022);
        expect(result.end.get("month")).toBe(5);
    });

    testSingleCase(chrono, "From December to May 2020", new Date(2023, 4 - 1, 9), (result) => {
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(12);
        expect(result.end.get("year")).toBe(2020);
        expect(result.end.get("month")).toBe(5);
    });

    testSingleCase(chrono, "From December to May 2025", new Date(2023, 4 - 1, 9), (result) => {
        expect(result.start.get("year")).toBe(2024);
        expect(result.start.get("month")).toBe(12);
        expect(result.end.get("year")).toBe(2025);
        expect(result.end.get("month")).toBe(5);
    });
});

test("Test - Month with farward date option", () => {
    testSingleCase(chrono, "in December", new Date(2023, 4 - 1, 9), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(12);
    });

    testSingleCase(chrono, "in May", new Date(2023, 4 - 1, 9), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(5);
    });

    testSingleCase(chrono, "From May to December", new Date(2023, 4 - 1, 9), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(5);
        expect(result.end.get("year")).toBe(2023);
        expect(result.end.get("month")).toBe(12);
    });

    testSingleCase(chrono, "From December to May", new Date(2023, 4 - 1, 9), { forwardDate: true }, (result) => {
        expect(result.start.get("year")).toBe(2023);
        expect(result.start.get("month")).toBe(12);
        expect(result.end.get("year")).toBe(2024);
        expect(result.end.get("month")).toBe(5);
    });
});

test("Test - Month expression in context", function () {
    testSingleCase(chrono, "The date is Sep 2012 is the date", (result) => {
        expect(result.index).toBe(12);
        expect(result.text).toBe("Sep 2012");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "By Angie Mar November 2019", (result) => {
        expect(result.text).toBe("November 2019");

        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2019);
        expect(result.start.get("month")).toBe(11);

        expect(result.start).toBeDate(new Date(2019, 11 - 1, 1, 12));
    });
});

test("Test - Month slash expression", function () {
    testSingleCase(chrono, "9/2012", new Date(2012, 7, 10), (result) => {
        expect(result.start).not.toBeNull();
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("9/2012");

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });

    testSingleCase(chrono, "09/2012", new Date(2012, 7, 10), (result) => {
        expect(result.start.get("year")).toBe(2012);
        expect(result.start.get("month")).toBe(9);

        expect(result.index).toBe(0);
        expect(result.text).toBe("09/2012");

        expect(result.start).toBeDate(new Date(2012, 9 - 1, 1, 12));
    });
});

test("Test - year 90's parsing", () => {
    testSingleCase(chrono, "Aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
    });

    testSingleCase(chrono, "96 Aug 96", new Date(2012, 7, 10), (result) => {
        expect(result.text).toBe("Aug 96");

        expect(result.start.get("year")).toBe(1996);
        expect(result.start.get("month")).toBe(8);
    });
});

test("Test - Month should not have timezone", () => {
    testSingleCase(
        chrono,
        "People visiting Buñol towards the end of August get a good chance to participate in La Tomatina (under normal circumstances)",
        new Date(2012, 7, 10),
        (result) => {
            expect(result.text).toBe("August");
            expect(result.start.get("year")).toBe(2012);
            expect(result.start.get("month")).toBe(8);
        }
    );
});

test("Test - Month only in different context", () => {
    testSingleCase(chrono.casual, "May", (result) => {
        expect(result.text).toContain("May");
    });

    testSingleCase(chrono.casual, "in May", (result) => {
        expect(result.text).toContain("May");
    });

    testUnexpectedResult(chrono.casual, "The mountain may not move");
    testUnexpectedResult(chrono.casual, "May not be correct");
});
