import React from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import NewsPost from "../components/NewsPost";
import PermissionUtils from "./../utils/PermissionUtils";

import FontAwesome from "react-fontawesome";

import { Newspost, Permission } from "@alehuo/clubhouse-shared";
import {
  deleteNewspost,
  fetchNewsposts,
  setEditId,
  toggleNewsAddModal,
  toggleNewsEditModal,
} from "../reducers/actions/newsActions";
import { RootState } from "../reduxStore";
import AddNewspost from "./subpages/AddNewspost";
import EditNewspost from "./subpages/EditNewspost";

interface Props {
  token: string;
  perms: number;
  fetchNewsposts: any;
  toggleNewsAddModal: any;
  newsPosts: Newspost[];
  deleteNewspost: any;
  setEditId: any;
  toggleNewsEditModal: any;
  addModalOpen: any;
  editModalOpen: any;
}

export class NewsPage extends React.Component<Props> {
  public componentDidMount() {
    this.props.fetchNewsposts();
  }
  public render() {
    const editDeletePermissions = PermissionUtils.hasPermission(
      this.props.perms,
      Permission.ALLOW_ADD_EDIT_REMOVE_POSTS,
    );
    return (
      <React.Fragment>
        <div>
          News
          <p>
            {editDeletePermissions && (
              <Button
                variant="success"
                onClick={() => this.props.toggleNewsAddModal(true)}
              >
                <FontAwesome name="plus" /> Add an article
              </Button>
            )}
          </p>
        </div>
        {this.props.newsPosts &&
          this.props.newsPosts.map((newsPost) => (
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
          ))}
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
  perms: state.user.userPerms,
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
