import * as d3 from 'd3';
import { Selection, EnterElement, Simulation } from 'd3';
import { Interest } from '@mogilev-guide/models';
import { D3InterestData } from './models';
import {
  BUBBLE_RADIUS_DELTA,
  LARGE_BUBBLE_SIZE,
  MEDIUM_BUBBLE_SIZE,
  SMALL_BUBBLE_SIZE
} from './constants';
import { MutableRefObject } from 'react';

function getD3FormattedInterests(
  width: number,
  interestsData: Interest[]
): D3InterestData[] {
  const getRadius = (width: number, percentage: number) =>
    ((width * percentage) / 100) * BUBBLE_RADIUS_DELTA;
  return interestsData.map(item => {
    return {
      id: item.id,
      label: item.label,
      radius:
        item.size === 'large'
          ? getRadius(width, LARGE_BUBBLE_SIZE)
          : item.size === 'medium'
          ? getRadius(width, MEDIUM_BUBBLE_SIZE)
          : getRadius(width, SMALL_BUBBLE_SIZE)
    };
  });
}

function particle(
  element: Selection<
    SVGGElement | Element | d3.EnterElement | Document | Window,
    D3InterestData,
    SVGSVGElement,
    unknown
  >,
  svg: SVGSVGElement
) {
  const m = d3.mouse(svg);
  element
    .append('circle')
    .attr('cx', m[0])
    .attr('cy', m[1])
    .attr('r', 1)
    .attr('fill', 'transparent')
    .style('stroke', '#09DDDF')
    .style('stroke-width', '5')
    .style('stroke-opacity', 1)
    .transition()
    .duration(500)
    .ease(Math.sqrt)
    .attr('r', 50)
    .style('stroke-opacity', 1e-6)
    .remove();
}

function createBubbles(
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
    .attr('stroke', '#09DDDF')
    .attr('stroke-width', 2)
    .attr('fill', '#FFFFFF');
}

function createTexts(
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
    .attr('fill', '#09DDDF');
}

function runSimulation(
  d3Data: D3InterestData[],
  bubbles: Selection<SVGCircleElement, D3InterestData, SVGSVGElement, unknown>,
  texts: Selection<SVGTextElement, D3InterestData, SVGSVGElement, unknown>,
  width: number,
  height: number
): Simulation<D3InterestData, undefined> {
  return d3
    .forceSimulation(d3Data)
    .velocityDecay(0.1)
    .force('x', d3.forceX().strength(0.01))
    .force('y', d3.forceY().strength(0.01))
    .force(
      'collide',
      d3
        .forceCollide()
        .radius((d: D3InterestData) => d.radius + 0.5)
        .iterations(3)
    )
    .on('tick', () => {
      bubbles
        .attr('cx', d => d.x + width / 2)
        .attr('cy', d => d.y + height / 2)
        .on('click', (b, i, circles) => {
          Array.from(circles).map((circle, idx) => {
            circle.style.transition = '1s';
            const text = document.body.querySelectorAll('text')[idx];
            if (idx === i) {
              if (text.getAttribute('fill') === '#09DDDF') {
                text.setAttribute('fill', '#FFFFFF');
              } else {
                text.setAttribute('fill', '#09DDDF');
              }
              circle.setAttribute('transition', '0.2s');
              if (circle.getAttribute('fill') === '#09DDDF') {
                circle.setAttribute('fill', 'transparent');
              } else {
                circle.setAttribute('fill', '#09DDDF');
              }
            }
            return circle;
          });
        });
      texts
        .attr('dx', d => d.x + width / 2)
        .attr('dy', d => d.y + height / 2)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('pointer-events', 'none')
        .attr('font-size', d => `${d.radius / 5}px`);
    });
}

export function createD3Bubbles(
  svgRef: MutableRefObject<SVGSVGElement>,
  data: Interest[]
): Selection<SVGSVGElement, unknown, null, undefined> {
  const d3Data = getD3FormattedInterests(svgRef.current.clientWidth, data);
  const svg = d3.select(svgRef.current);
  const width = parseInt(svg.style('width'));
  const height = parseInt(svg.style('height'));

  const update = svg.selectAll('circle').data(d3Data);
  const g = update.join('g');

  g.on('click', () => particle(g, svgRef.current));

  const bubbles = createBubbles(g);
  const texts = createTexts(g, width, height);
  runSimulation(d3Data, bubbles, texts, width, height);
  return svg;
}
