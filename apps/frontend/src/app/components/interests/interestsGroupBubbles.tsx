import React, { memo, useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3';
import { Interest } from '@mogilev-guide/models';
import styled from 'styled-components';

interface Props {
  data: Interest[];
}

interface D3SvgData extends SimulationNodeDatum {
  id: string;
  r: number;
  label: string;
}

const StyledGroup = styled.svg`
  text-align: center;
  width: 100%;
  height: 400px;
`;

export const InterestsGroupBubbles = memo(({ data }: Props) => {
  const [svgData, setSvgData] = useState([] as D3SvgData[]);
  const svgRef = useRef<SVGSVGElement>();

  useEffect(() => {
    const width = svgRef.current.clientWidth;
    const delta = 0.4;
    setSvgData(
      data.map(d => {
        let radius = 0;
        if (d.size === 'large') {
          radius = ((width * 40) / 100) * delta;
        } else if (d.size === 'medium') {
          radius = ((width * 35) / 100) * delta;
        } else {
          radius = ((width * 25) / 100) * delta;
        }
        return {
          id: d.id,
          r: radius,
          label: d.label
        };
      })
    );
  }, [data]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = parseInt(svg.style('width'));
    const height = parseInt(svg.style('height'));
    svg.on('click', particle);

    function particle() {
      const m = d3.mouse(this);
      svg
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

    const update = svg.selectAll('circle').data(svgData);
    const g = update.join('g');
    const bubbles = g
      .append('circle')
      .attr('class', 'bubble')
      .attr('r', value => value.r)
      .attr('cx', value => value.r)
      .attr('cy', value => value.r)
      .attr('stroke', '#09DDDF')
      .attr('stroke-width', 2)
      .attr('fill', '#FFFFFF');
    const texts = g
      .append('text')
      .text(value => value.label)
      .attr('dx', value => value.r + width / 2)
      .attr('dy', value => value.r + height / 2)
      .attr('fill', '#09DDDF');

    d3.forceSimulation(svgData)
      .velocityDecay(0.1)
      .force('x', d3.forceX().strength(0.01))
      .force('y', d3.forceY().strength(0.01))
      .force(
        'collide',
        d3
          .forceCollide()
          .radius((d: D3SvgData) => d.r + 0.5)
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
          .attr('font-size', d => `${d.r / 5}px`);
      });
  }, [svgData]);

  return <StyledGroup ref={svgRef} />;
});
