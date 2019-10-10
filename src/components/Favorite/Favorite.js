import React from 'react';
import { app } from '../../firebase';
import TripSelector from '../TripSelector';
import './Favorite.css';
import { Math } from 'core-js';

const propTypes = {
}
const defaultProps = {}

export class FavoriteComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            attraction: null
        }
    }

    componentDidMount() {
        const firebaseRows = app.firestore().collection('attractions');
        firebaseRows.onSnapshot(snapshot => {
            const attractions = snapshot.docs.reduce((accumulator, currentValue) => {
                const data = currentValue.data()
                accumulator.push(data)
                return accumulator
            }, [])
            this.setState({ attractions: attractions })
        })
    }

    random = (min, max) => {
        return Math.round(min + Math.random() * (max - min));
    }

    render() {
        const { attractions } = this.state

        return (
            <React.Fragment>
                {attractions && (
                    <TripSelector tripData={attractions.map(({ image, ...attraction }) => {
                        const id = attraction.name.split(' ').join('')

                        return {
                            ...attraction,
                            img: image,
                            likes: this.random(14, 90),
                            distance: this.random(300, 3000),
                            link: `/attraction/${id}`
                        }
                    })} />
                )}
            </React.Fragment>
        )
    }
}

FavoriteComponent.defaultProps = defaultProps
FavoriteComponent.propTypes = propTypes
FavoriteComponent.displayName = 'FavoriteComponent'
