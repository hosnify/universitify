import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import EnrollmentListToolbar from 'src/components/enrollment/EnrollmentListToolbar';
import StudentEnrollmentListResults from 'src/components/enrollment/StudentEnrollmentListResults';

const StudentEnrollmentList = () => (
  <>
    <Helmet>
      <title>EnrollmentList</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <EnrollmentListToolbar />
        <Box sx={{ pt: 3 }}>
          <StudentEnrollmentListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default StudentEnrollmentList;
