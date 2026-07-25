import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Homepage from "./modules/home/homepage";
import HomepageNavbar from "./components/navbar/home/homepage_navbar";
import HomepageFooter from "./components/footer/home/homepage_footer";

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
