import React from 'react';
import { app } from '../../firebase';
import TripPreview from '../TripPreview';
import { Math } from 'core-js';

const propTypes = {
}
const defaultProps = {}

class TripComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attraction: null
        }
    }

    componentDidMount() {
        const firebaseRows = app.firestore().collection('trips');
        firebaseRows.onSnapshot(snapshot => {
            const trips = snapshot.docs.reduce((accumulator, currentValue) => {
                const data = currentValue.data()
                accumulator.push(data)
                return accumulator
            }, [])
            this.setState({ trips: trips })
        })
    }

    random = (min, max) => {
        return Math.round(min + Math.random() * (max - min));
    }

    render() {
        const { trips } = this.state

        return (
            <React.Fragment>
                {trips && (
                    <TripPreview tripData={trips.map(({ image, ...attraction }) => {

                        return {
                            ...trips,
                            likes: this.random(14, 90),
                            distance: this.random(300, 3000),
                        }
                    })} />
                )}
            </React.Fragment>
        )
    }
}

TripComponent.defaultProps = defaultProps
TripComponent.propTypes = propTypes
TripComponent.displayName = 'FavoriteComponent'

export default TripComponent
