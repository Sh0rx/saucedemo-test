@name
Feature: Product name verification

    As a user, I can see the same price of a product both inside
    the inventory page and in the cart page after I add the 
    product to the cart.

    Scenario: As a user, I can see the correct product name
        Given I am logged in
        And I am on the articles page
        When I see the name of a random product
        And I add the product to the cart
        And I click the cart button
        Then I should see the same name of the product in the cart page