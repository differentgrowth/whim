import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar-home"

type LayoutProps = {
	children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}

export default Layout
