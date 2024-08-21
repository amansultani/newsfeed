import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import noImage from "../../images/noImage.png";

export default function ArticleDetail({ article }) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Card>
      <CardMedia
        sx={{ height: 400 }}
        image={article.url_to_image  || noImage}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          {article.published_at}
        </Typography>
        <Typography variant="subtitle1" color="text.primary">
          Author: {article.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.content}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Source: {article.source}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleGoBack}>
          Go Back
        </Button>
        <Button
          size="small"
          onClick={() => {
            window.open(article.url, "_blank");
          }}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
