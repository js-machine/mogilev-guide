import React, {
  useState,
  ChangeEvent,
  useCallback,
  memo,
  useEffect
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Sight } from '@mogilev-guide/models';

const useStyles = makeStyles(theme => ({
  card: {
    minWidth: 275
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
}));

interface Props {
  sight?: Sight;
  submitText?: string;
  onCreate: (sight: Sight) => void;
}

export const CreateEditSight = memo(function CreateEditSight({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sight,
  onCreate,
  submitText
}: Props) {
  const classes = useStyles({});

  const [editSight, setEditSight] = useState(sight);

  const handleTextInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, propName) => {
      setEditSight({
        ...editSight,
        [propName]: event.target.value
      });
    },
    [editSight]
  );

  useEffect(() => {
    setEditSight(sight);
  }, [sight]);

  const handleCreateClick = useCallback(() => {
    onCreate(editSight);
  }, [onCreate, editSight]);

  return (
    <Card className={classes.card}>
      {editSight && (
        <CardContent>
          <Box>
            <TextField
              label="Name"
              value={editSight.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleTextInputChange(event, 'name')
              }
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box>
            <TextField
              label="Address"
              value={editSight.address}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleTextInputChange(event, 'address')
              }
              margin="dense"
              variant="outlined"
              fullWidth
            />
          </Box>

          <Box>
            <TextField
              label="History"
              value={editSight.history}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleTextInputChange(event, 'history')
              }
              margin="dense"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </CardContent>
      )}
      <CardActions>
        <Button onClick={handleCreateClick} color="primary">
          {submitText || 'Create'}
        </Button>
      </CardActions>
    </Card>
  );
});
