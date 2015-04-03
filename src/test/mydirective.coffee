'use strict'

describe 'Directive: myDirective', ->

  # load the directive's module
  beforeEach module 'app'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should create a table', inject ($compile) ->
    element = angular.element '<my-directive></my-directive>'
    element = $compile(element) scope
    expect(element.find('table').length).toBe 1

  it 'should load some data', inject ($compile) ->
    element = angular.element '<my-directive></my-directive>'
    element = $compile(element) scope
    run = () ->
      expect(element.find('.t_rows').length).toBe > 0
    setTimeout(run, 500)

  it 'should display 6 cells', inject ($compile) ->
    element = angular.element '<my-directive></my-directive>'
    element = $compile(element) scope
    run = () ->
      expect(element.find('table th').length).toBe 6
    setTimeout(run, 500)

  it 'should display 2 cells', inject ($compile) ->
    element = angular.element '<my-directive rows="[\'id\', \'name\']"></my-directive>'
    element = $compile(element) scope
    run = () ->
      expect(element.find('table th').length).toBe 2
    setTimeout(run, 500)

  it 'should load some data', inject ($compile) ->
    element = angular.element '<my-directive source="https://api.github.com/users/MrZaYaC/repos"></my-directive>'
    element = $compile(element) scope
    run = () ->
      expect(element.find('.t_rows').length).toBe > 0
    setTimeout(run, 500)

  it 'should print only one row', inject ($compile) ->
    element = angular.element '<my-directive source="https://api.github.com/users/MrZaYaC/repos" filter="{id:13390955}"></my-directive>'
    element = $compile(element) scope
    run = () ->
      expect(element.find('.t_rows').length).toBe 1
    setTimeout(run, 500)
