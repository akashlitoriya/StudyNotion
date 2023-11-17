import "./App.css";
import { Route, Routes} from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/core/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboardcomp/MyProfile";
import ProtectedRoute from "./components/core/Auth/ProtectedRoute";
import ProfileSetting from "./components/core/Dashboardcomp/ProfileSetting";
// import EnrolledCourses from "./components/core/Dashboardcomp/EnrolledCourses";
// import Cart from "./components/core/Dashboardcomp/Cart";
import ContactUs from "./components/core/ContactUs";
import { useSelector } from "react-redux";
// import AddCourse from "./components/core/Dashboardcomp/AddCourse";
function App() {
  const {user} = useSelector((state) => state.profile);
  return (

    <div className="w-screen min-h-screen bg-richblack-900">
      <Navbar />
      <Routes>
        <Route path="/" element= {<Home />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
              path="login"
              element={
                <OpenRoute>
                  <Login />
                </OpenRoute>
              }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route 
          path = "verify-email"
          element = {
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route 
          path = "about"
          element = {
            // <OpenRoute>
              <About />
            // </OpenRoute>
          }
        />
        <Route
          path = "contact"
          element = {
              // <OpenRoute>
                <ContactUs />
              // </OpenRoute>
            }
          />
       <Route 
        path = "dashboard"
        element = {
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
          
        }
        >
          <Route
            path = "my-profile"
            element = {
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
          />
          <Route 
            path = "setting"
            element = {
              <ProtectedRoute>
                <ProfileSetting />
              </ProtectedRoute>
            }
          />
          {/* <Route 
            path = "enrolled-courses"
            element = {
              <ProtectedRoute>
                <EnrolledCourses />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path = "cart"
            element = {
              <Cart />
            }
          /> */}
          {/* {
            <Route path="add-course" element= {<AddCourse />} />

          }
        */}
        </Route> 

      </Routes>
    </div>
    
  );
}

export default App;
