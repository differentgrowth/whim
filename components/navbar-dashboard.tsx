import { ExitIcon } from "@radix-ui/react-icons"

import { signout } from "@/app/actions"
import { SubmitButton } from "@/components/submit-button"

export const DashboardNavbar = () => {
	return (
		<nav className="mt-1.5 flex flex-row flex-wrap items-center justify-end p-2">
			<form action={signout}>
				<SubmitButton variant="outline" icon={<ExitIcon />}>
					Sign Out
				</SubmitButton>
			</form>
		</nav>
	)
}
