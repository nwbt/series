/*
 * main.js
 * Copyright (C) 2017 Dan Catalano <dev@nwbt.co>
 *
 * Distributed under terms of the MIT license.
 */
import _ from 'lodash';

function component () {
  'use strict';
	var element = document.createElement('div');

	element.innerHTML = _.join(['Hello','webpack'], ' ');
  
  return element;
}

document.body.appendChild(component());
