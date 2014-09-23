Steps to run Real-Time e2e debbugger
====================================

[first read this article](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

'npm install' would install the chromedriver

if the answer is no then:

`$ npm install chromedriver`

run selenium standalone with chromedriver

`$ ./e2e_test/start_selenium_with_chromedriver.sh`

then run the app

`$ ./startApp.sh`

finally run the debugger

`$ ./e2e_test/debugger.sh`

to test if the debugger is working, in the login screen, do this:

`element(by.model('email')).sendKeys('protractor').then(console.log)`

and this will be add 'protractor' text in the email input.

to get this text write this code:

`element(by.model('email')).getAttribute('value').then(console.log)`

I don't know why getText() don't work!

IMPORTANT NOTE: Try always to use then() in every method to avoid critical errors that shut down this debugger.

______________________
