import React , { useState } from "react";
import { createRoot } from 'react-dom/client';
class ChildComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            counter: 0
        }
    }

    returnCounter = () => {
        return this.state.counter;
    }

    increment = (event) => {
        event.stopPropagation();
        this.setState(prevState => {
            return {
                counter: prevState.counter + 1
            }
        })
    }

    render() {
        return (
            <div onClick={this.increment}>
                Child Value - {this.state.counter} - Click to increment
            </div>
        )
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0
    }
  }

  returnCounter = () => {
    return this.state.counter;
  }

  increment = () => {
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      }
    })
  }

  render() {
    return (
      <div onClick={this.increment}>
        <div>Parent Value - {this.state.counter} - Click to increment</div>
        <ChildComponent ref={(childComponent) => {window.childComponent = childComponent}}/>
      </div>
    )
  }
}

const root = createRoot(document.getElementById('app'));
root.render(<Page ref={(ourComponent) => {window.ourComponent = ourComponent}} />, document.getElementById("app"));

const parentBtn = document.getElementById("parentButton");
parentBtn.addEventListener("click", event => {
  alert(window.ourComponent.returnCounter());
});

const childBtn = document.getElementById("childButton");
childBtn.addEventListener("click", event => {
  alert(window.childComponent.returnCounter());
});
