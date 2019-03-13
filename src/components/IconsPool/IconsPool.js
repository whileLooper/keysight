import React, { Component } from "react";
import { Button, Col, Row, Input, InputNumber } from "antd";
import styled from "styled-components";
import iconsList from "./icons";
import "antd/dist/antd.css";

const PoolWrapper = styled.div`
  margin-top: 20px;
  border: 1px solid #b3efeb;
  padding: 10px;
`;

const Workspace = styled(PoolWrapper)`
  height: 300px;
`;

const WorkSpaceLine = styled.div`
  margin: 15% 2%;
  display: flex;
  justify-content: space-evenly;
`;


export default class IconsPool extends Component {
  state = {
    draggingFunction: ""
  };

  renderIconsComponent = Object.keys(iconsList).map((type, key) => {
    return (
      <Button
        key={`${type}-${key}`}
        style={{ marginLeft: "3px" }}
        draggable
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e, type) => this.onDrop(e, type)}
        onDragStart={(e) => this.onDragStart(e, type)}
      >
        {type}
      </Button>
    );
  });

  renderWorkspace = () => {
    const { draggingFunction } = this.state;
    const argLength = iconsList[draggingFunction]
      ? iconsList[draggingFunction].length
      : 0;

    const inputBoxes = [];
    for (let i = 0; i < argLength; i++) {
      inputBoxes.push(
        <Col span={4} key={`inputbox_${i}`}>
          <Input />
        </Col>
      )
    }
    console.log(inputBoxes);
    return (
      <WorkSpaceLine>
        <Col span={2}>
          {argLength <= 0 ? null : <Button>{draggingFunction}</Button>}
        </Col>
        {inputBoxes}
      </WorkSpaceLine>
    )
  };

  onDragStart = (ev, id) => {
    this.setState({
      draggingFunction: id
    });
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (e, type) => {
    let id = e.dataTransfer.getData("id");

    this.setState({
      draggingFunction: id,
      ...this.state
    });
  };

  render() {
    // const { draggingFunction } = this.state;

    return (
      <div>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={18}>
            <Workspace
              onDragOver={(e, type) => this.onDragOver(e, type)}
              onDrop={(e) => this.onDrop(e)}
            >
              {this.renderWorkspace()}
            </Workspace>
          </Col>
        </Row>
        <Row type="flex" justify="space-around" align="middle">
          <Col span={18}>
            <PoolWrapper>{this.renderIconsComponent}</PoolWrapper>
          </Col>
        </Row>
      </div>
    );
  }
}
