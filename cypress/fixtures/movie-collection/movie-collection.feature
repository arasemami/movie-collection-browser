Feature: Movie Collection App

    Scenario: User visits the homepage
        Given I visit the homepage
        Then I should see the movie collection title

    Scenario: User searches for a movie
        Given I visit the homepage
        When I search for "Inception"
        Then I should see "Inception" in the movie list

    Scenario: User views a movie detail
        Given I visit the homepage
        When I click on a movie titled "Inception"
        Then I should see the movie details
