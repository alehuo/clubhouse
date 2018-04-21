import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron, Button } from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import NewsPost from "../components/NewsPost";

const newsPosts = [
  {
    postId: 1,
    author: { id: 1, name: "user1" },
    title: "Welcome to our site",
    message: "Welcome to the new clubhouse management website.",
    date: new Date(2018, 1, 1, 12, 55)
  }
];

export class NewsPage extends Component {
  static propTypes = {
    prop: PropTypes
  };

  render() {
    return (
      <React.Fragment>
        <Jumbotron>
          <h1>News</h1>
          <p>See what's going on at the clubhouse.</p>
          <p>
            <Button bsStyle="success">
              <FontAwesome name="plus" /> Add an article
            </Button>
          </p>
          {newsPosts &&
            newsPosts.map(newsPost => (
              <NewsPost
                title={newsPost.title}
                author={newsPost.author}
                message={newsPost.message}
                date={newsPost.date.toString()}
              />
            ))}
        </Jumbotron>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
