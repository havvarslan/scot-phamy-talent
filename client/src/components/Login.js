import React, { Component } from "react";
import { Button, Form, Grid, Header, List } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { signApi } from "../api/auth";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePassChange = event => {
    this.setState({ password: event.target.value });
  };

  singIn = () => {
    signApi(this.state.email, this.state.password)
      .then(data => {
        const token = data.token;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(data.user));
        document.location.reload(); //refresh the page for token
      })
      .catch(err => {
        this.setState({ error: true });
      });
  };

  render() {
    const token = localStorage.getItem("token");
    if (token) {
      return <div>You are Log in. WELCOME!</div>;
    } else
      return (
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="blue" textAlign="center">
              Login to your account
            </Header>
            <Form onSubmit={this.handleSubmit} size="large">
              <p align="left">Email</p>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />

              <p align="left">Password</p>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={this.state.password}
                onSubmit={this.handleSubmit}
                onChange={this.handlePassChange}
              />

              <Button
                onClick={this.singIn}
                value={this.state.error}
                color="blue"
                fluid
                size="large"
              >
                Login
              </Button>
              {this.state.error ? <div>Wrong Info. Try Again</div> : null}
            </Form>
            <List divided horizontal>
              <List.Item as="a">
                <List.Content as={Link} to="/create-account">
                  Create an Account?
                </List.Content>
                <List.Content as={Link} to="/reset-password">
                  Forgot your password?
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      );
  }
}
