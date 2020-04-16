import React from "react";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";

import Error from "./error";

export default class props extends React.Component {
  state = {
    searchStr: {
      value: "",
      error: false
    }
  };
  handleField = e => {
    this.setState({
      searchStr: {
        ...this.state.searchStr,
        value: e.target.value,
        error: false
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.searchStr.value === "") {
      this.setState({
        searchStr: {
          ...this.state.searchStr,
          error: true
        }
      });
    } else {
      this.setState({
        searchStr: {
          ...this.state.searchStr,
          error: false
        }
      });
      this.props.getMovies(this.state.searchStr.value);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <TextField
          id="standard-basic"
          label="Enter movie title"
          onChange={this.handleField}
          value={this.state.searchStr.value}
          className="textField"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MovieFilterIcon color="primary" />
              </InputAdornment>
            )
          }}
        />
        <div className="searchButton">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </div>
        {this.state.searchStr.error && <Error />}
      </form>
    );
  }
}
