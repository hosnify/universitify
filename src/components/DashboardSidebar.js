/* eslint-disable operator-linebreak */
/* eslint-disable indent */
// eslint-disable-next-line camelcase

import { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
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
import {
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  Users as UsersIcon
} from 'react-feather';
import { getStudent } from 'src/API/studentAPI';
import NavItem from './NavItem';
import { UserContext } from '../API/auth';

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, []);
  useEffect(() => {
    if (user && user.role === 'student') {
      getStudent(user.id).then((userData) => {
        setUser({ role: 'student', ...userData });
      });
    }
  }, []);

  const items =
    !!user && user.role === 'student'
      ? [
          {
            href: '/app/account',
            icon: UserIcon,
            title: 'Profile'
          },
          {
            href: '/app/registration',
            icon: UsersIcon,
            title: 'Registration'
          },
          {
            href: '/app/finishedCourses',
            icon: UsersIcon,
            title: 'My Courses'
          },
          {
            href: '/app/enrollments',
            icon: ShoppingBagIcon,
            title: 'Enrollments'
          }
        ]
      : [
          {
            href: '/app/account',
            icon: UserIcon,
            title: 'Profile'
          },
          {
            href: '/app/students',
            icon: UsersIcon,
            title: 'Students'
          },
          {
            href: '/app/courses',
            icon: UsersIcon,
            title: 'Courses'
          },
          {
            href: '/app/enrollments',
            icon: ShoppingBagIcon,
            title: 'Enrollments'
          },
          {
            href: '/app/course/add',
            icon: UserIcon,
            title: 'Add Course'
          },
          {
            href: '/app/supervisor/add',
            icon: UserIcon,
            title: 'Add Supervisor'
          },
          {
            href: '/app/student/add',
            icon: UserIcon,
            title: 'Add Student'
          }
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
          gap: 3
        }}
      >
        <Avatar
          component={RouterLink}
          src="/static/images/avatars/glalet.png"
          variant="circular"
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h4">
          {!!user && user.name}
        </Typography>
        <Typography color="GrayText" variant="h6">
          {`level ${!!user && user.level}`}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
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
          // style={{ overflow: 'auto', position: 'relative' }}
          anchor="left"
          variant="persistent"
          open
          PaperProps={{
            sx: {
              width: 256,
              top: 100,
              height: 'clac(100%-100)',
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
