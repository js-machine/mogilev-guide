import { createMuiTheme, Theme } from '@material-ui/core/styles';

const _theme = createMuiTheme();

export const theme: Theme = {
  ..._theme,
  mixins: {
    ..._theme.mixins
  },
  overrides: {}
};

theme.palette.primary.main = '#09DDDF';
