import React from 'react';
import PropTypes from 'prop-types';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import MapIcon from '@material-ui/icons/Map';
import SwapCallsIcon from '@material-ui/icons/SwapCalls';
import { MapComponent } from '../Map/Map';
import { FavoriteComponent } from '../Favorite/Favorite';
import TripsComponent from '../Trips';
import './Main.css';

const propTypes = {
    location: PropTypes.object,
}
const defaultProps = {}

export class MainComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            navigationTab: 'MAP'
        }
    }

    handelNavigationTabChange = (event, newValue) => {
        this.setState({ navigationTab: newValue });
    }

    render() {
        const { location } = this.props
        const { navigationTab } = this.state

        return (
            <div className="main">
                <div className="navigation-tabs">
                    <BottomNavigation
                        value={navigationTab}
                        onChange={this.handelNavigationTabChange}
                    >
                        <BottomNavigationAction value="FAVORITE" icon={<BookmarksIcon />} />
                        <BottomNavigationAction value="MAP" icon={<MapIcon />} />
                        <BottomNavigationAction value="ROUTER" icon={<SwapCallsIcon />} />
                    </BottomNavigation >
                </div>
                <div className={navigationTab === 'MAP' ? 'map-container' : ''}>
                    {navigationTab === 'MAP' && (
                        <MapComponent tags={location.state && location.state.tags && location.state.tags.length > 0 ? location.state.tags : undefined} />
                    )}
                    {navigationTab === 'FAVORITE' && (
                        <FavoriteComponent />
                    )}
                    {navigationTab === 'ROUTER' && (
                        <TripsComponent />
                    )}
                </div>
            </div >
        )
    }
}

MainComponent.defaultProps = defaultProps
MainComponent.propTypes = propTypes
MainComponent.displayName = 'MainComponent'
