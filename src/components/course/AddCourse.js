import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Snackbar,
  TextField
} from '@material-ui/core';
import { createOne, updateCoursePrerequisites } from 'src/API/courseAPI';

const AddCourse = (props) => {
  const [values, setValues] = useState({});
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleAdd = async () => {
    const newCourse = await createOne({ ...values });
    await updateCoursePrerequisites(newCourse.id, {
      prerequisites: values.prerequisites.split(',')
    });
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="" title="Add New Course" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Course title"
                label="Title"
                name="name"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="discreption"
                name="discreption"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Major"
                name="major"
                onChange={handleChange}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Level"
                name="level"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="credits "
                name="credit"
                onChange={handleChange}
                type="number"
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Course Code"
                name="courseCode"
                onChange={handleChange}
                required
                variant="outlined"
                helperText="ex: MIS86 "
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="prerequisites"
                name="prerequisites"
                onChange={handleChange}
                required
                variant="outlined"
                helperText="enter course code seperated by comma  ex: MIS86,MIS89 "
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
          <Button color="primary" variant="contained" onClick={handleAdd}>
            Add
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              success: course created
            </Alert>
          </Snackbar>
        </Box>
      </Card>
    </form>
  );
};

export default AddCourse;
