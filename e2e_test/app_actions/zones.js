'use strict';

module.exports = {
  list : function() {
    element(by.css('ul.nav [href="#/city_zones"]')).click();
  },
  search : function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },
  edit : function(search) {
    this.search(search);
    element.all(by.css('[href^="#/city_zones/edit"]')).get(0).click();
  },
};