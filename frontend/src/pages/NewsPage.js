import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Alert, Button } from "react-bootstrap";
import NewsPost from "../components/NewsPost";
import PermissionUtils from "./../utils/PermissionUtils";

import FontAwesome from "react-fontawesome";

import { Permissions } from "@alehuo/clubhouse-shared";

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
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_ADD_POSTS.value
            ) && (
              <Button bsStyle="success">
                <FontAwesome name="plus" /> Add an article
              </Button>
            )}
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_POSTS.value
        ) ? (
          newsPosts &&
          newsPosts.map(newsPost => (
            <NewsPost
              key={newsPost.postId}
              title={newsPost.title}
              author={newsPost.author}
              message={newsPost.message}
              date={newsPost.date.toString()}
            />
          ))
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view news</h4>
            <p>You don't have correct permissions to view news.</p>
          </Alert>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  perms: state.permission.userPerms
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);
