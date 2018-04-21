import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Jumbotron, Button, PageHeader } from "react-bootstrap";
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
        <PageHeader>
          <h1>News</h1>
          <p>
            <Button bsStyle="success">
              <FontAwesome name="plus" /> Add an article
            </Button>
          </p>
        </PageHeader>
        {newsPosts &&
          newsPosts.map(newsPost => (
            <NewsPost
              title={newsPost.title}
              author={newsPost.author}
              message={newsPost.message}
              date={newsPost.date.toString()}
            />
          ))}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewsPage);
