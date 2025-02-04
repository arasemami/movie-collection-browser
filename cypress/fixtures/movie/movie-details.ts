import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I click on a movie titled {string}', (movieName: string) => {
    cy.contains(movieName).click();
});

Then('I should be navigated to the detail page for {string}', (movieName: string) => {
    cy.url().should('include', '/movie');
    cy.contains(movieName).should('exist');
});

Then('I should see the following details:', (dataTable: any) => {
    dataTable.hashes().forEach((row: any) => {
        cy.contains(row.Title).should('exist');
        cy.contains(row.ReleaseYear).should('exist');
        cy.contains(row.Rating).should('exist');
        cy.contains(row.Cast).should('exist');
    });
});

Given('I am on the detail page for {string}', (movieName: string) => {
    cy.visit('http://localhost:4200');
    cy.contains(movieName).click();
    cy.url().should('include', '/movie');
    cy.contains(movieName).should('exist');
});

Given('I see an "Add to Watchlist" button', (movieName: string) => {
    cy.contains('Add to Watchlist').should('exist');
});
