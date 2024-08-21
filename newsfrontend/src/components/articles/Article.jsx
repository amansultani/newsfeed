import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import noImage from "../../images/noImage.png";

export default function Article(props) {
  const { categoryId } = useParams();
  return (
    <Grid item xs={12} md={6}>
      <Link
        to={`/categories/${categoryId}/news/${props.article.id}`}
        style={{ textDecoration: "none" }}
      >
        <Card sx={{ maxWidth: 560 }}>
          <CardMedia
            sx={{ height: 220 }}
            image={props.article.url_to_image || noImage}
            title={props.article.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.article.title}
            </Typography>
            <Typography variant="subtitle1" color="text.primary">
              {props.article.published_at}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.article.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>Learn More</Button>
          </CardActions>
        </Card>
      </Link>
    </Grid>
  );
}
