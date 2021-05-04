import { useContext } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import SettingsPassword from 'src/components/settings/SettingsPassword';

import { UserContext } from '../../../API/auth';

const StudentProfileDetails = (props) => {
  const { user } = useContext(UserContext);

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
                required
                value={user.fname}
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
                required
                value={user.lname}
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
                required
                value={user.email}
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
                type="number"
                value={user.level}
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
                name="semester"
                required
                value={user.semester}
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
                type="number"
                value={user.creditDone}
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
                type="number"
                value={user.creditHave}
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
                type="number"
                value={user.GPA}
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
                type="number"
                value={user.lastTermGPA}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <SettingsPassword />
      </Card>
    </form>
  );
};

export default StudentProfileDetails;
