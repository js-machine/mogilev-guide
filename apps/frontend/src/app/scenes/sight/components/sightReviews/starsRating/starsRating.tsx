import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

interface Props {
  value: number;
}

const useStyles = makeStyles({
  root: {
    display: 'flex'
  },
  iconFilled: {
    color: '#09DDDF'
  }
});

export const StarsRating: React.FC<Props> = ({ value }) => {
  const classes = useStyles({});
  return (
    <Rating
      value={value}
      precision={0.5}
      readOnly={true}
      size={'small'}
      classes={classes}
    />
  );
};
StarsRating.displayName = 'StarsRating';
