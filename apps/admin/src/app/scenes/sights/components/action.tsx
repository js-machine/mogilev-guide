/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useCallback, MouseEvent } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { observer } from 'mobx-react-lite';
import { Sight } from '@mogilev-guide/models';

const useStyles = makeStyles(theme => ({
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

interface Props {
  sight: Sight;
  actions: Actions;
}

export interface Actions {
  edit: (sight: Sight) => void;
  delete: (sight: Sight) => void;
}

export const Action = observer(function Action({ sight, actions }: Props) {
  const classes = useStyles({});
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl]
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const handleEdit = useCallback(() => {
    actions.edit(sight);
    handleMenuClose();
  }, [actions, sight, handleMenuClose]);

  const handleDelete = useCallback(() => {
    actions.delete(sight);
    handleMenuClose();
  }, [actions, sight, handleMenuClose]);

  return (
    <>
      <IconButton aria-label="settings" onClick={handleMenuClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleEdit}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography variant="inherit">Edit</Typography>
        </MenuItem>

        <Divider className={classes.divider} />
        <MenuItem onClick={handleDelete}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <Typography variant="inherit">Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
});
