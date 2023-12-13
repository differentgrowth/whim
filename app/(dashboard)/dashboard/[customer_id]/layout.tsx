import { DashboardNavbar } from '@/components/dashboard-navbar';
import { Footer } from '@/components/footer';

type LayoutProps = {
  children: React.ReactNode;
}

export const dynamic = 'force-dynamic';

const Layout = ( { children }: LayoutProps ) => {
  return (
    <>
      <DashboardNavbar />
      { children }
      <Footer />
    </>
  );
};

export default Layout;