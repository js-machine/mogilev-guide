/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@mogilev-guide/admin/store';
import { Action } from './components/action';
import {
  makeStyles,
  Card,
  CircularProgress,
  CardContent,
  CardHeader,
  Typography,
  Avatar
} from '@material-ui/core';
import { History } from 'history';
import { Sight } from '@mogilev-guide/models';
import clsx from 'clsx';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  avatar: {
    backgroundColor: green[500],
    width: theme.spacing(2),
    height: theme.spacing(2),
    marginRight: theme.spacing(1)
  }
}));

interface Props {
  history: History;
}

export const Sights = observer((props: Props) => {
  const classes = useStyles(props);
  const { sightStore, uiStore } = useStore();

  useEffect(() => {
    sightStore.loadSights();
  }, [sightStore]);

  const handleEdit = useCallback(
    (sight: Sight) => {
      props.history.push(`/sights/${sight.id}`);
    },
    [props.history]
  );

  const actions = {
    edit: handleEdit,
    delete: sightStore.deleteSight
  };

  return uiStore.isPageLoading ? (
    <CircularProgress />
  ) : (
    <>
      {sightStore.sights.map(sight => (
        <Card key={sight.id} className={classes.root}>
          <CardHeader
            avatar={<Avatar className={clsx(classes.avatar)} />}
            action={<Action sight={sight} actions={actions} />}
            title={
              <Typography variant="h5" component="h2">
                {sight.name}
              </Typography>
            }
          />
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Address: {sight.address}
            </Typography>

            {/*<Typography*/}
            {/*  className={classes.title}*/}
            {/*  color="textSecondary"*/}
            {/*  gutterBottom*/}
            {/*>*/}
            {/*  Access time: from {sight.accessTime.from} to {sight.accessTime.to}*/}
            {/*</Typography>*/}

            {/*<Typography*/}
            {/*  className={classes.title}*/}
            {/*  color="textSecondary"*/}
            {/*  gutterBottom*/}
            {/*>*/}
            {/*  Coordinates: latitude {sight.coordinates.latitude} to{' '}*/}
            {/*  {sight.coordinates.longitude}*/}
            {/*</Typography>*/}

            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              Interest: {sight.interest.label}
            </Typography>

            {/*<Typography*/}
            {/*  className={classes.title}*/}
            {/*  color="textSecondary"*/}
            {/*  gutterBottom*/}
            {/*>*/}
            {/*  History: {sight.history}*/}
            {/*</Typography>*/}
          </CardContent>
        </Card>
      ))}
    </>
  );
});
