'use strict';

module.exports = {
  
  list: function(){
    element(by.css('ul.nav [href="#/staff"]')).click();
  },
  
  tab_job_positions: function(){
    element.all(by.css('#myTab>li a')).get(1).click();
  },

  creation_form: function() {
    this.list();
    element(by.css('[href="#/staff/create"]')).click();
  },
  
  edit: function(search) {
    this.search(search);
    element.all(by.css('[href^="#/staff/edit"]')).get(0).click();
  },
  
  search: function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },
  
  delete: function(search) {
    this.search(search);
    element(by.css('[click-confirm="delete_staff(staff_member)"]')).click();
  },
  
  select_autocomplete: function() {
    element(by.xpath('//a[contains(text(), "Con")]/..')).click();
  }
};
