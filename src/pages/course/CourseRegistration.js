import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import CourseRegistrationListResults from 'src/components/course/CourseRegistrationListResults';

const CourseRegistration = () => (
  <>
    <Helmet>
      <title>Course Registration</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ pt: 3 }}>
          <CourseRegistrationListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default CourseRegistration;
