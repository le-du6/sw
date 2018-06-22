import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

const Bouton = props => {
  console.log(props);
  const { btn, inc, dec, reset, ...rest } = props;
  const btnS = btn ? "btn" : "";
  const incS = inc ? "inc" : "";
  const decS = dec ? "dec" : "";
  const resetS = reset ? "reset" : "";
  let style = `${btnS} ${incS} ${decS} ${resetS}`;
  style = style
    .trim()
    .split(" ")
    .filter(x => x !== "")
    .join(" ");
  console.log(style);
  return (
    <a {...rest} className={style}>
      {props.children}
    </a>
  );
};

class App extends React.Component {
  componentDidMount = () => {
    fetch("https://swapi.co/api/people/" + this.state.count)
      .then(x => x.json())
      .then(d =>
        this.setState({ people: d.name }, _ =>
          this.setState({ spinner: false })
        )
      );
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.count !== this.state.count) {
      fetch("https://swapi.co/api/people/" + this.state.count)
        .then(x => x.json())
        .then(d =>
          this.setState({ people: d.name }, _ =>
            this.setState({ spinner: false })
          )
        );
    }
  };
  state = {
    count: 1,
    people: "",
    spinner: false
  };
  inc = () =>
    this.setState(({ count }) => ({ count: count + 1, spinner: true }));
  dec = () =>
    this.setState(({ count }) => ({ count: count - 1, spinner: true }));
  reset = () => this.setState({ count: 0, spinner: true });
  test = o => ({ ...o });
  render() {
    const obj = {
      onClick: this.dec
    };
    return (
      <div className="App">
        <Bouton btn dec {...obj}>
          Minus One
        </Bouton>
        <Bouton btn reset onClick={this.reset}>
          Reset
        </Bouton>
        <Bouton btn dec onClick={this.inc}>
          Plus One
        </Bouton>

        {this.state.spinner ? (
          <div className="block lds-ring">
            <div />
            <div />
            <div />
            <div />
          </div>
        ) : (
          <h1>{this.state.people}</h1>
        )}

        <h1>{this.state.count}</h1>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
