'use strict';

module.exports = {
  list : function() {
    element(by.css('ul.nav [href="#/bus_routes"]')).click();
  },
  search : function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },
  create : function() {
    element.all(by.css('[href^="#/bus_routes/create"]')).get(0).click();
  },
  edit : function(search) {
    this.search(search);
    element.all(by.css('[href^="#/bus_routes/edit"]')).get(0).click();
  },
  tab_general: function() {
    element(by.css('a[data-target="#tab-general"]')).click();
  },
  tab_driver: function() {
    element(by.css('a[data-target="#tab-driver"]')).click();
  },
  tab_trips: function() {
    element(by.css('a[data-target="#tab-trips"]')).click();
  },
 
};