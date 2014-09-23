'use strict';

browser.manage().window().setSize(1024, 768);

module.exports = {
  auth: require('../app_actions/auth.js'),
  staff: require('../app_actions/staff.js'),
  students: require('../app_actions/students.js'),
  parents: require('../app_actions/parents.js'),
  form: require('../app_actions/form.js'),
  permission_profiles: require('../app_actions/permission_profiles.js'),
  my_courses: require('../app_actions/my_courses.js'),
  years: require('../app_actions/years.js'),
  courses: require('../app_actions/courses.js'),
  subjects: require('../app_actions/subjects.js'),
  zones: require('../app_actions/zones.js'),
  bus_routes: require('../app_actions/bus_routes.js'),
  students_by_zones: require('../app_actions/students_by_zones.js')
};
