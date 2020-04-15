import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import { Typography, AppBar, Toolbar } from "@material-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Form from "./components/Form";
import Results from "./components/Results";
import Loading from "./components/Loading";
import Movie from "./components/Movieinfo";

export default class App extends Component {
  state = {
    movies: {
      loading: false,
      error: false,
      data: []
    }
  };

  getMovies = str => {
    this.setState({
      movies: {
        ...this.state.movies,
        loading: true
      }
    });
    axios
      .get(process.env.REACT_APP_ENDPOINTMOVIES + "&s=" + str)
      .then(results => {
        this.setState({
          movies: {
            ...this.state.movies,
            data: [...results.data.Search],
            loading: false
          }
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  //OUTPUT
  render() {
    return (
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4">Find your favourite movie</Typography>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <Form getMovies={this.getMovies} />
                {this.state.movies.loading && <Loading />}
                {this.state.movies.data.length !== 0 && (
                  <Results movies={this.state.movies.data} />
                )}
              </>
            )}
          />
          <Route
            path="/movie/:id/:title"
            render={props => <Movie {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}
