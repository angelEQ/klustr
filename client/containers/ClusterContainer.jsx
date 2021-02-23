import React, { useState, useEffect } from 'react';
import BrokerTable from '../components/Broker.jsx';
import BrokerBox from '../components/BrokerBox.jsx';
import TopicBox from '../components/TopicBox.jsx';
import ConsumersBox from '../components/ConsumersBox.jsx';
import styled, { css } from 'styled-components';
import { Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import {
  red,
  pink,
  purple,
  grey,
  indigo,
  deepPurple,
  blue,
} from '@material-ui/core/colors/';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Button from '@material-ui/core/Button';
import TopicsTable from '../components/TopicsTable.jsx';
import ConsumersTable from '../components/ConsumersTable.jsx';

const useStyles = makeStyles({
  root: {
    backgroundColor: '#f5f5f5',
    marginBottom: 50,
  },
  rootred: {
    width: 400,
    maxWidth: 350,
    height: 250,
    backgroundColor: red[300],
    opacity: 80,
    marginBottom: 50,
  },
  rootpink: {
    width: 400,
    maxWidth: 350,
    height: 250,
    backgroundColor: pink[300],
    marginBottom: 50,
  },
  rootpurple: {
    width: 400,
    maxWidth: 350,
    height: 250,
    backgroundColor: purple[300],
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
  },
  cluster: {
    fontSize: 40,
  },
  body2: {
    fontSize: 50,
  },
});

function ClusterContainer({}) {
  // hooks
  // Cluster ID (string) ** Needs to be verified by Team 2 (need to be grabbed from describe cluster)
  // Brokers Info (Array of Objects)
  // Topics (Array of Strings)
  // Partitions (Array of Objects) ** May not be needed?
  // Offsets (Array of Objects)
  // Consumer Group (Array of Objects)
  // In object: Consumer ID
  const [clusterId, setClusterId] = useState('');
  const [brokers, setBrokers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [consumers, setConsumers] = useState([]);
  const [selectedTable, setSelectedTable] = useState([]);

  // Fetch - GET all metrics for Metrics Container upon putting in a Port Address in Dashboard Container

  const fetchTopics = () => {
    fetch('/admin/topics', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setTopics((topics) => {
          data = data.filter((topic) => topic !== '__consumer_offsets');
          topics = data;
          return topics;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBrokerInfo = () => {
    fetch('/admin/brokerInfo', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // object
      .then((data) => {
        setBrokers((brokers) => {
          brokers = data.brokers;
          return brokers;
        }); //brokers property, returns  [ { nodeId: 0, host: 'Cerebro', port: 9092 } ]
        setClusterId((clusterId) => {
          clusterId = data.clusterId;
          return clusterId;
        }); //clusterID property, returns '1_le6xdKSCuBQUa6duOmcg'
      })
      .catch((err) => console.log(err));
  };

  const fetchConsumerGroups = () => {
    fetch('/admin/consumerGroups', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setConsumers(data);
      }) // array of objects (consumers) [{'groupId': 'test-group' }]
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTopics();
    fetchBrokerInfo();
    fetchConsumerGroups();
  }, []);

  const classes = useStyles();

  // let selectedTable;

  const clusterParts = {
    titles: ['BROKERS', 'TOPICS', 'CONSUMER GROUPS'],
    data: [brokers, topics, consumers],
    style: [classes.rootred, classes.rootpink, classes.rootpurple],
    tables: [
      [<BrokerTable brokers={brokers} />],
      [<TopicsTable topics={topics} />],
      [<ConsumersTable consumers={consumers} />],
    ],
  };

  const clusterCards = [];

  for (let i = 0; i < clusterParts.titles.length; i++) {
    console.log('titles', clusterParts.titles[i]);
    clusterCards.push(
      <Grid xs={12} sm={3}>
        <Card className={clusterParts.style[i]}>
          <CardContent>
            <Typography className={classes.title} align='center'>
              {clusterParts.titles[i]}
            </Typography>
            <br></br>
            <br></br>
            <Typography className={classes.body2} align='center'>
              {clusterParts.data[i].length}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              aria-label='listdetails'
              onClick={() => {
                console.log('clicked', clusterParts.titles[i]);
                setSelectedTable(clusterParts.tables[i]);
                console.log('selected table', selectedTable);
              }}
            >
              <FormatListBulletedIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
    );
  }

  return (
    <>
      <Card className={classes.root} elevation={0}>
        <CardContent>
          <Typography className={classes.cluster} align='center'>
            <span id='connected'>CONNECTED TO KAFKA CLUSTER: </span>
            <br></br> <strong>{clusterId}</strong>
          </Typography>
        </CardContent>
      </Card>
      <Grid container justify='center' spacing={4}>
        {clusterCards}
      </Grid>
      {selectedTable}
      {/* <BrokerTable brokers={brokers} />
      <TopicsTable topics={topics} />
      <ConsumersTable consumers={consumers} /> */}
      {/* <BrokerBox clusterId={clusterId} brokers={brokers} /> */}
      {/* <TopicBox topics={topics} /> */}
      {/* <ConsumersBox consumers={consumers} /> */}
    </>
  );
}

export default ClusterContainer;
