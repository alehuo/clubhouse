import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';

import { Permission, Document } from '@alehuo/clubhouse-shared';
import { Typography } from '@material-ui/core';
import CustomOverlay from '../components/CustomOverlay';
import { SingleDocument } from '../components/SingleDocument';
import { RootState } from '../reduxStore';
import { fetchDocuments, moveDocumentDown, moveDocumentUp, toggleEditMode } from '../reducers/documentReducer';
import PermissionUtils from '../utils/PermissionUtils';

interface Props {
    editMode: boolean;
    fetchDocuments: any;
    toggleEditMode: any;
    perms: number;
    documents: Document[];
    moveDocumentUp: any;
    moveDocumentDown: any;
}

export class DocumentsPage extends React.Component<Props> {
    public componentDidMount() {
        this.props.fetchDocuments();
    }
    public render() {
        return (
            <React.Fragment>
                <Typography variant="h3">Documents</Typography>
                <p>
                    {PermissionUtils.hasPermission(this.props.perms, Permission.ALLOW_ADD_EDIT_REMOVE_DOCUMENTS) && (
                        <React.Fragment>
                            <CustomOverlay id="editRuleTooltip" text="Lock or unlock document editing.">
                                <Button
                                    variant={!this.props.editMode ? 'info' : 'danger'}
                                    onClick={() => this.props.toggleEditMode()}
                                >
                                    {!this.props.editMode ? (
                                        <React.Fragment>
                                            <FontAwesomeIcon icon="lock" /> Edit documents
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <FontAwesomeIcon icon="lock-open" /> Finish editing
                                        </React.Fragment>
                                    )}
                                </Button>
                            </CustomOverlay>
                            {'  '}
                            <CustomOverlay id="addRuleTooltip" text="Add a new document.">
                                <Button onClick={() => console.log('Todo')} variant="success">
                                    <FontAwesomeIcon icon="plus" /> Add new document
                                </Button>
                            </CustomOverlay>
                        </React.Fragment>
                    )}
                </p>
                {this.props.documents && (
                    <Table responsive striped>
                        <tbody>
                            {this.props.documents.map((document, i: number) => (
                                <SingleDocument
                                    id={i + 1}
                                    key={i}
                                    document={document}
                                    canMoveUp={i === 0}
                                    canMoveDown={i === this.props.documents.length - 1}
                                    onMoveUpClick={() => this.props.moveDocumentUp(document.documentId)}
                                    onMoveDownClick={() => this.props.moveDocumentDown(document.documentId)}
                                    editMode={this.props.editMode}
                                />
                            ))}
                        </tbody>
                    </Table>
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState) => ({
    perms: state.user.userPerms,
    documents: state.document.documents,
    editMode: state.document.editMode,
});

const mapDispatchToProps = {
    fetchDocuments,
    moveDocumentUp,
    moveDocumentDown,
    toggleEditMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsPage);
