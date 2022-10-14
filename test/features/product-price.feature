@price
Feature: Product price verification

    As a user, I can see the same price of a product both inside
    the inventory page and in the product page.

    As a user, I can add several products to the cart and when
    I complete the checkout, the final price should be the total
    sum of the product prices displayed on the inventory page
    and the taxes should be applied correctly.

    Background:
        Given I am logged in
        And I am on the articles page

    Scenario: As a user, I can see the correct product price
        # Given I am logged in
        # And I am on the articles page
        When I see the price of a random product
        And I click on the product
        Then I should see the same price in the product page
    
    @checkout
    Scenario: As a user, I can see the correct final checkout price
        # Given I am logged in
        # And I am on the articles page
        When I add a random number of products to the cart
        And I click the cart button
        # And I click the checkout button
        # And I complete the checkout form
        # And I click continue
        And I complete the checkout
        Then I should see that the final price is correct
        And I should see that the taxes applied are 8.00%