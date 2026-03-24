import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "./modules/homepage/homepage";
import HomepageNavbar from "./modules/homepage/navbar/homepage_navbar";
import HomepageFooter from "./modules/homepage/footer/homepage_footer";

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
        <Route element={<HomepageLayout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
        </Routes>
    </Router>
  );
}

export default App;
