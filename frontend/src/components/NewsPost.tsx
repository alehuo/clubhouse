import { Newspost } from '@alehuo/clubhouse-shared';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import React from 'react';

interface Props {
    date?: string;
    onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onEdit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hasEditDeletePermissions: boolean;
}

const NewsPost: React.FC<Pick<Newspost, 'title' | 'author' | 'message'> & Props> = ({
    title,
    message,
    author,
    date,
    onDelete,
    onEdit,
    hasEditDeletePermissions,
}) => {
    return (
        <Card style={{ marginTop: 5, marginBottom: 5 }}>
            <CardHeader
                avatar={<Avatar aria-label="recipe">{author}</Avatar>}
                title={title}
                subheader={date ? moment(date).format('LLL') : 'N/A'}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {message}
                </Typography>
            </CardContent>
            {hasEditDeletePermissions && (
                <CardActions>
                    <Button size="small" onClick={onDelete}>
                        <FontAwesomeIcon icon="trash" /> Delete
                    </Button>
                    {'   '}
                    <Button size="small" onClick={onEdit}>
                        <FontAwesomeIcon icon="edit" /> Edit
                    </Button>
                </CardActions>
            )}
        </Card>
    );
};

export default NewsPost;
