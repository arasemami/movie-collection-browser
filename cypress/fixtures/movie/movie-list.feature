Feature: Movie List
  As a movie enthusiast
  I want to browse a list of movies
  So that I can find movies to watch

  Scenario: Display the movie list
    Given I navigate to the movie list page
    When the application fetches movies from the API
    Then I should see a list of movies with the following details:
      | Title          | ReleaseYear |
      | Back in Action |        2025 |
    And each movie should have a clickable link to its detail page

  Scenario: Add and remove a movie from the watchlist
    Given I navigate to the movie list page
    And I see a movie titled "Back in Action"
    When I click the "Add to Watchlist" button for "Back in Action"
    Then the button text should change to "Remove to Watchlist" for "Back in Action"
    When I click the "Remove to Watchlist" button for "Back in Action"
    Then the button text should change back to "Add to Watchlist" for "Back in Action"
