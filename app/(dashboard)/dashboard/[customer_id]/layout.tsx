import type { Metadata } from "next"

import { Footer } from "@/components/footer"
import { DashboardNavbar } from "@/components/navbar-dashboard"

type LayoutProps = {
	params: {
		customer_id: string
	}
	children: React.ReactNode
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
	title: "Dashboard",
	robots: {
		index: false
	}
}

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
