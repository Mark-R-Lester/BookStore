var vals1 = [[1], [2], [3]];
var vals2 = [[40], [25], [25], [30], [20], [7]];

const qs = d3qs;
const canvas1 = qs.canvas.createCanvas('#chart', { width: 1000 });
const circular1 = new qs.radial(canvas1, {
  cornerRadius: 5
});
const radialText1 = new qs.radialText(canvas1, { radius: 70 });
circular1.pie(vals1).slices.attr('stroke', 'red');
radialText1.horizontalBanded(vals1);

const canvas2 = qs.canvas.createCanvas('#chart', { width: 200 });
const circular2 = new qs.radial(canvas2, { colorRange: ['yellow', 'orange'] });
const radialText2 = new qs.radialText(canvas2, { radius: 70 });
circular2.doughnut(vals2);
radialText2.followBanded(vals2).text.attr('fill', 'black');

const canvas3 = qs.canvas.createCanvas('#chart', { width: 200 });
const circular3 = new qs.radial(canvas3, {
  padAngle: 0.02,
  cornerRadius: 2
});
const radialText3 = new qs.radialText(canvas3, {
  radius: 80
});
circular3.doughnut(vals2);
radialText3.spokeBanded(vals2).text.attr('fill', 'black');

var vals4 = [
  [1, 'Apple'],
  [1, 'Pear'],
  [1, 'Orange'],
  [1, 'Satsuma'],
  [1, 'Lemon'],
  [1, 'Lime'],
  [1, 'Melon'],
  [1, 'Pineapple'],
  [1, 'Blueberry'],
  [1, 'Rasberry'],
  [1, 'Tngerine'],
  [1, 'Clementine'],
  [1, 'Fig'],
  [1, 'Date'],
  [1, 'Grape'],
  [1, 'Peach'],
  [1, 'Nectarine'],
  [1, 'Cherry'],
  [1, 'Plum']
];

var vals5 = [
  [1, 'European'],
  [1, 'European'],
  [1, 'Citrus'],
  [1, 'Citrus'],
  [1, 'Citrus'],
  [1, 'Citrus'],
  [1, 'American'],
  [1, 'Tropical'],
  [1, 'Berry'],
  [1, 'Berry'],
  [1, 'Citrus'],
  [1, 'Citrus'],
  [1, 'Eastern'],
  [1, 'Eastern'],
  [1, 'Vine'],
  [1, 'European'],
  [1, 'European'],
  [1, 'American'],
  [1, 'European']
];

const canvas4 = qs.canvas.createCanvas('#chart', {
  borderColour: 'pink',
  width: 500,
  height: 100,
  marginTop: 5,
  marginBottom: 5
});

const circular4 = new qs.radial(canvas4, {
  outerRadius: 90,
  innerRadius: 50,
  padAngle: 0.03,
  colorDomain: ['European', 'Tropical', 'Eastern', 'Vine', 'Citrus', 'American', 'Berry'],
  colorRange: ['salmon', 'darksalmon', 'purple', 'brown', 'hotpink', 'maroon', 'magenta']
});

circular4
  .doughnut(vals5)
  .slices.attr('fill-opacity', '0.5')
  .attr('stroke', 'none');
circular4.updateConfig({
  outerRadius: 100,
  innerRadius: 92,
  padAngle: 0.03
});

circular4
  .doughnut(vals5)
  .slices.attr('fill-opacity', '0.5')
  .attr('stroke', 'none');
circular4.updateConfig({
  outerRadius: 46,
  innerRadius: 40,
  padAngle: 0.03
});
circular4
  .doughnut(vals5)
  .slices.attr('fill-opacity', '0.5')
  .attr('stroke', 'none');
circular4.updateConfig({
  colors: ['red'],
  outerRadius: 38
});
circular4.pie([[1]]).slices.attr('fill-opacity', '0.5');

const radialText4 = new qs.radialText(canvas4, {
  radius: 70,
  fontSize: 4
});
radialText4.spokeBanded(vals4).text.attr('fill', 'black');
radialText4.updateConfig({
  radius: 105,
  fontSize: 4
});
radialText4.followBanded(vals5).text.attr('fill', 'black');
