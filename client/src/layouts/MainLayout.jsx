import Heading from '../components/header/heading';
import HeadingBar from '../components/header/main';
import Footer from '../components/footer/main';
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Heading />
      <HeadingBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
