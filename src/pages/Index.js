import React, { Component } from 'react';
import styled from 'styled-components';

import Button from '../components/Button';

const SCWrap = styled.div`
  width: 100%;
  height: 100vh;
  background: #f5f6f9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 38px;
    margin-bottom: 40px;
  }
`;

export default class extends Component {
  render() {
    return (
      <SCWrap>
        <h1>Welcome Kalista.</h1>
        <Button
          width={200}
          onClick={() => { this.props.history.push('/about') }}
        >
          About
        </Button>
      </SCWrap>
    )
  }
}