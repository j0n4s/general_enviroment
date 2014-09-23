'use strict';

module.exports = {
  list : function() {
    element(by.css('ul.nav [href="#/subjects"]')).click();
  },
  search : function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },
  edit : function(search) {
    this.search(search);
    element.all(by.css('[href^="#/subjects/edit"]')).get(0).click();
  },
  delete: function(search) {
    this.search(search);
    element.all(by.css('[click-confirm="delete_subject(subject)"]')).get(0).click();
  }
};