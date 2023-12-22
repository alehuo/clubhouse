import { User } from '@alehuo/clubhouse-shared';
import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../reduxStore';

interface Props {
    userData?: User;
}

const UserProfilePage: React.FC<Props> = props => {
    /*return (
        <React.Fragment>
            <Row className="clearfix">
                <Col xs={3}>
                    <Nav variant="pills" className="flex-column">
                        <LinkContainer to="/user/info">
                            <Nav.Link>
                                <FontAwesomeIcon icon="user" /> My information
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/user/history">
                            <Nav.Link>
                                <FontAwesomeIcon icon="clock" /> My history
                            </Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/user/keys">
                            <Nav.Link>
                                <FontAwesomeIcon icon="key" /> My keys
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Col>
                <Col xs={9}>
                    <Route exact path="/user" component={() => <Redirect to="/user/info" />} />
                    <Route exact path="/user/info" render={() => <UserInformation userData={props.userData} />} />
                    <Route exact path="/user/history" component={UserHistory} />
                    <Route exact path="/user/keys" component={UserKeys} />
                </Col>
            </Row>
        </React.Fragment>
    );*/
    return <div />;
};

const mapStateToProps = (state: RootState) => ({
    perms: state.user.userPerms,
    userData: state.user.userData,
});

export default connect(mapStateToProps)(UserProfilePage);
