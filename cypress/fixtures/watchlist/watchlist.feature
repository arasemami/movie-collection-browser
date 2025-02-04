Feature: Watchlist
  As a movie enthusiast
  I want to manage a watchlist
  So that I can keep track of movies I want to watch

  Scenario: Add a movie to the watchlist
    Given I am on the movie list page
    When I click "Add to Watchlist" for "Back in Action"
    Then "Back in Action" should be added to my watchlist

  Scenario: View the watchlist
    Given I have added movies to my watchlist
    When I navigate to the watchlist page
    Then I should see all the movies I have added

  Scenario: Remove a movie from the watchlist
    Given I have "Back in Action" in my watchlist
    When I click "Remove from Watchlist" for "Back in Action"
    Then "Back in Action" should be removed from my watchlist

  Scenario: Handle an empty watchlist
    Given I navigate to the watchlist page
    When my watchlist is empty
    Then I should see a message "Your watchlist is empty. Add some movies!"
