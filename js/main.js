/*
 * main.js
 * Copyright (C) 2017 Dan Catalano <dev@nwbt.co>
 *
 * Distributed under terms of the MIT license.
 */
import {BaseMultiseriesChart} from './base-multiseries-chart';
import css from '../css/styles.css';

let data = require('../resources/years-2014-2015.json');
let d3 = require('d3');

let years = data
  .filter(
    (objA) => {
      return objA.dates.length;
    })
  .filter(
    (objB) => {
      return objB.year.length;
    });

new BaseMultiseriesChart(years);
