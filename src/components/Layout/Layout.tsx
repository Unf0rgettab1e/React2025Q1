import { Outlet } from 'react-router';
import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        {children || <Outlet />}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
