import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

When('I click the "Add to Watchlist" button for {string}', (movieName: string) => {
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Add to Watchlist')
        .click();
});

Then('the button text should change to "Remove to Watchlist" for {string}', (movieName: string) => {
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Remove to Watchlist');
});

When('I click the "Remove to Watchlist" button for {string}', (movieName: string) => {
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Remove to Watchlist')
        .click();
});

Then('the button text should change back to "Add to Watchlist" for {string}', (movieName: string) => {
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Add to Watchlist');
});


Given("I am on the movie list page", () => {
    cy.visit('http://localhost:4200');
});