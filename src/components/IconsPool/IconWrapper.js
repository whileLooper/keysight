import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import "antd/dist/antd.css"

const IconDiv = styled.div`

`;

const renderIcon = (iconType, key) => {
  return !iconType ? null :(
    <IconDiv>
      <Icon type={iconType} />
      {iconType}
    </IconDiv>
  );
}

export default renderIcon;