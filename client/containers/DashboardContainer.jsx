import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Menu from '../components/Menu.jsx';
import styled, { css } from 'styled-components';
import tempLogo from '../rando-icon-transpo.png';

function DashboardContainer({ setRedirect }) {
  // hook that contains the broker address(es) and update broker address(es)
  // hook that contains the text input and update text input
  const [portInput, setPortInput] = useState('');
  // const [redirect, setRedirect] = useState(false);
  // add an onChange to input
  // add onclick/onsubmit to form?
  // post request to back end that sends broker ids
  const handleSubmit = (e) => {
    //   // prevent refresh with each letter
    e.preventDefault();
    //   // if there is a port address
    if (portInput) {
      //     // create port object from 'portInput' input

      console.log(portInput);
      // post request
      fetch('/admin/brokerAddress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          brokers: [portInput],
        }),
      })
        .then((data) => data.json())
        .then((data) => console.log(data));
    }
    setPortInput(''); // clear out the port address input or keep displaying current port?
    setRedirect(true);
  };

  // reroute to '/metrics' to display the Metrics Container with all the metrics information

  const LogoGoesBrrr = styled.div`
    display: inline-block;
    padding: 2rem 1rem;
    font-size: 1.2rem;
  `;

  return (
    <div>
      <LogoGoesBrrr>
        <img className='rotate' src={tempLogo} alt='Kafka Specks Logo' />
      </LogoGoesBrrr>
      <div>
        <label htmlFor='portInput'>Please Enter Broker Address:</label>
      </div>

      <input
        type='text'
        id='portInput'
        name='portInput'
        value={portInput}
        onChange={(e) => setPortInput(e.target.value)}
      />
      <button type='submit' onClick={handleSubmit}>
        Submit
      </button>
      <Menu />
    </div>
  );
}

export default DashboardContainer;
