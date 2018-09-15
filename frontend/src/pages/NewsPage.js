import React, { Component } from "react";
import { connect } from "react-redux";
import { PageHeader, Alert, Button } from "react-bootstrap";
import NewsPost from "../components/NewsPost";
import PermissionUtils from "./../utils/PermissionUtils";

import FontAwesome from "react-fontawesome";

import { Permissions } from "@alehuo/clubhouse-shared";
import { toggleNewsModal, fetchNewsposts } from "../reducers/newsReducer";
import AddNewspost from "./subpages/AddNewspost";

export class NewsPage extends Component {
  componentDidMount() {
    this.props.fetchNewsposts();
  }
  render() {
    return (
      <React.Fragment>
        <PageHeader>
          News
          <p>
            {PermissionUtils.hasPermission(
              this.props.perms,
              Permissions.ALLOW_ADD_EDIT_REMOVE_POSTS.value
            ) && (
              <Button
                bsStyle="success"
                onClick={() => this.props.toggleNewsModal(true)}
              >
                <FontAwesome name="plus" /> Add an article
              </Button>
            )}
          </p>
        </PageHeader>
        {PermissionUtils.hasPermission(
          this.props.perms,
          Permissions.ALLOW_VIEW_POSTS.value
        ) ? (
          this.props.newsPosts &&
          this.props.newsPosts.map(newsPost => (
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
        <AddNewspost
          show={this.props.modalOpen}
          onHide={() => this.props.toggleNewsModal(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  perms: state.permission.userPerms,
  newsPosts: state.news.newsPosts,
  modalOpen: state.news.modalOpen
});

const mapDispatchToProps = {
  toggleNewsModal,
  fetchNewsposts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewsPage);
