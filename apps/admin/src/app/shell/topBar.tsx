import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { useStore } from '@mogilev-guide/admin/store';
import { observer } from 'mobx-react-lite';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: 36
  }
}));

export const TopBar = observer((props) => {
  const classes = useStyles(props);
  const { uiStore } = useStore();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={uiStore.toggleDrawer}
          edge="start"
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Mogilev Guide Admin
        </Typography>
      </Toolbar>
    </AppBar>
  );
});

TopBar.displayName = 'TopBar';
