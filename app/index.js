
'use strict';
import 'styles/index.scss';
import template from './template.hbs';

let peoples = {
  people: [
    {firstName: "Yehuda", lastName: "Katz"},
    {firstName: "Carl", lastName: "Lerche"},
    {firstName: "Alan", lastName: "Johnson"}
  ]
};

console.log(template(peoples));

document.querySelector('#usersList').innerHTML = template(peoples);
