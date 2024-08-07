import Link from "next/link"

import { Link1Icon } from "@radix-ui/react-icons"

import { createAnonymous } from "@/app/actions"
import { CreateAnonymousWhimForm } from "@/components/forms"
import { SubmitButton } from "@/components/submit-button"
import { buttonVariants } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const Page = () => {
	return (
		<main className="mt-12 space-y-12 md:space-y-24">
			<section className="container max-w-7xl">
				<div className="grid items-center gap-4 text-balance text-center">
					<div className="space-y-3">
						<h1 className="text-4xl tracking-tighter">Welcome to whim.li</h1>
						<p className={cn("mx-auto max-w-2xl", "text-muted-foreground")}>
							Transform long and cumbersome links into short, shareable URLs in a snap.
							Ideal for social media posts, emails, and more. Start simplifying your
							links now!
						</p>
						<p className={cn("mx-auto max-w-xl", "text-muted-foreground")}>
							The URL shortener you can trust.
						</p>
						<Link
							className={buttonVariants({ variant: "default" })}
							href="/login?value=signup"
						>
							Get Started
						</Link>
					</div>
				</div>
			</section>

			<section className="container max-w-7xl">
				<div className="mx-auto flex w-full max-w-2xl flex-col space-y-3">
					<CreateAnonymousWhimForm
						action={createAnonymous}
						className="flex flex-row"
						noValidate
						spellCheck={false}
					>
						<Input
							className="w-full grow rounded-sm font-light text-base sm:text-sm"
							placeholder="Enter a long URL"
							type="url"
							name="url"
						/>
						<SubmitButton
							size="icon"
							icon={<Link1Icon />}
							className="ml-1.5 grow-0 rounded-sm"
						/>
					</CreateAnonymousWhimForm>
				</div>
			</section>

			<section className="container max-w-7xl">
				<h2 className="mb-8 font-bold tracking-tighter">Why choose whim.li?</h2>
				<div
					className={cn(
						"grid grid-cols-1 justify-items-center gap-6",
						"lg:grid-cols-3"
					)}
				>
					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Simplicity</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Our interface is easy to use, making URL shortening a breeze.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Speed</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Get your shortened URL in milliseconds.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Reliability</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								We ensure your URLs are available when you need them.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Password Guard</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Ensures secure access to your links with customizable password
								protection, providing an extra layer of security.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Expiry Scheduler</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Automate link validity with an expiration date feature, allowing links
								to become inactive after a specified period.
							</CardDescription>
						</CardContent>
					</Card>

					<Card className="w-full max-w-md">
						<CardHeader>
							<CardTitle>Usage Tracker</CardTitle>
						</CardHeader>
						<CardContent>
							<CardDescription>
								Monitor link activity with a built-in usage counter, offering insights
								into how frequently your links are accessed.
							</CardDescription>
						</CardContent>
					</Card>
				</div>
			</section>
		</main>
	)
}

export default Page
