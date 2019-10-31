import { Newspost, Permission } from "@alehuo/clubhouse-shared";
import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import NewsPost from "../components/NewsPost";
import {
  deleteNewspost,
  fetchNewsposts,
  setEditId,
  toggleNewsAddModal,
  toggleNewsEditModal,
} from "../reducers/actions/newsActions";
import { RootState } from "../reduxStore";
import PermissionUtils from "./../utils/PermissionUtils";
import AddNewspost from "./subpages/AddNewspost";
import EditNewspost from "./subpages/EditNewspost";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

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

const NewsPage: React.FC<Props> = ({
  token,
  perms,
  fetchNewsposts,
  toggleNewsAddModal,
  newsPosts,
  deleteNewspost,
  setEditId,
  toggleNewsEditModal,
  addModalOpen,
  editModalOpen,
}) => {
  useEffect(() => {
    fetchNewsposts();
  }, []);

  const editDeletePermissions = PermissionUtils.hasPermission(
    perms,
    Permission.ALLOW_ADD_EDIT_REMOVE_POSTS,
  );
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h3">News</Typography>
      {newsPosts &&
        newsPosts.map((newsPost) => (
          <NewsPost
            key={newsPost.postId}
            title={newsPost.title}
            author={newsPost.author}
            message={newsPost.message}
            date={newsPost.created_at}
            onDelete={(event) => {
              event.preventDefault();
              if (
                window.confirm("Do you want to delete the selected newspost?")
              ) {
                deleteNewspost(token, newsPost.postId);
              }
            }}
            onEdit={() => {
              setEditId(newsPost.postId);
              toggleNewsEditModal(true);
            }}
            hasEditDeletePermissions={editDeletePermissions}
          />
        ))}
      <AddNewspost
        show={addModalOpen}
        onHide={() => toggleNewsAddModal(false)}
      />
      <EditNewspost
        show={editModalOpen}
        onHide={() => toggleNewsEditModal(false)}
      />
      {editDeletePermissions && (
        <Fab
          color="primary"
          className={classes.fab}
          onClick={() => toggleNewsAddModal(true)}
        >
          <AddIcon />
        </Fab>
      )}
    </React.Fragment>
  );
};

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
