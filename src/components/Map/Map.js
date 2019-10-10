import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Link } from "react-router-dom";
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from 'react-yandex-maps';
import './Map.css';
import { app } from '../../firebase';
import { Math } from 'core-js';

const propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
}
const defaultProps = {
    tags: ['museums', 'theatres', 'churches', 'events', 'cafes', 'restaurants', 'monuments', 'cinemas']
}

export class MapComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            attractions: [],
            isShowMe: false,
            coords: {
                latitude: 53.894948,
                longitude: 30.330837,
            },
        }
    }

    componentDidMount() {
        const { tags } = this.props
        const firebaseRows = app.firestore().collection('attractions');
        firebaseRows.onSnapshot(snapshot => {
            const attractions = snapshot.docs.reduce((accumulator, currentValue) => {
                const data = currentValue.data()
                console.log('WWW', data.tags)
                if (data.tags && data.tags.find(tag => tags.find(t => t === tag))) {
                    accumulator.push(data)
                }
                return accumulator
            }, [])
            this.setState({ attractions: attractions }, this.getGeoLocation)
        })
    }

    getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords }) => this.setState({ coords: coords, isShowMe: true }))
    }

    calculateTime = (coords) => {
        const { coords: userCoords } = this.state
        const lat = Math.abs(userCoords.latitude - coords.latitude)
        const long = Math.abs(userCoords.longitude - coords.longitude)
        const time = Math.round(Math.sqrt((lat * lat) + (long * long)) * 1000)

        if (time < 60) {
            return `~${time}m`
        }
        const hours = Math.round(time / 60)
        const minutes = time % 60
        return `~${hours}h ${minutes}m`
    }

    render() {
        const { attractions } = this.state

        return (
            <React.Fragment>
                <Link to='/'>
                    <Fab className="filter" color="primary">
                        <FilterListIcon />
                    </Fab>
                </Link>
                <YMaps query={({
                    lang: 'en_RU',
                    load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
                })}>
                    <Map
                        className='map'
                        controls={['zoomControl', 'fullscreenControl']}
                        options={{ yandexMapDisablePoiInteractivity: true, suppressMapOpenBlock: true }}
                        state={{ center: [53.894948, 30.330837], zoom: 16 }}
                    >
                        {attractions.map(attraction => {
                            const id = attraction.name.split(' ').join('')

                            return (
                                <Placemark
                                    key={id}
                                    geometry={[attraction.geo.latitude, attraction.geo.longitude]}
                                    options={({
                                        preset: 'islands#circleIcon',
                                        interactivityModel: 'default#opaque',
                                    })}
                                    properties={({
                                        balloonContentHeader: `<span> ${attraction.name}</span> `,
                                        balloonContentBody: `<i>${this.calculateTime({ latitude: attraction.geo.latitude, longitude: attraction.geo.longitude })}</i>`,
                                        balloonContentFooter: `<a class="attraction-link" href="/attraction/${id}"> More details </a> `
                                    })}
                                />
                            )
                        })}
                        <ZoomControl options={{ float: 'right' }} />
                        <GeolocationControl options={{ float: 'left' }} />
                    </Map>
                </YMaps>

            </React.Fragment >
        )
    }
}

MapComponent.defaultProps = defaultProps
MapComponent.propTypes = propTypes
MapComponent.displayName = 'MapComponent'
