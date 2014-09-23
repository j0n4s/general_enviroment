'use strict';

var form = require('./form.js');

module.exports = {

  list: function(){
    element(by.css('ul.nav [href="#/students"]')).click();
  },

  creation_form: function() {
    this.list();
    element(by.css('[href="#/students/create"]')).click();
  },

  edit: function(search){
    this.search(search);
    form.click_by_index('[href^="#/students/edit"]',0);
  },

  show: function(search) {
    this.search(search);
    form.click_by_index('[href^="#/students/show"]',0);
  },
  search: function(searchText) {
    var search_input = element(by.model('searchText'));
    search_input.clear();
    search_input.sendKeys(searchText);
  },

  tab_relatives: function(){
    element(by.css('a[data-target="#tab-relatives"]')).click();
  },

  tab_year: function(){
    element(by.css('a[data-target="#tab-year-info"]')).click();
  },

  tab_general: function(){
    element(by.css('a[data-target="#tab-general"]')).click();
  },

  tab_additional_info: function(){
    element(by.css('a[data-target="#tab-additional-info"]')).click();
  },

  tab_addresses: function(){
    element(by.css('a[data-target="#tab-addresses"]')).click();
  },

  tab_medical_history: function() {
    element(by.css('a[data-target="#tab-medical-history"]')).click();
  },

  tab_medical_history_info: function() {
    element(by.css('a[data-target="#tab-medical-history-info"]')).click();
  },

  tab_illness: function() {
    element(by.css('a[data-target="#illnesses-sub-tab"]')).click();
  },

  tab_allergies: function() {
    element(by.css('a[data-target="#allergies-sub-tab"]')).click();
  },

  tab_vaccines: function() {
    element(by.css('a[data-target="#vaccines-sub-tab"]')).click();
  },

  tab_notes: function() {
    element(by.css('a[data-target="#notes-sub-tab"]')).click();
  },

  tab_zones: function() {
    element(by.css('a[data-target="#city-zones-tab"]')).click();
  },

  add_relative: function(){
    element(by.css('[ng-click="add_relative()"]')).click();
  },

  add_address: function(){
    element(by.css('[ng-click="add_address()"]')).click();
  },

  create_relative: function(parent_data){
    this.add_relative();

    form.do_action_if_visible('[ng-click="switch_to_create_parent($index)"]','click');

    element(by.css('#parents_modals_form input.tt-input')).sendKeys('098765438765');
    form.submit('#parents_modals_form [ng-click="set_user(selected_user.id_card)"]');

    form.fill(parent_data);
  },

  add_illness: function(){
    element(by.css('[ng-click="add_illness()"]')).click();
  },

  add_allergy: function(){
    element(by.css('[ng-click="add_allergy()"]')).click();
  },

  add_vaccine: function(){
    element(by.css('[ng-click="add_vaccine()"]')).click();
  }
};



