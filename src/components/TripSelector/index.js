import React from 'react';
import PropTypes from 'prop-types';

import Fab from '@material-ui/core/Fab';
import GridList from '@material-ui/core/GridList';
import Link from '@material-ui/core/Link';

import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

import TripCard from './TripCard';

import { app } from '../../firebase'
import './index.css'


const propTypes = {
	tripData: PropTypes.arrayOf(PropTypes.object)
}
const defaultProps = {}

export class TripSelector extends React.Component {

	componentDidMount() {
		const firebaseRows = app.firestore().collection('test');
		firebaseRows.onSnapshot(snapshot => {
			snapshot.docs.forEach(d => console.log('TTT', d.data()))
		})
	}

	render() {
		return (
			<div className="root">
				<div>
					<div>
						<ListSubheader component="div" className="list-header">
							<Link to='/'>
								<Fab color="primary" className="menu-button">
									<MenuIcon />
								</Fab>
							</Link>
							<p>{this.props.tripData.length} places total</p>
							<Fab color="primary" className="menu-button">
								<SearchIcon />
							</Fab>
						</ListSubheader>
					</div>
					<GridList cellHeight={90} spacing={4} cols={1} className="grid-list">
						{this.props.tripData.map(trip => (
							<GridListTile>
								<TripCard {...trip} />
							</GridListTile>
						))}
					</GridList>
				</div>
			</div>
		)
	}
}

TripSelector.defaultProps = defaultProps
TripSelector.propTypes = propTypes
TripSelector.displayName = 'TripSelectorComponent'

export default TripSelector;
