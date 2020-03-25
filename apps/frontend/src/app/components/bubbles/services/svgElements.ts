import { Selection, EnterElement } from 'd3';
import { D3InterestData, SVG_CIRCLE, SVG_TEXT } from '../models';

export function createCircles(
  g: Selection<
    Element | EnterElement | Document | Window | SVGGElement,
    D3InterestData,
    SVGSVGElement,
    unknown
  >
): Selection<SVGCircleElement, D3InterestData, SVGSVGElement, unknown> {
  return g
    .append('circle')
    .attr('class', 'bubble')
    .attr('r', value => value.radius)
    .attr('cx', value => value.radius)
    .attr('cy', value => value.radius)
    .attr('stroke', SVG_CIRCLE.STROKE_COLOR)
    .attr('stroke-width', SVG_CIRCLE.STROKE_WIDTH)
    .attr('fill', SVG_CIRCLE.FILL_COLOR);
}

export function createTexts(
  g: Selection<
    Element | EnterElement | Document | Window | SVGGElement,
    D3InterestData,
    SVGSVGElement,
    unknown
  >,
  width: number,
  height: number
): Selection<SVGTextElement, D3InterestData, SVGSVGElement, unknown> {
  return g
    .append('text')
    .text(value => value.label)
    .attr('dx', value => value.radius + width / 2)
    .attr('dy', value => value.radius + height / 2)
    .attr('fill', SVG_TEXT.FILL_COLOR);
}
