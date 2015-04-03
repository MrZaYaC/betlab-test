# betlab-test
Middle JavaScript developer Test Task

## Install
To install for production

```
npm install
gulp pub
```

For develop you can run *dev* and *autotest* task

```
gulp dev
gulp autotest
```

## Use
To run myDirective you can use element or attribute
`<my-directive></my-directive>` or `<div my-directive></div>`

## Options
You can setup next options

`source="URL"` - default https://api.github.com/users/substack/repos

`rows=[]` - default `['id', 'name', 'private', 'html_url', 'owner', 'description']]` Array of fields that will be rendered

`myRender=function(field, repo)` - default function render in field owner only owner name

`filter={name:'vasya'}` - default false. Filter list of repos by field:value