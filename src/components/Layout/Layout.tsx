import { Outlet } from 'react-router';
import Footer from '~/components/Layout/Footer';
import Header from '~/components/Layout/Header';
import { useTheme } from '~/context/ThemeContext/useTheme';

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme} bg-slate-900 text-slate-100`} data-testid="layout">
      <Header />
      <div className="pt-24 min-h-screen flex flex-col">
        {children || <Outlet />}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
