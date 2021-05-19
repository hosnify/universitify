/* eslint-disable operator-linebreak */
/* eslint-disable indent */
// eslint-disable-next-line camelcase

import { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import NavItem from './NavItem';
import { UserContext } from '../API/auth';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const items =
    user && user.role === 'student'
      ? [
          {
            href: `/app/student/${user.id}/account`,
            icon: AccountCircleIcon,
            title: 'Profile'
          },
          {
            href: '/app/registration',
            icon: LibraryAddIcon,
            title: 'Registration'
          },
          {
            href: `/app/student/${user.id}/Courses`,
            icon: CardMembershipIcon,
            title: 'My Courses'
          },
          {
            href: `/app/student/${user.id}/enrollments`,
            icon: LibraryBooksIcon,
            title: 'My Enrollments'
          }
        ]
      : [
          {
            href: `/app/supervisor/${user.id}/account`,
            icon: AccountCircleIcon,
            title: 'Profile'
          },
          {
            href: '/app/students',
            icon: PeopleAltIcon,
            title: 'Students'
          },
          {
            href: '/app/courses',
            icon: CardMembershipIcon,
            title: 'Courses'
          },
          {
            href: '/app/enrollments',
            icon: LibraryBooksIcon,
            title: 'Enrollments'
          },
          {
            href: '/app/supervisors',
            icon: SupervisorAccountIcon,
            title: 'Supervisors'
          }
          // {
          //   href: '/app/course/add',
          //   icon: UserIcon,
          //   title: 'Add Course'
          // },
          // {
          //   href: '/app/supervisor/add',
          //   icon: UserIcon,
          //   title: 'Add Supervisor'
          // },
          // {
          //   href: '/app/student/add',
          //   icon: UserIcon,
          //   title: 'Add Student'
          // }
        ];
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          p: 2,
          gap: 1
        }}
      >
        <Avatar
          component={RouterLink}
          src={user.avatar}
          variant="circular"
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/"
        />
        <Typography color="textPrimary" variant="h4">
          {!!user && user.role === 'supervisor'
            ? `DR. ${user.fname} ${user.lname}`
            : ` ${user.fname} ${user.lname}`}
        </Typography>
        {!!user && user.role === 'student' && (
          <Typography color="GrayText" variant="h6">
            {`level ${!!user && user.level}`}
          </Typography>
        )}
      </Box>
      <Divider />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyItems: 'center',
          p: 2,
          gap: 1
        }}
      >
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          style={{ overflow: 'auto' }}
          anchor="left"
          variant="persistent"
          open
          PaperProps={{
            sx: {
              width: 256,
              top: 100,
              height: '100%',
              position: 'fixed'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
