import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

import EnrollmentListToolbar from 'src/components/enrollment/EnrollmentListToolbar';
import EnrollmentListResults from 'src/components/enrollment/EnrollmentListResult';

const EnrollmentList = () => (
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
          <EnrollmentListResults />
        </Box>
      </Container>
    </Box>
  </>
);

export default EnrollmentList;
