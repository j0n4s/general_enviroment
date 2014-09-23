'use strict';

var _ = require('underscore');

module.exports = {
  list : function() {
    element(by.css('ul.nav [href="#/courses"]')).click();
  },
  creation_form : function() {
    element(by.css('[href="#/courses/create"]')).click();
  },
  change_tab : function(tab) {
    element(by.css('[data-target="#' + tab + '"]')).click();
  },
  select_student : function(data_student) {
    _(data_student).each(function(student) {
      element(by.xpath('//td[contains(text(),"' + student.nombre + '")]/preceding::td[1]/..')).click();
    });
  },
  add_schdule : function() {
    element(by.css('[ng-click="add_schedule()"]')).click();
  },
  search : function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },
  edit : function(search) {
    this.search(search);
    element.all(by.css('[href^="#/courses/edit"]')).get(0).click();
  },
  delete: function(search) {
    this.search(search);
    element.all(by.css('[click-confirm="delete_course(course)"]')).get(0).click();
  },
  open_modal: function(modal){
		return element(by.css(modal)).click();
	},
  wizard_create : function() {
    element(by.css('[href="#/courses_wizard/create"]')).click();
  },
  select_subjects : function(subject, tab_id) {
    _(subject).each(function(value) {
      element(by.xpath('//div[@id="' + tab_id + '"]//td[contains(text(),"' + value + '")]/preceding::td[1]/..')).click();
    });
  },
  change_tab_wizard : function(tab) {
    element.all(by.css('#grades_tab span[ng-click]')).get(tab).click();
  },
  select_teacher : function(key, index, value, id) {
    this.fill_choosen_select(key, index, value, id);
  },
  fill_choosen_select : function(key, index, value, id) {
    click_by_index(id + '[ng-model="' + key + '"] + .chosen-container', index);
    send_keys_by_index(id + '[ng-model="' + key + '"] + div.chosen-container .chosen-search input', index, value);
    click_by_index(id + '[ng-model="' + key + '"] + div.chosen-container ul.chosen-results li[data-option-array-index]', index);
  },
  select_unified_tab : function() {
    element.all(by.css('#sections_tab span[ng-click]')).get(1).click();
  },
};

function click_by_index(css_selector, index) {
  return element.all(by.css(css_selector)).then(function(inputs) {
    return inputs[index].click();
  });
}

function send_keys_by_index(css_selector, index, value) {
  return element.all(by.css(css_selector)).then(function(inputs) {
    return inputs[index].sendKeys(value);
  });
}