import { Navbar } from '@/components/home-navbar';
import { Footer } from '@/components/footer';

type LayoutProps = {
  children: React.ReactNode;
}

const Layout = ( { children }: LayoutProps ) => {
  return (
    <>
      <Navbar />
      { children }
      <Footer />
    </>
  );
};

export default Layout;