import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const gradientColor = {
  primary: {
    backgroundImage: 'linear-gradient(-135deg, #6987F0 0%, #4B6BE5 100%)',
    boxShadow: '0 2PX 6PX 0 rgba(98,109,214,0.49)',
    ghostBorder: '1PX solid #4B6BE5',
    ghostColor: '#4B6BE5',
  },
  danger: {
    backgroundImage: 'linear-gradient(-135deg, #FF6F3D 0%, #FF554A 100%)',
    boxShadow: '0 2PX 6PX 0 rgba(214,98,98,0.49)',
    ghostBorder: '1PX solid #FF554A',
    ghostColor: '#FF554A',
  },
  black: {
    backgroundImage: 'linear-gradient(-135deg, #000000, #1C1C1C)',
    boxShadow: '0 2PX 6PX 0 rgba(214,98,98,0.49)',
    ghostBorder: '1PX solid #000000',
    ghostColor: '#000000',
  },
};

const SCButton = styled.div`
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    background: ${props => props.disabled ? '#dddddd' : props.ghost ? 'transparent' : gradientColor[props.type].backgroundImage};
    box-shadow: ${props => props.disabled || props.ghost ? 'none' : gradientColor[props.type].boxShadow};
    border-radius: 4px;
    font-size: 32px;
`;

const Button = ({disabled, children, onClick, type, ghost, width, height, style, ...params}) => {
  return (
    <SCButton
      {...params}
      type={type}
      ghost={ghost}
      disabled={disabled}
      onClick={disabled ? void 0 : onClick}
      style={{
        ...style,
        color: ghost ? gradientColor[type].ghostColor : '#ffffff',
        border: ghost ? gradientColor[type].ghostBorder : 'none',
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {children}
    </SCButton>
  );
};

Button.propTypes = {
  disable: PropTypes.bool,
  ghost: PropTypes.bool,
  type: PropTypes.oneOf([
    'primary',
    'danger',
    'black'
  ]),
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

Button.defaultProps = {
  disabled: false,
  ghost: false,
  type: 'primary',
  style: {},
};

export default Button;
