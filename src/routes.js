import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import StudentList from 'src/pages/StudentList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Settings from 'src/pages/Settings';
import CourseList from './pages/course/CourseList';
import EnrollmentList from './pages/enrollments/EnrollmentList';
import SupervisorList from './pages/supervisor/SupervisorList';
import AddCoursePage from './pages/course/AddCoursePage';
import CourseDetailsPage from './pages/course/CourseDetailsPage';
import PlanAheadPage from './pages/PlanAhead';
import SuperVisorAccount from './pages/supervisor/SuperVisorAccount';
import CourseRegistration from './pages/course/CourseRegistration';

// isSigned = true;
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <SuperVisorAccount /> },
      { path: 'students', element: <StudentList /> },
      { path: 'courses', element: <CourseList /> },
      { path: 'course/add', element: <AddCoursePage /> },
      { path: 'course/:id', element: <CourseDetailsPage /> },
      { path: 'registration', element: <CourseRegistration /> },
      { path: 'finishedCourses', element: <CourseRegistration /> },

      { path: 'enrollments', element: <EnrollmentList /> },
      { path: 'supervisors', element: <SupervisorList /> },
      { path: 'planahead', element: <PlanAheadPage /> },

      { path: 'dashboard', element: <Dashboard /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/account" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
