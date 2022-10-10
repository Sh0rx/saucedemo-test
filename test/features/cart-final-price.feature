Feature: Cart final price verification

    As a user, I can add several products to the cart and when
    I enter the cart page, the final price should be the total
    sum of the product prices displayed on the inventory page.

Scenario: As a user, I can see the correct final cart price
    Given I am logged in
    And I am on the articles page
    When I add a random number of products to the cart
    And I click the cart button
    And I click the checkout button
    And I complete the checkout form
    And I click continue
    Then I should see that the final price is correct
    And I should see that the taxes applied are 8.00%