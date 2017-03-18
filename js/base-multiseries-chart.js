/**
 * File: base-multiseries-chart Project: series
 * Copyright © 2017 Dan Catalano <dev@nwbt.co>
 *
 * Distributed under terms of the MIT license.
 */
import {BaseChart} from './base-chart'

export class BaseMultiseriesChart extends BaseChart {
  constructor(years) {
    super(years);
    this.multi_series(years);
  }

  multi_series(years) {

    let line, parseDate, parseYear, thisYear, paths, lastYear;
    let yAxis, yAxisMin, yAxisMax;
    let scales = {};

    let d3 = require('d3');

    parseDate = d3.timeParse('%Y-%m-%d');
    parseYear = d3.timeParse('%Y');

    lastYear = d3.max(years, year => {
      return parseYear(+year.year);
    }).getUTCFullYear();

    yAxisMin = 0;
    yAxisMax = d3.max(years, (year) => {
      return d3.max(year.dates, (dates) => {
        return dates.flow;
      })
    });

    yAxis = d3.scaleLinear()
      .range([this.height, 0])
      .domain([yAxisMin, yAxisMax]);

    line = d3.line()
      .x(year => scales[thisYear](parseDate(year.date)))
      .y(year => yAxis(year.flow))
      .curve(d3.curveBasis);

    years.forEach(year => {
      scales["scale" + year.year] = d3.scaleTime()
        .domain([new Date(+year.year, 0, 1), new Date(+year.year, 11, 31)])
        .range([0, this.width]);
    });

    paths = this.chart.selectAll('foo')
      .data(years)
      .enter()
      .append('path');

    paths.attr('class', 'line')
      .attr('fill', 'none')
      .attr('d', year => {
        thisYear = "scale" + year.year;
        return line(year.dates);
      })
      .attr('id', (year) => {
        if(+(year.year) === lastYear) {
          return ('lastyear');
        }
      });

    this.chart.append('g')
      .attr('class', 'axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(scales.scale2017).tickFormat(d => d3.timeFormat("%b")(d))); // do not understand this at all

    this.chart.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(yAxis).tickSize(-this.width))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .text('Cubic Feet Per Second, (ft³/s)');
  }
}
