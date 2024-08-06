"use client"

import { useState } from "react"

import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Props = {
	name: string
	autocomplete?: string
}
export const InputPassword = ({ name }: Props) => {
	const [isOpen, setIsOpen] = useState(false)
	return (
		<div className="flex w-full items-center space-x-1.5">
			<Input
				type={isOpen ? "text" : "password"}
				placeholder="***"
				name={name}
				id={name}
				className="grow"
			/>
			<Button
				type="button"
				variant="outline"
				size="icon"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{isOpen ? (
					<EyeOpenIcon className="size-4" />
				) : (
					<EyeNoneIcon className="size-4" />
				)}
			</Button>
		</div>
	)
}
