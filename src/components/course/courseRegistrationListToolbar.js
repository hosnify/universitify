/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Button,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';

const CourseRegistrationListToolbar = ({ ...props }) => {
  const navigate = useNavigate();

  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start'
        }}
      >
        <Typography variant="h1">{`Level : ${props.level}`}</Typography>
      </Box>
      {/* <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon fontSize="small" color="action">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              placeholder="Search by supervisor name"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box> */}
    </Box>
  );
};

export default CourseRegistrationListToolbar;
