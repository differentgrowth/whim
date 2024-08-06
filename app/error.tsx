"use client" // Error components must be Client Components

import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { useEffect } from "react"

const Page = ({
	error,
	reset
}: {
	error: Error & {
		digest?: string
	}
	reset: () => void
}) => {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error)
	}, [error])

	if (process.env.NODE_ENV === "production") {
		notFound()
	}

	return (
		<div className="mx-auto mt-3 max-w-lg space-y-6">
			<h2>Something went wrong!</h2>
			<Button
				variant="outline"
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</Button>
		</div>
	)
}

export default Page
