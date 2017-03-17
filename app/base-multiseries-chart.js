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

    let d3 = require('d3');

    let parseTime = d3.timeParse('%Y-%m-%d');

    let x = d3.scaleTime().range([0, this.width]);
    let y = d3.scaleLinear().range([this.height, 0]);
    let z = d3.scaleOrdinal(d3.schemeCategory20);

    x.domain(
      d3.extent(years, (year) => {
        d3.extent(year, (dates) => {
          return dates.date; // TODO remove year from date
        })
      })
    );

    this.chart.append('g')
      .attr('class', 'axis--x')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(x));

    y.domain([
      d3.min(years, (year) => {
        d3.min(year, (dates) => {
          return dates.flow;
        })
      }),
      d3.max(years, (year) => {
        d3.max(year, (dates) => {
          return dates.flow;
        })
      })
    ]);

    this.chart.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y))
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('fill', '#000')
        .text('Cubic Feet Per Second, (ft³/s)');


    let line = d3.line()
      .curve(d3.curveBasis)
      .x((d) => { x(d.date); })
      .y((d) => { y(d.flow); });

    years.forEach((year) => {
      console.log(year.year);
    });

    console.log('multi series');
  }
}
