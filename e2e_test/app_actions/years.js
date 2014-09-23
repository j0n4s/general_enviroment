'use strict';

module.exports = {
  change: function(year) {
    element(by.css('li[working_year] a.dropdown-toggle')).click();
    element(by.xpath('//div[contains(text(), "' + year + '")]/..')).click();
  }

};

