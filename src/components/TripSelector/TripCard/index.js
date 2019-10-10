import React from 'react';

import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";

import { app } from '../../../firebase'
import './style.css'

class TripCard extends React.Component {
  componentDidMount() {
    const firebaseRows = app.firestore().collection('test');
    firebaseRows.onSnapshot(snapshot => {
      snapshot.docs.forEach(d => console.log('TTT', d.data()))
    })
  }

  render() {
    return (
      <Card className="card">
        <div style={{ backgroundImage: `url(${this.props.img})` }} className="trip-icon">
          {this.props.time && !this.props.img ? <p className="time">{this.props.time}h</p> : <div></div>}
        </div>
        <div style={{ padding: '10px' }}>
          <Typography>
            {this.props.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {this.props.distance}m from you {this.props.places ? `${this.props.places} places` : ``} ❤️ {this.props.likes}
          </Typography>
        </div>
        <div style={{ flexGrow: 1 }}></div>
        <div style={{ height: '100%', width: '50px', fontSize: 20 }}>
          <Link className="link" {...(this.props.link ? { to: this.props.link } : {})}>
            <p style={{ textAlign: 'center', lineHeight: '33px', color: '#45B8F3' }}>></p>
          </Link>
        </div>
      </Card >
    )
  }
}

export default TripCard;
