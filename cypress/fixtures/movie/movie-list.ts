import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I navigate to the movie list page', () => {
  cy.visit('http://localhost:4200');
});

When('the application fetches movies from the API', () => {
  cy.get('app-movie-card').should('be.visible');
});

Then('I should see a list of movies with the following details:', (dataTable: any) => {
  dataTable.hashes().forEach((row: any) => {
    cy.contains(row.Title).should('exist');

    console.log('(' + row.ReleaseYear + ')', row)
    cy.contains(row.ReleaseYear).should('exist');
  });
});

Then("each movie should have a clickable link to its detail page", () => {
  cy.get('app-movie-card')
    .each((movieCard) => {
      cy.wrap(movieCard)
        .find('a')
        .should('have.attr', 'href')
        .and('include', '/movie');
    });
});

Given('I see a movie titled {string}', (movieName: string) => {
  cy.contains(movieName).should('exist');
});