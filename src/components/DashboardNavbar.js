import { useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import {
  AppBar,
  // Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
// import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
// import InputIcon from '@material-ui/icons/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputIcon from '@material-ui/icons/Input';
import { UserContext } from '../API/auth';

const useStyles = makeStyles((theme) => ({
  appBar: {
    height: '100px',
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));
const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  // const [notifications] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      className={classes.appBar}
      elevation={0}
      color="inherit"
      {...rest}
    >
      <Toolbar>
        <img
          src="https://s3-eu-west-1.amazonaws.com/forasna/uploads/logos/clogo_2018-03-13-13-39-07_XN4RHiEhyx3kwf5BduWR8gXX.png"
          alt="fue"
          style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
        />
        <Box sx={{ flexGrow: 1 }} />

        <Hidden lgDown>
          {/* <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
          <Button onClick={() => logout()} color="inherit" variant="contained">
            <Box paddingRight={2}> log out</Box>
            <InputIcon />
          </Button>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
