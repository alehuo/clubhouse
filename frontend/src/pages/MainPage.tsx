import { Typography, Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import React from 'react';

const MainPage: React.FC = () => (
    <Grid container spacing={2}>
        <Grid item xs={8}>
            <Grid container>
                <Typography component="h1" variant="h4">
                    Welcome!
                </Typography>
                <Typography component="p" variant="body1">
                    Manage your clubhouse with ease. Source code available{' '}
                    <a href="https://github.com/alehuo/clubhouse.git" target="blank">
                        here
                    </a>
                </Typography>
                <Typography component="p">
                    Many student unions across Finland use so called &quot;clubhouses&quot; where they can organize
                    events and have fun with other students.
                </Typography>
                <Typography component="p">
                    It is not always clear what events are kept there, who has the permission to use such places and how
                    to keep a good track of who is in response of other people, and when has such a person been there.
                </Typography>
                <Typography component="p">
                    This project is meant to solve this problem by providing:
                    <ul>
                        <li>Student union management</li>
                        <li>
                            Key management (To assign keys to people with different types of keys. For example, 24h and
                            day keys)
                        </li>
                        <li>Event management to organize and look for events (Events are available as an iCal feed)</li>
                        <li>Rule management</li>
                        <li>Cleaning schedule management</li>
                        <li>A &quot;newsboard&quot; system for posting announcements</li>
                        <li>A management interface for easy responsibility taking of other people</li>
                        <li>Sending messages to other people in the service</li>
                        <li>
                            A very flexible permissions system. You can add roles and customize their permissions as you
                            wish.
                        </li>
                        <li>E-mail integration</li>
                        <li>Push-notification support</li>
                        <li>Available as a PWA (Progressive Web Application) that can be easily installed</li>
                    </ul>
                </Typography>
                <Typography component="p">
                    Feel free to fork the project and modify it to suit your needs. The project has been licensed with
                    MIT license.
                </Typography>
            </Grid>
        </Grid>
        <Grid item xs={4}>
            <Grid container>
                <Typography variant="h4">Open events</Typography>
                <List>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={<Typography variant="h6">10.10.2020 klo 17:00</Typography>}
                            secondary={
                                <>
                                    <Typography component="a" href="#" variant="body1" color="textPrimary">
                                        Matlun hallituksen kokous
                                    </Typography>
                                    <Divider component="br" />
                                    <Typography component="span" variant="body1" color="textSecondary">
                                        Matlu ry
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                    <Divider component="li" />
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            primary={<Typography variant="h6">10.11.2020 klo 17:00</Typography>}
                            secondary={
                                <>
                                    <Typography component="a" href="#" variant="body1" color="textPrimary">
                                        Matlun hallituksen kokous
                                    </Typography>
                                    <Divider component="br" />
                                    <Typography component="span" variant="body1" color="textSecondary">
                                        Matlu ry
                                    </Typography>
                                </>
                            }
                        />
                    </ListItem>
                </List>
            </Grid>
        </Grid>
    </Grid>
);

export default MainPage;
