import { Footer } from "@/components/footer"
import { DashboardNavbar } from "@/components/navbar-dashboard"

type LayoutProps = {
	params: {
		customer_id: string
	}
	children: React.ReactNode
}

export const dynamic = "force-dynamic"

const Layout = ({ children }: LayoutProps) => {
	return (
		<>
			<DashboardNavbar />
			{children}
			<Footer />
		</>
	)
}

export default Layout
