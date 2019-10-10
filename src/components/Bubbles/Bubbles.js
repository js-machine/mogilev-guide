import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import './Bubbles.css';

const propTypes = {}
const defaultProps = {}

export class BubblesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {},
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {
        const data = this.props.tags.map((d) => ({
            label: d.label,
            value: d.label.length * 2,
            color: d.state ? 'lightgreen' : 'lightblue'
        }));

        if (JSON.stringify(this.state.data) !== JSON.stringify(data)) {
            this.setState({ data: data });
        }
    }

    bubbleClick = (label) => {
        let data = this.state.data;
        data.map((d) => {
            if (d.label === label) {
                d.color = d.color === 'lightgreen' ? 'lightblue' : 'lightgreen';
            }
            return (d);
        })
        this.props.tagStateCallback(label);
        this.setState({ data: data });
    }

    render() {
        return (

            <BubbleChart
                graph={{
                    zoom: 1,
                    offsetX: -0.05,
                    offsetY: -0.01,
                }}
                width={window.screen.height*0.5}
                height={window.screen.height*0.5}
                padding={0} // optional value, number that set the padding between bubbles
                showLegend={false} // optional value, pass false to disable the legend.
                labelFont={{
                    family: 'Arial',
                    size: 11,
                    color: '#fff',
                    weight: 'regular'
                }}
                bubbleClickFun={this.bubbleClick}
                overflow={true}
                data={this.state.data}
            />

        )
    }
}

BubblesComponent.defaultProps = defaultProps
BubblesComponent.propTypes = propTypes
BubblesComponent.displayName = 'BubblesComponent'
