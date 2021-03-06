import { Core } from '../core/Core.js';
export class RadialAxis extends Core {
  constructor(canvas, config) {
    super(canvas);
    this.defaultConfig = {
      radius: 100,
      fontSize: 4,
      x: 50,
      y: 50,
      axisAngle: 0,
      gap: 15,
      colour: 'black',
      strokeWidth: 0.3
    };
    this.resetConfig();
    this.updateConfig(config);
  }

  rings(data, minimised) {
    const { radius, fontSize, x, y, axisAngle, gap, colour, strokeWidth } = this.localConfig;
    const { displayAreaHeight, displayAreaWidth, min, max } = this.config;

    const meta = [];
    const ordinal = data.some(d => typeof d[0] === 'string' || d[0] instanceof String);
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, displayAreaHeight]);
    let scale;
    if (ordinal) {
      scale = d3
        .scaleOrdinal()
        .domain(data)
        .range(data);
    } else {
      scale = d3
        .scaleLinear()
        .domain([1, data.length])
        .range([min ? min : d3.min(data.map(d => d[0])), max ? max : d3.max(data.map(d => d[0]))]);
    }

    const nunberOfArcs = data.length;
    const bandWidth = yAxis(radius / 2 / (nunberOfArcs - 1));
    data.forEach((d, i) => {
      const radians = axisAngle * (Math.PI / 180);
      const calculateTextPosition = () => {
        const hypotenuse = bandWidth * i;
        const x = Math.sin(radians) * hypotenuse;
        const y = Math.cos(radians) * hypotenuse * -1;
        return [x + displayAreaWidth / 2, y + displayAreaHeight / 2];
      };
      const sin = gap / (bandWidth * (i + 1));
      const text = scale(ordinal ? d[0] : i + 1);

      meta.push({
        ringId: `ring${this.guid()}`,
        textId: `ringText${this.guid()}`,
        ringClass: `ring`,
        textClass: `ringText`,
        ringDataMin: {
          innerRadius: 1,
          outerRadius: 1,
          startAngle: radians + Math.asin(sin),
          endAngle: radians + Math.PI * 2 - Math.asin(sin),
          textLocation: [displayAreaWidth / 2, displayAreaHeight / 2],
          text: text instanceof String ? text : Math.round(text * 10) / 10
        },
        ringData: {
          innerRadius: bandWidth * i,
          outerRadius: bandWidth * i,
          startAngle: radians + Math.asin(sin),
          endAngle: radians + Math.PI * 2 - Math.asin(sin),
          textLocation: calculateTextPosition(),
          text: text instanceof String ? text : Math.round(text * 10) / 10
        }
      });
    });

    const arc = d3
      .arc()
      .innerRadius(d => d.innerRadius)
      .outerRadius(d => d.outerRadius)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle);
    const group = this.displayGroup.append('g');
    group
      .selectAll(`.${meta[0].ringClass}`)
      .data(meta)
      .enter()
      .append('path')
      .attr('class', d => d.ringClass)
      .attr('id', d => d.ringId)
      .attr('d', d => arc(minimised ? d.ringDataMin : d.ringData))
      .attr('stroke', colour)
      .attr('stroke-width', minimised ? 0 : strokeWidth)
      .attr('transform', `translate(${xAxis(x)}, ${yAxis(y)})`);
    group
      .selectAll('text')
      .data(meta)
      .enter()
      .append('text')
      .attr('class', d => d.textClass)
      .attr('id', d => d.textId)
      .attr('fill', colour)
      .attr('font-size', `${yAxis(minimised ? 0 : fontSize)}px`)
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle')
      .attr(
        'transform',
        d => `translate(${minimised ? d.ringDataMin.textLocation : d.ringData.textLocation})rotate(${0})`
      )
      .text(d => d.ringData.text);

    return {
      text: group.selectAll('text'),
      rings: group.selectAll('ring'),
      group,
      meta,
      minimise: () => {
        group
          .selectAll(`.${meta[0].ringClass}`)
          .data(meta)
          .transition()
          .attr('stroke-width', 0)
          .attr('d', d => arc(d.ringDataMin));
        group
          .selectAll(`.${meta[0].textClass}`)
          .data(meta)
          .transition()
          .attr('font-size', `${0}px`)
          .attr('transform', d => {
            return `translate(${d.ringDataMin.textLocation})`;
          });
      },
      maximise: () => {
        group
          .selectAll(`.${meta[0].ringClass}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('stroke-width', strokeWidth)
          .attr('d', d => arc(d.ringData));
        group
          .selectAll(`.${meta[0].textClass}`)
          .data(meta)
          .transition()
          .duration(3000)
          .attr('font-size', `${yAxis(fontSize)}px`)
          .attr('transform', d => {
            return `translate(${d.ringData.textLocation})`;
          });
      }
    };
  }

  ringsMinimised(data) {
    return this.rings(data, true);
  }
}
