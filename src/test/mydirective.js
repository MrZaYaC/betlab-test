'use strict';
describe('Directive: myDirective', function() {
  var scope;
  beforeEach(module('app'));
  scope = {};
  beforeEach(inject(function($controller, $rootScope) {
    return scope = $rootScope.$new();
  }));
  it('should create a table', inject(function($compile) {
    var element;
    element = angular.element('<my-directive></my-directive>');
    element = $compile(element)(scope);
    return expect(element.find('table').length).toBe(1);
  }));
  it('should load some data', inject(function($compile) {
    var element, run;
    element = angular.element('<my-directive></my-directive>');
    element = $compile(element)(scope);
    run = function() {
      return expect(element.find('.t_rows').length).toBe > 0;
    };
    return setTimeout(run, 500);
  }));
  it('should display 6 cells', inject(function($compile) {
    var element, run;
    element = angular.element('<my-directive></my-directive>');
    element = $compile(element)(scope);
    run = function() {
      return expect(element.find('table th').length).toBe(6);
    };
    return setTimeout(run, 500);
  }));
  it('should display 2 cells', inject(function($compile) {
    var element, run;
    element = angular.element('<my-directive rows="[\'id\', \'name\']"></my-directive>');
    element = $compile(element)(scope);
    run = function() {
      return expect(element.find('table th').length).toBe(2);
    };
    return setTimeout(run, 500);
  }));
  it('should load some data', inject(function($compile) {
    var element, run;
    element = angular.element('<my-directive source="https://api.github.com/users/MrZaYaC/repos"></my-directive>');
    element = $compile(element)(scope);
    run = function() {
      return expect(element.find('.t_rows').length).toBe > 0;
    };
    return setTimeout(run, 500);
  }));
  return it('should print only one row', inject(function($compile) {
    var element, run;
    element = angular.element('<my-directive source="https://api.github.com/users/MrZaYaC/repos" filter="{id:13390955}"></my-directive>');
    element = $compile(element)(scope);
    run = function() {
      return expect(element.find('.t_rows').length).toBe(1);
    };
    return setTimeout(run, 500);
  }));
});
