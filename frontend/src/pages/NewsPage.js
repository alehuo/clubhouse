import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, PageHeader } from "react-bootstrap";
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
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          News
          <p>
            <Button bsStyle="success">
              <FontAwesome name="plus" /> Add an article
            </Button>
          </p>
        </PageHeader>
        {newsPosts &&
          newsPosts.map(newsPost => (
            <NewsPost
              key={newsPost.postId}
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
