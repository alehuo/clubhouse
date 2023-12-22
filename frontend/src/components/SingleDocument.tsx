import { Document } from '@alehuo/clubhouse-shared';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomOverlay from './CustomOverlay';
import { Button, TableRow, TableCell } from '@material-ui/core';

interface Props {
    id: number;
    document: Document;
    editMode: boolean;
    canMoveUp: boolean;
    canMoveDown: boolean;
    onMoveUpClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onMoveDownClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const SingleDocument: React.FC<Props> = ({
    id,
    document,
    editMode,
    canMoveUp,
    onMoveUpClick,
    canMoveDown,
    onMoveDownClick,
}) => (
    <TableRow>
        <TableCell>
            <strong>{id}</strong>
        </TableCell>
        <TableCell>
            <span>
                <ReactMarkdown source={document.text} />
            </span>
        </TableCell>
        {editMode && (
            <React.Fragment>
                <TableCell>
                    <CustomOverlay id="editSingleRule" text="Edit the currently selected rule.">
                        <Button variant="text" size="small">
                            <FontAwesomeIcon icon="edit" /> Edit
                        </Button>
                    </CustomOverlay>
                </TableCell>
                <TableCell>
                    <CustomOverlay id="moveRuleUp" text="Move the currently selected rule up in the list.">
                        <Button variant="text" size="small" disabled={canMoveUp} onClick={onMoveUpClick}>
                            <FontAwesomeIcon icon="arrow-up" /> Move up
                        </Button>
                    </CustomOverlay>
                </TableCell>
                <TableCell>
                    <CustomOverlay id="moveRuleDown" text="Move the currently selected rule down in the list.">
                        <Button variant="text" size="small" disabled={canMoveDown} onClick={onMoveDownClick}>
                            <FontAwesomeIcon icon="arrow-down" /> Move down
                        </Button>
                    </CustomOverlay>
                </TableCell>
                <TableCell>
                    <CustomOverlay id="deleteSingleRule" text="Delete the currently selected rule.">
                        <Button variant="text" size="small">
                            <FontAwesomeIcon icon="trash-alt" /> Delete
                        </Button>
                    </CustomOverlay>
                </TableCell>
            </React.Fragment>
        )}
    </TableRow>
);
