import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I click "Add to Watchlist" for {string}', (movieName: string) => {
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Add to Watchlist')
        .click();
});

Then('{string} should be added to my watchlist', (movieName: string) => {
    cy.get('[id=watchlist]').click();
    cy.contains(movieName).should('exist');
});


Given('I have added movies to my watchlist', () => {
    cy.visit('http://localhost:4200');
    cy.get('app-watchlist-button[id="Moana 2"]')
        .find('button')
        .contains('Add to Watchlist')
        .click();
    cy.get('app-watchlist-button[id="Back in Action"]')
        .find('button')
        .contains('Add to Watchlist')
        .click();
    cy.get('app-watchlist-button[id="Babygirl"]')
        .find('button')
        .contains('Add to Watchlist')
        .click();
});

When('I navigate to the watchlist page', () => {
    cy.visit('http://localhost:4200');
    cy.get('[id=watchlist]').click();
});

Then('I should see all the movies I have added', () => {
    cy.get('app-movie-card')
        .each((movieCard) => {
            cy.wrap(movieCard)
                .find('a')
                .should('have.attr', 'href')
                .and('include', '/movie');
        });
});

Given('I have {string} in my watchlist', (movieName: string) => {
    cy.visit('http://localhost:4200');
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Add to Watchlist')
        .click();
    cy.get('[id=watchlist]').click();
})

When('I click "Remove from Watchlist" for {string}', (movieName: string) => {
    cy.get('app-watchlist-button[id="' + movieName + '"]')
        .find('button')
        .contains('Remove to Watchlist')
        .click();
});

Then('{string} should be removed from my watchlist', (movieName: string) => {
    cy.contains(movieName).should('not.exist');
});

When('my watchlist is empty', () => {
    cy.get('app-movie-card').should('not.exist');
});

Then('I should see a message {string}', (message: string) => {
    cy.contains(message).should('exist');
});