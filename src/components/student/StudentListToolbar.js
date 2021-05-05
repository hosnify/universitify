/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Search as SearchIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const StudentListToolbar = (props) => {
  const navigate = useNavigate();
  const handleAddButton = () => {
    navigate('/app/student/add');
  };
  return (
    <Box {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button color="primary" variant="contained" onClick={handleAddButton}>
          Add New
          <AddIcon />
        </Button>
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
              placeholder="Search by student name"
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>
    </Box> */}
    </Box>
  );
};

export default StudentListToolbar;
