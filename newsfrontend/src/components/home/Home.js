import React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

const Home = () => {
  return (
    <div>
      <Typography variant="h4">Welcome to News Website</Typography>

      <Typography variant="body1">
        Welcome to News, your go-to platform for accessing the latest news
        articles. We strive to provide a seamless and engaging experience for
        users who are passionate about staying informed. Our platform combines
        the power of Laravel on the backend and React on the frontend, offering
        a robust and modern solution for news enthusiasts.
      </Typography>

      <Typography variant="h5">How it Works</Typography>

      <List>
        <ListItem>
          <Typography variant="body1">
            <strong>1. Data Retrieval from NewsAPI </strong>
            <br />
            The System leverage the NewsAPI to fetch real-time news articles
            from various reliable sources across the web. The backend, powered
            by <strong>Laravel</strong>, efficiently communicates with the
            NewsAPI to ensure that you receive the most up-to-date and relevant
            information.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body1">
            <strong>2. Local MySQL Database Storage</strong>
            <br />
            To enhance performance and optimize data access, we store the
            retrieved articles in a local <strong>MySQL database</strong>. This
            not only allows for quicker retrieval but also ensures that you have
            a seamless experience navigating through the articles.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body1">
            <strong>3. Frontend with React</strong>
            <br />
            The frontend, built with <strong>React</strong>, offers a
            user-friendly interface that makes it easy for you to explore and
            read the latest news. The intuitive design and responsiveness ensure
            a smooth experience across different devices.
          </Typography>
        </ListItem>
      </List>

      <Typography variant="h4">Features</Typography>

      <List>
        <ListItem>
          <Typography variant="body1">
            <strong>Latest News:</strong> Stay informed with the most recent and
            trending news articles.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body1">
            <strong>Create an Account:</strong> Unlock a personalized experience
            by creating an account.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body1">
            <strong>Preferred Sources:</strong> Select and save your preferred
            news sources. Tailor your news feed to focus on content from the
            sources you trust.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body1">
            <strong>Preferred Article Category:</strong> Customize your news
            feed even further by selecting your preferred article categories.
            Whether you're interested in technology, politics, entertainment, or
            more, we've got you covered.
          </Typography>
        </ListItem>

        <ListItem>
          <Typography variant="body1">
            <strong>Search Functionality:</strong> Easily find articles on
            specific topics with our powerful search feature.
          </Typography>
        </ListItem>
      </List>

      <Typography variant="h5">Contact Us</Typography>

      <Typography variant="body1">
        Have questions or feedback? We'd love to hear from you!
        <br />
        <strong>aman.sultani09@gmail.com</strong>
      </Typography>
    </div>
  );
};

export default Home;
