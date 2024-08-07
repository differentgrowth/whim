import { cache } from 'react'

import { LockClosedIcon, LockOpen2Icon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { CopyWhim } from "@/components/copy-whim"
import { DeleteWhim } from "@/components/delete-whim"
import { Badge } from "@/components/ui/badge"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/ui/tooltip"
import { getCustomerWhims } from "@/lib/db"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

type Props = {
	customerId: string
}

export const revalidate = 180

const getData = cache(async ({ customerId }: { customerId: string }) => {
	try {
		const whims = await getCustomerWhims({ customer_id: customerId })

		return {
			whims
		}
	} catch (error) {
		return {
			whims: []
		}
	}
})

export const Whims = async ({ customerId }: Props) => {
	const { whims } = await getData({ customerId })

	return (
		<section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
			{whims.map((whim, index) => (
				<div
					className={cn(
						"w-full rounded-xl border bg-card p-3 text-card-foreground shadow",
						index % 2 === 0 ? "justify-self-end" : "justify-self-start"
					)}
					key={whim.id}
				>
					<div className="flex w-full flex-row justify-between border-b pb-1.5">
						<h3 className="grow font-semibold leading-none tracking-tight">
							{whim.name}
						</h3>
						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger>
									<span className="rounded border px-1.5 text-sm">{whim.counter}</span>
								</TooltipTrigger>
								<TooltipContent>
									<p>Visitas: {whim.counter}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>

					<div className="w-full space-y-3 justify-self-start">
						<div>
							<p>
								<span className="text-muted-foreground text-sm">whim: </span>
								{whim.shorted_url}
							</p>
						</div>

						<div className="flex w-full flex-col flex-wrap items-start gap-3 sm:flex-row sm:items-center">
							<Badge variant="outline">
								{format(whim.created_at, "LLL dd, y - HH:mm")}
							</Badge>
							{whim.expiration ? (
								<Badge variant="outline">{format(whim.expiration, "LLL dd, y")}</Badge>
							) : null}
						</div>

						<div className="truncate text-muted-foreground text-sm italic">
							{whim.url}
						</div>
					</div>

					<div
						className={cn(
							"mt-3 justify-self-center border-t pt-3",
							"flex items-center justify-between space-x-3"
						)}
					>
						<div className="flex grow items-center justify-start space-x-3">
							<CopyWhim
								size="icon"
								align="start"
								whimUrl={whim.shorted_url}
								secretKey={whim.secret_key}
							/>
							<DeleteWhim whimId={whim.id} customerId={customerId} />
						</div>

						<TooltipProvider>
							<Tooltip>
								<TooltipTrigger
									className={cn(
										buttonVariants({
											variant: whim.password ? "default" : "outline",
											size: "icon"
										}),
										"hover:bg-background"
									)}
								>
									{whim.password ? (
										<LockClosedIcon className="size-4" />
									) : (
										<LockOpen2Icon className="size-4" />
									)}
								</TooltipTrigger>
								<TooltipContent>
									<p>{whim.password ? "Protected" : "Public"}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			))}
		</section>
	)
}
