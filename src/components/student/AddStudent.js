import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import SettingsPassword from '../settings/SettingsPassword';

const AddStudent = (props) => {
  const [values, setValues] = useState({
    courseTitle: 'introduction to computer',
    discreption: 'introduction to computer programing and operating system',
    code: 'CS50',
    instructor: 'adam ',
    credit: '3',
    level: '3',
    major: 'computer',
    prerequisites: 'cs31,cs41'
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader
          subheader="The information can not be edited by student"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="First name"
                name="fname"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lname"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Level"
                name="Level"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                type="number"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Current Semester"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                name="semester"
                required
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="credits Earned"
                name="creditDone"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                type="number"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="credits available"
                name="creditHave"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                type="number"
                onChange={handleChange}
                variant="outlined"
                helperText="for current semester"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="GPA"
                name="GPA"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                type="number"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last Term GPA"
                name="lastTermGPA"
                InputProps={{
                  readOnly: true
                }}
                InputLabelProps={{
                  shrink: true
                }}
                type="number"
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2
          }}
        >
          <Button color="primary" variant="contained">
            Add
          </Button>
        </Box>
        <Divider />
        <SettingsPassword />
      </Card>
    </form>
  );
};

export default AddStudent;
