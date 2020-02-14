import React from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddNewspostForm from '../../forms/AddNewspostForm';

import { addNewspost } from '../../reducers/actions/newsActions';
import { RootState } from '../../reduxStore';

interface Props {
    token: string | null;
    show: boolean;
    onHide: any;
    addNewspost: any;
}

export class AddNewspost extends React.Component<Props> {
    public handleSubmit = (values: any) => {
        if (this.props.token !== null) {
            this.props.addNewspost(this.props.token, values.newspostTitle, values.newspostMessage);
        }
    };
    public render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit a newspost</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddNewspostForm handleClose={this.props.onHide} onSubmit={this.handleSubmit} />
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    token: state.auth.token,
    isAdding: state.news.isAdding,
});

const mapDispatchToProps = {
    addNewspost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewspost);
