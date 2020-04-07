import React, { Component } from "react";
import axios from "axios";

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

class Login extends Component {
  state = {
    newLogin: {
      username: "",
      password: "",
    },
  };

  infoChange = (e) => {
    this.setState({
      newLogin: {
        ...this.state.newLogin,
        [e.target.name]: e.target.value,
      },
    });
  };

  login = (e) => {
    e.preventDefault();

    //post Request when submitting a login
    axios
      .post("http://localhost:5000/api/login", this.state.newLogin)
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", res.data.payload);

        this.props.history.push("/protected");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  render() {
    return (
      <div>
        <h1>Welcome to the Bubble App!</h1>
        <form onSubmit={this.login}>
          <input
            className="form-style"
            type="text"
            name="username"
            value={this.state.newLogin.username}
            onChange={this.infoChange}
            placeholder="username"
          />
          <input
            className="form-style"
            type="password"
            name="password"
            value={this.state.newLogin.password}
            onChange={this.infoChange}
            placeholder="Password"
          />
          <button className="button">Log in</button>
        </form>
      </div>
    );
  }
}

export default Login;
