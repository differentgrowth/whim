"use client"

import { useFormStatus } from "react-dom"

import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Props = ButtonProps & {
	icon?: React.ReactNode
}

export const SubmitButton = ({
	className,
	children,
	icon,
	...props
}: Props) => {
	const { pending } = useFormStatus()

	return (
		<Button
			{...props}
			className={cn(
				"[&>svg]:size-4 [&>svg]:shrink-0",
				props.size !== "icon" && "[&>svg]:ml-1.5",
				className
			)}
			type="submit"
			aria-disabled={pending}
		>
			{children}

			{pending ? (
				<ReloadIcon className="animate-spin" aria-hidden="true" />
			) : (
				icon || <ArrowRightIcon aria-hidden="true" />
			)}
		</Button>
	)
}
