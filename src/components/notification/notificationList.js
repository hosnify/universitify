/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline'
  }
}));

function NotificationList({ ...props }) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {props.notifications.map((notification) => (
        <React.Fragment key={notification.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="avatar" src={notification.data.avatar} />
              {/* TODO */}
            </ListItemAvatar>
            <ListItemText
              primary={notification.data.title}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {notification.data.senderName}
                  </Typography>
                  <Typography
                    component="span"
                    variant="h5"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {` ${notification.data.text}`}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body1"
                    color="textPrimary"
                  >
                    {notification.data.subText}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
export default NotificationList;
