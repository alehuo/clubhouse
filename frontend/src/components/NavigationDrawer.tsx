import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { navButtons } from '../navButtons';
import { closeMenu, openMenu } from '../reducers/actions/uiActions';
import { RootState } from '../reduxStore';

const NavigationDrawer: React.FC = () => {
    const menuOpen = useSelector((state: RootState) => state.ui.menuOpen);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return (
        <SwipeableDrawer open={menuOpen} onClose={() => dispatch(closeMenu())} onOpen={() => dispatch(openMenu())}>
            <List
                onClick={() => dispatch(closeMenu())}
                onKeyDown={() => dispatch(closeMenu())}
                style={{
                    width: 200,
                }}
            >
                {navButtons
                    .filter(btn => btn.auth === false || isAuthenticated)
                    .map(btn => {
                        const { icon: Icon } = btn;
                        return (
                            <ListItem button key={btn.text} to={btn.url} component={Link}>
                                <ListItemIcon>
                                    <Icon />
                                </ListItemIcon>
                                <ListItemText primary={btn.text} />
                            </ListItem>
                        );
                    })}
            </List>
        </SwipeableDrawer>
    );
};

export default NavigationDrawer;
