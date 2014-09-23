'use strict';

var _ = require('underscore');

module.exports = {
  fill: function(data, index, container) {
    container = container || '';
    var _this = this;
    _(data).each(function(value, key){

      if(!index){
        index = 0;
      }

      if(_(value).isArray()){
        _(value).each(function(data) {
          _this.fill(data);
        });
        return;
      }

      element.all(by.css(container+' [ng-model="'+key+'"], [model="'+key+'"]'))
      .then(function(inputs){
        var input = inputs[index];

        if(!input){
          throw 'element not found with ng-model: '+key;
        }

        input.isDisplayed().then(function(visible) {
          if (!visible) {
            input.getAttribute('datepicker').then(function(is_datepicket) {
              if (is_datepicket !== null) {
                input.getAttribute('id').then(function(is_id) {
                  if (is_id !== null) {
                    input = element(by.id(is_id + '_mirror'));
                  }
                });
              }
            });
          }
        });

        input.getAttribute('type')
        .then(function(type) {

          if(type === 'radio'){
            return _this.fill_radio(key, value, index);
          }

          if(type === 'select-one'){
            return _this.fill_select(input, key, value, index);
          }

          if(type === 'checkbox'){
            return input.click();
          }

          input.clear();
          input.sendKeys(value);
        });

      });
    });
  }, //fin fill

  fill_select: function(input, key, value, index){
    var _this = this;
    return input.getAttribute('chosenselect')
    .then(function(is_chosenselect) {

      if(is_chosenselect !== null){
        return _this.fill_chosenselect(key, value, index);
      }

      return _this.fill_simple_select(key, value, index);
    });
  },

  fill_radio: function(key, value, index) {
    return click_by_index('[ng-model="'+key+'"][value="'+value+'"]', index);
  },

  fill_simple_select: function(key, value, index){
    return click_by_index('[ng-model="'+key+'"] [value="'+value+'"]', index);
  },

  fill_chosenselect: function(key, value, index){
    click_by_index('select[ng-model="'+key+'"] + .chosen-container', index);
    send_keys_by_index('select[ng-model="'+key+'"] + div.chosen-container .chosen-search input', index, value);
    return click_by_index('select[ng-model="'+key+'"] + div.chosen-container ul.chosen-results li[data-option-array-index]', index);
  },

  submit: function(selector) {
    selector = selector || 'form button[type="submit"]';
    element.all(by.css(selector)).get(0).click();
  },

  do_action_if_visible: do_action_if_visible,

  click_by_index: click_by_index,

  click_by_id: click_by_id,

  by_bo_bind: by_bo_bind,
};

function by_bo_bind(selector){
  return element(by.css('[bo-bind^="'+ selector +'"]'));
}

function click_by_id(id){
  return element(by.id(id)).click();
}

function click_by_index(css_selector, index){
  return element.all(by.css(css_selector)).get(index).click();
}

function send_keys_by_index(css_selector, index, value){
  return element.all(by.css(css_selector)).then(function(inputs){
    return inputs[index].sendKeys(value);
  });
}

function do_action_if_visible(selector, action, action_parameter){
  element.all(by.css(selector))
  .each(function(element){
    element.isDisplayed().then(function(visible) {
      if(visible){
        if(action_parameter){
          element[action](action_parameter);
        }
        else{
          element[action]();
        }
      }
    });
  });
}
