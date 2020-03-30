import * as d3 from 'd3';
import { Selection, EnterElement, Simulation } from 'd3';
import {
  D3InterestData,
  EFFECTS_PARTICLE,
  EFFECTS_SIMULATION_TO_CENTER
} from '../models';

export function particle(
  element: Selection<
    SVGGElement | Element | EnterElement | Document | Window,
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
    .attr('r', EFFECTS_PARTICLE.MIN_RADIUS)
    .attr('fill', EFFECTS_PARTICLE.FILL_COLOR)
    .style('stroke', EFFECTS_PARTICLE.STROKE_COLOR)
    .style('stroke-width', EFFECTS_PARTICLE.STROKE_WIDTH)
    .style('stroke-opacity', EFFECTS_PARTICLE.STROKE_START_OPACITY)
    .transition()
    .duration(EFFECTS_PARTICLE.TRANSITION_DURATION)
    .ease(Math.sqrt)
    .attr('r', EFFECTS_PARTICLE.MAX_RADIUS)
    .style('stroke-opacity', EFFECTS_PARTICLE.STROKE_STOP_OPACITY)
    .remove();
}

export function simulateCollectBubblesInCenter(
  d3Data: D3InterestData[],
  bubbles: Selection<SVGCircleElement, D3InterestData, SVGSVGElement, unknown>,
  texts: Selection<SVGTextElement, D3InterestData, SVGSVGElement, unknown>,
  width: number,
  height: number
): Simulation<D3InterestData, undefined> {
  return d3
    .forceSimulation(d3Data)
    .velocityDecay(EFFECTS_SIMULATION_TO_CENTER.VELOCITY_DECOY)
    .force(
      'x',
      d3.forceX().strength(EFFECTS_SIMULATION_TO_CENTER.FORCE_STRENGTH_X)
    )
    .force(
      'y',
      d3.forceY().strength(EFFECTS_SIMULATION_TO_CENTER.FORCE_STRENGTH_Y)
    )
    .force(
      'collide',
      d3
        .forceCollide()
        .radius(
          (d: D3InterestData) =>
            d.radius + EFFECTS_SIMULATION_TO_CENTER.COLLIDE_RADIUS_DELTA
        )
        .iterations(EFFECTS_SIMULATION_TO_CENTER.COLLIDE_ITERATIONS)
    )
    .on('tick', () => {
      bubbles
        .attr('cx', d => d.x + width / 2)
        .attr('cy', d => d.y + height / 2)
        .on('click', (b, i, circles) => {
          Array.from(circles).map((circle, idx) => {
            circle.style.transition =
              EFFECTS_SIMULATION_TO_CENTER.FILL_CIRCLE_TRANSITION;
            const text = document.body.querySelectorAll('text')[idx];
            if (idx === i) {
              if (
                text.getAttribute('fill') ===
                EFFECTS_SIMULATION_TO_CENTER.FILL_TEXT_START_COLOR
              ) {
                text.setAttribute(
                  'fill',
                  EFFECTS_SIMULATION_TO_CENTER.FILL_TEXT_STOP_COLOR
                );
              } else {
                text.setAttribute(
                  'fill',
                  EFFECTS_SIMULATION_TO_CENTER.FILL_TEXT_START_COLOR
                );
              }
              if (
                circle.getAttribute('fill') ===
                EFFECTS_SIMULATION_TO_CENTER.FILL_CIRCLE_START_COLOR
              ) {
                circle.setAttribute(
                  'fill',
                  EFFECTS_SIMULATION_TO_CENTER.FILL_CIRCLE_STOP_COLOR
                );
              } else {
                circle.setAttribute(
                  'fill',
                  EFFECTS_SIMULATION_TO_CENTER.FILL_CIRCLE_START_COLOR
                );
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
        .attr(
          'font-size',
          d => `${d.radius / EFFECTS_SIMULATION_TO_CENTER.FONT_SIZE_DELTA}px`
        );
    });
}
