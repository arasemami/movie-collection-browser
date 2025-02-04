Feature: Movie Detail View
  As a movie enthusiast
  I want to view detailed information about a movie
  So that I can learn more before deciding to watch it

  Scenario: View movie details
    Given I am on the movie list page
    When I click on a movie titled "Back in Action"
    Then I should be navigated to the detail page for "Back in Action"
    And I should see the following details:
      | Title          | ReleaseYear | Rating | Cast         |
      | Back in Action |        2025 |  6.637 | Cameron Diaz |

  Scenario: Add and remove movie from watchlist on detail page
    Given I am on the detail page for "Back in Action"
    And I see an "Add to Watchlist" button
    When I click the "Add to Watchlist" button for "Back in Action"
    Then the button text should change to "Remove to Watchlist" for "Back in Action"
    When I click the "Remove to Watchlist" button for "Back in Action"
    Then the button text should change back to "Add to Watchlist" for "Back in Action"
