import React from 'react';
import { connect } from 'react-redux';
import AddNewspostForm from '../../forms/AddNewspostForm';

import { addNewspost } from '../../reducers/actions/newsActions';
import { RootState } from '../../reduxStore';
import { DialogTitle, DialogContent, Dialog } from '@material-ui/core';

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
            <Dialog open={this.props.show}>
                <DialogTitle>Submit a newspost</DialogTitle>
                <DialogContent>
                    <AddNewspostForm handleClose={this.props.onHide} onSubmit={this.handleSubmit} />
                </DialogContent>
            </Dialog>
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
