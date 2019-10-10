import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { app } from '../../firebase';
import './Attraction.css';

const propTypes = {
    match: PropTypes.object,
}
const defaultProps = {}

export class AttractionComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attraction: null
        }
    }

    componentDidMount() {
        const { match } = this.props
        const attractionName = match.params.name
        const firebaseRows = app.firestore().collection('attractions');

        firebaseRows.onSnapshot(snapshot => {
            const attraction = snapshot.docs.find(value => {
                const data = value.data()
                const id = data.name.split(' ').join('')
                return id === attractionName
            })
            this.setState({ attraction: attraction.data() })
        })
    }

    render() {
        const { attraction } = this.state

        return (
            <React.Fragment>
                {attraction ? (
                    <div className="container">
                        <img className="image" src={attraction.image} alt={attraction.name} />
                        <h2>
                            {attraction.name}
                        </h2>
                        <div>
                            {attraction.description}
                        </div>
                    </div>
                ) : (
                        <CircularProgress className="spinier" />
                    )}
            </React.Fragment>
        )
    }
}

AttractionComponent.defaultProps = defaultProps
AttractionComponent.propTypes = propTypes
AttractionComponent.displayName = 'AttractionComponent'
