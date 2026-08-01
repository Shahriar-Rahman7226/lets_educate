import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "./modules/home/homepage";
import HomepageNavbar from "./components/navbar/home/homepage_navbar";
import HomepageFooter from "./components/footer/home/homepage_footer";
import SignIn from "./modules/auth/signin/signin";
import TutorSignUp from "./modules/auth/signup/tutor_signup";
import StudentSignUp from "./modules/auth/signup/student_signup";
import UserChoice from "./modules/auth/userchoice/userchoice";
import TutorProfile from "./modules/tutor/profile/tutor_profile";
import TutorEducation from "./modules/tutor/education/tutor_education";
import StudentProfile from "./modules/student/profile/student_profile";

// ===== Layout Components =====
const HomepageLayout = () => (
  <>
    <HomepageNavbar />
    <Outlet />
    <HomepageFooter />
  </>
);

// const HomepageUserLayout = () => (
//   <>
//     <UserNavbar />
//     <Outlet />
//     <HomepageFooter />
//   </>
// );

// const UserLayout = () => (
//   <>
//     <UserNavbar />
//     <Outlet />
//     <UserFooter />
//   </>
// );

// ===== App Component =====
function App() {
  return (
    <Router>
      <Routes>
         {/* Auth Pages */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/tutor_signup" element={<TutorSignUp />} />
           <Route path="/student_signup" element={<StudentSignUp />} />
          <Route path="/userchoice" element={<UserChoice />} />

          {/* Tutor Pages */}
          {/* <Route path="/tutor_dashboard" element={<TutorDashboard />} /> */}
          <Route path="/tutor_profile" element={<TutorProfile />} />
          <Route path="/tutor_education" element={<TutorEducation />} />

           {/* Student Pages */}
          {/* <Route path="/student_dashboard" element={<StudentDashboard />} /> */}
          <Route path="/student_profile" element={<StudentProfile />} />

         {/* ===== Public Layout ===== */}
          <Route element={<HomepageLayout />}>
            <Route path="/" element={<Homepage />} />
          </Route>
      </Routes>
    </Router>
  );
}

export default App;
