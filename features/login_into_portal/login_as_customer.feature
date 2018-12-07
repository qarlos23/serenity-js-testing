
Feature: User is login to the DCC Portal

  In order to focus on things that matter
  Zeiss Customers would like to be able to
  login into the portal

  Scenario Outline: Login <expected result>

    Given that a registered user wants to login into the portal
     When he clicks on sign in      
     When he enters his <username> and <password>
     Then he sees the portal as <expected result>

    Examples:
      | username | password | expected result | 
      | demo@zeiss.com         | carl-zeiss | as normal user   |