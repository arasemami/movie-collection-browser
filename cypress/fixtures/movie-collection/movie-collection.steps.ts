import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { expect } from 'chai';

Given('I visit the homepage', () => {
  cy.visit('http://localhost:4200');  
});

Then('I should see the movie collection title', () => {
  cy.contains('Movie Collection');  
});

When('I search for {string}', (movie: string) => {
  cy.get('input[placeholder="Search"]').type(movie);
  cy.get('button[type="submit"]').click();
});

Then('I should see {string} in the movie list', (movie: string) => {
  cy.contains(movie);
});

When('I click on a movie titled {string}', (movie: string) => {
  cy.contains(movie).click();
});

Then('I should see the movie details', () => {
  cy.url().should('include', '/movie-details');  
  cy.contains('Movie Details');
});
