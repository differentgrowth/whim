import type { ReadonlyURLSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useCreateQueryString = (searchParams: ReadonlyURLSearchParams) => {
	return useCallback(
		(name: string, value?: string) => {
			const params = new URLSearchParams(searchParams.toString())

			if (value) {
				params.set(name, value)
			} else {
				params.delete(name)
			}

			return params.toString()
		},
		[searchParams]
	)
}
