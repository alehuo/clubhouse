import React, { Component } from "react";
import { Alert, Button, PageHeader } from "react-bootstrap";
import { connect } from "react-redux";
import NewsPost from "../components/NewsPost";
import PermissionUtils from "./../utils/PermissionUtils";

import FontAwesome from "react-fontawesome";

import { Permissions } from "@alehuo/clubhouse-shared";
import {
  deleteNewspost,
  fetchNewsposts,
  setEditId,
  toggleNewsAddModal,
  toggleNewsEditModal,
} from "../reducers/actions/newsActions";
import { NewsPost as NewsPostType } from "../reducers/newsReducer";
import { RootState } from "../reduxStore";
import AddNewspost from "./subpages/AddNewspost";
import EditNewspost from "./subpages/EditNewspost";

interface Props {
  token: string;
  perms: number;
  fetchNewsposts: any;
  toggleNewsAddModal: any;
  newsPosts: NewsPostType[];
  deleteNewspost: any;
  setEditId: any;
  toggleNewsEditModal: any;
  addModalOpen: any;
  editModalOpen: any;
}

export class NewsPage extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchNewsposts(this.props.token);
  }
  public render() {
    const editDeletePermissions = PermissionUtils.hasPermission(
      this.props.perms,
      Permissions.ALLOW_ADD_EDIT_REMOVE_POSTS.value,
    );
    const viewPermissions = PermissionUtils.hasPermission(
      this.props.perms,
      Permissions.ALLOW_VIEW_POSTS.value,
    );
    return (
      <React.Fragment>
        <PageHeader>
          News
          <p>
            {editDeletePermissions && (
              <Button
                bsStyle="success"
                onClick={() => this.props.toggleNewsAddModal(true)}
              >
                <FontAwesome name="plus" /> Add an article
              </Button>
            )}
          </p>
        </PageHeader>
        {viewPermissions ? (
          this.props.newsPosts &&
          this.props.newsPosts.map((newsPost: NewsPostType) => (
            <NewsPost
              key={newsPost.postId}
              title={newsPost.title}
              author={newsPost.author}
              message={newsPost.message}
              date={newsPost.created_at}
              onDelete={(event: any) => {
                event.preventDefault();
                if (
                  window.confirm("Do you want to delete the selected newspost?")
                ) {
                  this.props.deleteNewspost(this.props.token, newsPost.postId);
                }
              }}
              onEdit={() => {
                this.props.setEditId(newsPost.postId);
                this.props.toggleNewsEditModal(true);
              }}
              hasEditDeletePermissions={editDeletePermissions}
            />
          ))
        ) : (
          <Alert bsStyle="warning">
            <h4>No permission to view news</h4>
            <p>You don't have correct permissions to view news.</p>
          </Alert>
        )}
        <AddNewspost
          show={this.props.addModalOpen}
          onHide={() => this.props.toggleNewsAddModal(false)}
        />
        <EditNewspost
          show={this.props.editModalOpen}
          onHide={() => this.props.toggleNewsEditModal(false)}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  perms: state.permission.userPerms,
  newsPosts: state.news.newsPosts,
  addModalOpen: state.news.addModalOpen,
  editModalOpen: state.news.editModalOpen,
  token: state.user.token,
});

const mapDispatchToProps = {
  toggleNewsAddModal,
  toggleNewsEditModal,
  fetchNewsposts,
  deleteNewspost,
  setEditId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsPage);
