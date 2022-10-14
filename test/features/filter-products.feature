@filter
Feature: Product order on filter verification

    As a user, I can filter the products alphabetically from A
    to Z or viceversa and by ascending or descending price.

    Scenario Outline: As a user, I can order the products by a filter option
        Given I am logged in
        And I am on the articles page
        When I filter the products by <filter option>
        Then I should see that the products are ordered correctly according to <filter option>

        Examples:
            | filter option       |
            | Name (A to Z)       |
            | Name (Z to A)       |
            | Price (low to high) |
            | Price (high to low) |