import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import { getAllCourses } from 'src/API/courseAPI';

// import getInitials from 'src/utils/getInitials';

const CourseListResults = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses().then((coursesData) => setCourses(coursesData));
  }, []);
  console.log(courses);
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const courseTableMetaData = [
    'courseCode',
    'Course name',
    'level',
    'major',
    'credit',
    'available',
    'course prerequisites',
    'Students ',
    'Current Enrollments',
    'Actions'
  ];

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                {courseTableMetaData.map((metaData) => (
                  <TableCell key={metaData}>{metaData}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses
                .slice(page === 0 ? 0 : limit * (page - 1), limit * page)
                .map((courseData) => (
                  <TableRow hover key={courseData.id}>
                    <TableCell>{courseData.courseCode}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: 'center',
                          display: 'flex'
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {courseData.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{courseData.level}</TableCell>
                    <TableCell>{courseData.major}</TableCell>
                    <TableCell>{courseData.credit}</TableCell>
                    <TableCell>{courseData.available}</TableCell>
                    <TableCell>
                      <Button primary> show prerequisites </Button>
                    </TableCell>
                    <TableCell>
                      <Button primary> show students </Button>
                    </TableCell>
                    <TableCell>
                      <Button primary> show enrollments </Button>
                    </TableCell>
                    <TableCell>
                      <Button primary> Update Course </Button>
                      <Button color="secondary"> delete Course </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={courses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default CourseListResults;
