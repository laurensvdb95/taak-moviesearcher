import React from "react";

import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  CardActions
} from "@material-ui/core";

import { slugify } from "../helpers";

export default ({ movies }) => (
  <>
    <Grid container spacing={3}>
      {movies.map(movie => (
        <Grid item xs={4} md={3} xl={2} key={movie.imdbID}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="100%"
                image={movie.Poster}
                title={movie.Title}
              />
            </CardActionArea>
            <CardActions>
              <Link to={`movie/${movie.imdbID}/${slugify(movie.Title)}`}>
                <Button variant="outlined" size="small" color="primary">
                  More info
                </Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);
