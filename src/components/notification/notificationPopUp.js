/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Badge, Box, IconButton } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import NotificationList from './notificationList';

export default function NotificationPopUp(props) {
  return (
    <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
          <IconButton
            color="inherit"
            style={{ marginRight: '10px' }}
            {...bindTrigger(popupState)}
          >
            <Badge
              badgeContent={props.notifications.length}
              color="secondary"
              variant="standard"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <Box p={2}>
              <NotificationList notifications={props.notifications} />
            </Box>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
