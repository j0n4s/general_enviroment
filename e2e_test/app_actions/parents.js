'use strict';
module.exports = {


  tab_general_info: function() {
    element(by.css('a[data-target="#tab-general-info"]')).click();
  },

  tab_additional: function(){
    element(by.css('a[data-target="#tab-additional"]')).click();
  },

  tab_home: function(){
    element(by.css('a[data-target="#tab-home"]')).click();
  },

  tab_profesional: function(){
    element(by.css('a[data-target="#tab-profesional"]')).click();
  },

  list: function(){
    element(by.css('ul.nav [href="#/parents"]')).click();
  },

  creation_form: function() {
    this.list();
    element(by.css('[href="#/parents/create"]')).click();
  },

  search: function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },

  edit: function(search) {
    this.search(search);
    element.all(by.css('[href^="#/parents/edit"]')).get(0).click();
  },
  delete: function(search) {
    this.search(search);
    element.all(by.css('[click-confirm="delete_parent(parent)"]')).get(0).click();
  }
};
