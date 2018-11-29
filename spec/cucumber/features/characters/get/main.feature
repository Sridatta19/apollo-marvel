# @todo
Feature: Retrieve Character Events

   As a logged in user
   In order to retrieve events related to a character
   I need to fetch details of the character first

# Background: Create a user and log-in with his account

#   Given A user is created with a random password and email
#   And a POST request is made to the /login/ API
#   And valid payload is sent to authentication request
#   And The token generated in response details are saved in context

Scenario: Retrieve A Character with events included
  When client creates a GET request
  Then retrieve all character details
