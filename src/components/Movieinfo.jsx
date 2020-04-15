import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";

import Loading from "./Loading";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        data: {},
        loading: false,
        error: false
      }
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      movie: {
        ...this.state.movie,
        loading: true,
        error: false
      }
    });
    axios
      .get(
        process.env.REACT_APP_ENDPOINTMOVIES + "&plot=full&i=" +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          ...this.state,
          movie: {
            data: { ...response.data },
            loading: false,
            error: false
          }
        });
      })
      .catch(error => console.log(error));
  }
  render() {
    return (
      <>
        <Link to="/">
          <ArrowBackIcon color="primary" className="arrowBack" />
        </Link>
        {this.state.movie.loading && <Loading />}
        {Object.keys(this.state.movie.data).length > 1 && (
          <>
            <div className="movieDetail">
              <img
                src={this.state.movie.data.Poster}
                alt={this.state.movie.data.Title}
              />
              <div className="moviePlot">
                <h1>{this.state.movie.data.Title}</h1>
                <div>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography>Story</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>{this.state.movie.data.Plot}</Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography>Actors</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>{this.state.movie.data.Actors}</Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel>
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography>More Info</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className="panel">
                      <Typography>
                        <strong>Released:</strong>{" "}
                        {this.state.movie.data.Released}
                      </Typography>
                      <Typography>
                        <strong>Rating:</strong>{" "}
                        {this.state.movie.data.imdbRating}
                      </Typography>
                      <Typography>
                        <strong>Genre:</strong> {this.state.movie.data.Genre}
                      </Typography>
                      <Typography>
                        <strong>Runtime:</strong>{" "}
                        {this.state.movie.data.Runtime}
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}
