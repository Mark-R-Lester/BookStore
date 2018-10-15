export class radialAxis {
  constructor(canvas, config) {
    this.config = canvas.config;
    this.displayGroup = canvas.displayGroup;
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
    this.localConfig = {};
    this.resetConfig();
    this.updateConfig(config);
  }

  resetConfig() {
    Object.keys(this.defaultConfig).forEach(key => (this.localConfig[key] = this.defaultConfig[key]));
  }

  updateConfig(config) {
    config = config ? config : {};
    Object.keys(config).forEach(key => (this.localConfig[key] = config[key]));
  }

  rings(data) {
    const { radius, fontSize, x, y, axisAngle, gap, colour, strokeWidth } = this.localConfig;
    const meta = [];
    const ordinal = data.some(d => typeof d[0] === 'string' || d[0] instanceof String);
    const xAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaWidth]);
    const yAxis = d3
      .scaleLinear()
      .domain([0, 100])
      .range([0, this.config.displayAreaHeight]);
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
        .range([d3.min(data.map(d => d[0])), d3.max(data.map(d => d[0]))]);
    }

    const createArcData = (data, min) => {
      const nunberOfArcs = data.length;
      const bandWidth = yAxis(radius / 2 / (nunberOfArcs - 1));

      return data.map((d, i) => {
        const radians = axisAngle * (Math.PI / 180);
        const calculateTextPosition = () => {
          const hypotenuse = bandWidth * i;
          const x = Math.sin(radians) * hypotenuse;
          const y = Math.cos(radians) * hypotenuse * -1;
          return [x + this.config.displayAreaWidth / 2, y + this.config.displayAreaHeight / 2];
        };
        const sin = gap / (bandWidth * (i + 1));
        const text = scale(ordinal ? d[0] : i + 1);
        return {
          innerRadius: bandWidth * i,
          outerRadius: bandWidth * i,
          startAngle: radians + Math.asin(sin),
          endAngle: radians + Math.PI * 2 - Math.asin(sin),
          textLocation: calculateTextPosition(),
          text: text instanceof String ? text : Math.round(text * 10) / 10
        };
      });
    };

    const arc = d3
      .arc()
      .innerRadius(d => d.innerRadius)
      .outerRadius(d => d.outerRadius)
      .startAngle(d => d.startAngle)
      .endAngle(d => d.endAngle);

    const distinct = Math.random().toString();
    const arcData = createArcData(data);
    console.log(arcData);
    const arcDataMin = createArcData(data);
    const axis = this.displayGroup.append('g');
    axis
      .selectAll('.ring')
      .data(arcData)
      .enter()
      .append('path')
      .attr('class', 'textArc')
      .attr('id', (d, i) => 'textArc_' + distinct + i)
      .attr('d', arc)
      .attr('stroke', colour)
      .attr('stroke-width', strokeWidth)
      .attr('transform', 'translate(' + xAxis(x) + ',' + yAxis(y) + ')');
    axis
      .selectAll('.ring')
      .data(arcData)
      .enter()
      .append('text')
      .attr('fill', colour)
      .attr('font-size', yAxis(fontSize) + 'px')
      .style('text-anchor', 'middle')
      .style('alignment-baseline', 'middle')
      .attr('transform', d => {
        return 'translate(' + d.textLocation + ')rotate(' + 0 + ')';
      })
      .text(d => d.text);

    return {
      text: axis.selectAll('text'),
      rings: axis.selectAll('ring')
    };
  }
}
