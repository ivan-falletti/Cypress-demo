describe("AlaskaAir Cypress demo", () => {
    beforeEach(() => {

        // Open Alaska site
        cy.visit("https://www.alaskaair.com/");

    });

    it("can book a flight", () => {

        // Select one way trip
        cy.get("#oneWay").check();

        // Unselect 'use miles' option
        cy.get("#awardReservation").uncheck();

        // Enter 'sea' on departure city
        cy.get("#fromCity1").type("sea");

        // Enter 'lax' on arrival city
        cy.get("#toCity1").type("lax");

        // Clear departure date textbox and enter a new date
        cy.get("#departureDate1")
            .clear()
            .type("1/15/2019");

        // Click on some label to close date picker
        cy.get(".cityLabel")
            .first()
            .click();

        // Select 1 adult
        cy.get("#adultCount").select("1 adult");

        // Click on 'Find flights' button
        cy.get("#findFlights").click();

        // Select a Refundable flight
        cy.get("#MatrixTable0 .refundable-toggle").click();
        cy.get("#MatrixTable0 .coach-fare.refundable-fare.Selectable")
            .first()
            .find("input")
            .click();

        // Click on 'Add to cart' button
        cy.get("#ContinueButton").click();

        cy.get("#Submit1").click();
        cy.get("#ContinueAsGuest").click();

        // Fill traveler information
        const traveler = "#Traveler_0";
        cy.get(`${traveler}__FirstName`).type("Bob");
        cy.get(`${traveler}__LastName`).type("Tester");
        cy.get(`${traveler}__Gender`).select("Male");
        cy.get(`${traveler}__BirthMonth`).select("5");
        cy.get(`${traveler}__BirthDay`).select("16");
        cy.get(`${traveler}__BirthYear`).type("1979");

        // Fill contact information
        cy.get("#TravelerPhoneNbr_TravelerPhoneNumber").type("555-555-5555");
        cy.get("#ContactEmail_EmailAddress").type("bob@test.com");
        cy.get("#EmailSubscription_AgreeToEmailSubscription").uncheck();

        cy.get("#ContinueButton").click();

        // Select a seat
        cy.get("#seatmap-tab-item-0 .seat:not(.premium-class):not(.preferred):not(.occupied):not(.accessible):not(.assigned)")
            .first()
            .click();

        cy.get("#ContinueButton").click();

        // Get payment information from fixture JSON
        cy.fixture("payment.json").as("paymentDetails");

        // Fill payment information
        cy.get("#CreditCardInformation_BillingCreditCardEntry_CardNumber").type(
            this.paymentDetails.card.number
        );
        // cy.get(
        //     "#CreditCardInformation_BillingCreditCardEntry_ExpirationMonths_Selected"
        // ).select(month);
        // cy.get(
        //     "#CreditCardInformation_BillingCreditCardEntry_ExpirationYears_Selected"
        // ).select(year);
        // cy.get("#CreditCardInformation_BillingCreditCardEntry_CardPersonName").type(
        //     name
        // );
        // cy.get("#CreditCardInformation_BillingAddressEntry_Address1").type(line1);
        // cy.get("#CreditCardInformation_BillingAddressEntry_PostalCode").type(zipCode);
        // cy.get("#CreditCardInformation_BillingAddressEntry_USStates_Selected").select(
        //     state
        // );
        // cy.get("#CreditCardInformation_BillingPhoneNumberEntry_Number").type(phone);

        cy.get("#PurchaseButton").click();
    });
});