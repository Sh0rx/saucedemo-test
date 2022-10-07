Feature: Product price verification

    As a user, I can see the same price of a product both inside
    the inventory page and in the product page.

    Scenario: As a user, I can see the correct product price
        Given I am logged in
        And I am on the articles page
        When I see the price of a random product
        And I click on the product
        Then I should see the same price in the product page