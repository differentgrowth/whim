"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { EnterIcon, HomeIcon, PersonIcon } from "@radix-ui/react-icons"

export const Navbar = () => {
	const pathname = usePathname()

	return (
		<nav
			className={cn(
				"mt-1.5 flex flex-row items-center justify-between p-2",
				pathname === "/" ? "justify-end" : "justify-between"
			)}
		>
			{pathname !== "/" ? (
				<Link href="/" role="link" className={buttonVariants({ variant: "ghost" })}>
					<HomeIcon className="mr-1.5 size-4" aria-hidden="true" />
					<span className="font-medium text-sm">Whim</span>
				</Link>
			) : null}

			{pathname !== "/login" ? (
				<div className="flex justify-end space-x-1.5">
					<Link
						href="/login"
						role="link"
						className={buttonVariants({ variant: "outline" })}
					>
						Log In
						<EnterIcon className="ml-1.5 size-4" aria-hidden="true" />
					</Link>
					<Link
						role="link"
						href="/login?value=signup"
						className={buttonVariants({ variant: "outline" })}
					>
						Sign Up
						<PersonIcon className="ml-1.5 size-4" aria-hidden="true" />
					</Link>
				</div>
			) : null}
		</nav>
	)
}
