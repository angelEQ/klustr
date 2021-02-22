import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import DashboardContainer from './containers/DashboardContainer.jsx';
import ClusterContainer from './containers/ClusterContainer.jsx';
import MetricsContainer from './containers/MetricsContainer.jsx';
import Welcome from './components/Welcome.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import styled, { css } from 'styled-components';
import ClusterNodeContainer from './components/ClusterNodeContainer.jsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from './components/Drawer.jsx';

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  content: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function App() {
  const [redirect, setRedirect] = useState(false);

  let display;

  if (!redirect) {
    display = (
      <Route exact path='/'>
        <Welcome setRedirect={setRedirect} />
      </Route>
    );
  } else {
    display = (
      <Route exact path='/'>
        <ClusterContainer setRedirect={setRedirect} />
      </Route>
    );
  }

  // setOnMetricsPage={setOnMetricsPage}
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.drawer}>
        {/* // <StyledMain>
    //   <StyledDashboard> */}
        <Drawer />
        {/* // </StyledDashboard>
      <StyledPage> */}
      </div>
      <div className={classes.content}>
        <Switch>
          {display}
          <Route path='/cluster'>
            <ClusterContainer setRedirect={setRedirect} />
          </Route>
          <Route path='/metrics'>
            <MetricsContainer setRedirect={setRedirect} />
          </Route>
          <Route path='/brokerView'>
            <ClusterNodeContainer setRedirect={setRedirect} />
          </Route>
          {/* <Route path='/about' component={About} /> */}
          <Route component={ErrorPage} />
        </Switch>
        {/* </StyledPage>
    </StyledMain> */}
      </div>
    </div>
  );
}

// const StyledMain = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `;

// const StyledDashboard = styled.div`
//   width: 20%;
// `;

// const StyledPage = styled.div`
//   width: 80%;
// `;

export default App;
