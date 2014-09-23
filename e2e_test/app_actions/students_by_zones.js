'use strict';

module.exports = {
  list : function() {
    element(by.css('ul.nav [href="#/students_by_zones"]')).click();
  },
  search : function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  }
};