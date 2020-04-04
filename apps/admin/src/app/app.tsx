import React, { memo } from 'react';
import { Route, Redirect, Switch } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Shell } from '@mogilev-guide/admin/shell';
import { Sights } from '@mogilev-guide/admin/scenes/sights';
import { Users } from '@mogilev-guide/admin/scenes/users';
import { NewSight } from '@mogilev-guide/admin/scenes/new-sight';
import { EditSight } from '@mogilev-guide/admin/scenes/edit-sight';
import 'mobx-react-lite/optimizeForReactDom';

const theme = createMuiTheme();

export const App = memo(function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Shell>
          <Switch>
            <Route exact path="/" render={() => <Redirect to={'/sights'} />} />
            <Route exact path="/sights" component={Sights} />
            <Route exact path="/sights/:sightId" component={EditSight} />
            <Route exact path="/new-sight" component={NewSight} />
            <Route exact path="/users" component={Users} />
            <Redirect to={'/'} />
          </Switch>
        </Shell>
      </Router>
    </ThemeProvider>
  );
});
