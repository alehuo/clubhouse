import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { navButtons } from "../navButtons";
import { closeMenu, openMenu } from "../reducers/actions/uiActions";
import { RootState } from "../reduxStore";

const NavigationDrawer: React.FC = () => {
  const menuOpen = useSelector((state: RootState) => state.ui.menuOpen);
  const dispatch = useDispatch();
  return (
    <SwipeableDrawer
      open={menuOpen}
      onClose={() => dispatch(closeMenu())}
      onOpen={() => dispatch(openMenu())}
    >
      <List
        onClick={() => dispatch(closeMenu())}
        onKeyDown={() => dispatch(closeMenu())}
        style={{
          width: 200,
        }}
      >
        {navButtons.map((btn) => (
          <ListItem button key={btn.text} to={btn.url} component={Link}>
            <ListItemText primary={btn.text} />
          </ListItem>
        ))}
      </List>
    </SwipeableDrawer>
  );
};

export default NavigationDrawer;
