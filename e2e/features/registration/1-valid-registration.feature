Feature: Registration 1 - Valid registration

   
   Scenario: Register an account using valid email
   Given user opens the authorization page
    When user fills in the registration form with a valid email
    Then user should be able to proceed to user data form