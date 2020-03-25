import * as d3 from 'd3';
import { Selection } from 'd3';
import { Interest } from '@mogilev-guide/models';
import { MutableRefObject } from 'react';
import { getD3FormattedInterestsData } from './dataFormate';
import { particle, simulateCollectBubblesInCenter } from './effects';
import { createCircles, createTexts } from './svgElements';

export function createBubbles(
  svgRef: MutableRefObject<SVGSVGElement>,
  data: Interest[]
): Selection<SVGSVGElement, unknown, null, undefined> {
  const d3Data = getD3FormattedInterestsData(svgRef.current.clientWidth, data);
  const svg = d3.select(svgRef.current);
  const width = parseInt(svg.style('width'));
  const height = parseInt(svg.style('height'));

  const update = svg.selectAll('circle').data(d3Data);
  const g = update.join('g');

  g.on('click', () => particle(g, svgRef.current));

  const bubbles = createCircles(g);
  const texts = createTexts(g, width, height);
  simulateCollectBubblesInCenter(d3Data, bubbles, texts, width, height);
  return svg;
}
