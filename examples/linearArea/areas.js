var vals1 = [[15], [10], [20], [30], [40], [26], [90], [15], [102], [112], [156], [132]];
var vals2 = [[25], [15], [40], [36], [80], [100], [96], [136], [125], [155], [205], [213]];
var letters = [['a'], ['b'], ['c'], ['d'], ['e'], ['f'], ['g'], ['h'], ['i'], ['j'], ['k'], ['l']];
const max = d3.max([d3.max(vals1), d3.max(vals2)]);

this.curves = [
  d3.curveLinear,
  d3.curveStep,
  d3.curveStepBefore,
  d3.curveStepAfter,
  d3.curveBasis,
  d3.curveCardinal,
  d3.curveMonotoneX,
  d3.curveCatmullRom
];

const qs = d3qs;

const canvas3 = qs.canvas.createCanvas('#chart', { min: 0, max: 250 });
const area3 = new qs.area(canvas3, { curve: curves[6] });
area3
  .horizontal(vals1)
  .area.attr('fill', 'blue')
  .attr('fill-opacity', '0.5');
area3.horizontal(vals2, vals1);

const axis3 = new qs.axis(canvas3);
axis3.yAxis([0, 250]);
axis3.xAxis(letters);
