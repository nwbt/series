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

    let d3 = require('d3');
    let parseTime = d3.timeParse('%Y-%m-%d');

    let new_years_day = parseTime('2015-01-01');
    let new_years_eve = parseTime('2015-12-31');

    let x = d3.scaleTime().range([0, this.width]);
    let y = d3.scaleLinear().range([this.height, 0]);
    let z = d3.scaleOrdinal(d3.schemeCategory10);

    d3.timeMonth.range(new_years_day, new_years_eve);

    x.domain([new_years_day, new_years_eve]);

    let max = d3.max(years, (year) => {
      return d3.max(year.dates, (dates) => {
        return dates.flow;
      })
    });

    y.domain([0, max]);

    this.chart.append('g')
      .attr('class', 'axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    this.chart.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).tickSize(-this.width))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .text('Cubic Feet Per Second, (ft³/s)');

    let line = d3.line()
      .curve(d3.curveBasis)
      .x((d) => { return x(parseTime(d.date)); })
      .y((d) => { return y(d.flow); });

    years.forEach((year) => {

      let theLine = line(year.dates);
      this.chart.append('g')
          .attr('class', 'year')
        .append('path')
          .attr('class', 'line')
          .attr('d', theLine)
          .style('stroke', z(year.year));
    });
  }
}
