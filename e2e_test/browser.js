'use strict';

module.exports= function() {
  
  var protractor = require('selenium-webdriver');

  //var browser = protractor.getInstance();
  var timeout = function() {
    return 20000;
  };
  
  var window_set_default_size = function() {
    return browser.manage().window().setSize(1024, 768);
  };
  
  var column = function (elements, column) {
    return browser.findElements(protractor.By.repeater(elements).column('{{' + column + '}}'));
  };

  var row = function (elements, row) {
    return browser.findElement(protractor.By.repeater(elements).row(row));
  };

  var row_link = function(row, link) {
    return row.findElement(protractor.By.css(link));
  };

  var input = function(input) {
    return browser.findElement(protractor.By.input(input));
  };

  var value = function(input) {
    return browser.findElement(protractor.By.input(input)).getAttribute('value');
  };

  var css = function(css) {
    return browser.findElement(protractor.By.css(css));
  };

  var row_column = function(elements, row, column) {
    return browser.findElement(protractor.By.repeater(elements).row(row).column(column));
  };

  var id = function(id) {
    return browser.findElement(protractor.By.id(id));
  };

  var class_name = function(class_name) {
    return browser.findElement(protractor.By.className(class_name));
  };

  var wait = function() {
    return browser.waitForAngular();
  };

  browser.timeout = timeout;
  browser.window_set_default_size = window_set_default_size;
  browser.column = column;
  browser.row = row;
  browser.row_link = row_link;
  browser.input = input;
  browser.input_value = value;
  browser.css = css;
  browser.row_column = row_column;
  browser.id = id;
  browser.class_name = class_name;
  browser.wait = wait;
  
  return browser;
};