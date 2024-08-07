"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"

import { toast } from "sonner"

import { CopyWhim } from "@/components/copy-whim"
import type { AnonymousState, State } from "@/definitions/actions"

type Props = Omit<React.FormHTMLAttributes<HTMLFormElement>, "action"> & {
	action: (state: State | undefined, formData: FormData) => Promise<State>
	children: React.ReactNode
}

export const ActionForm = ({ action, children, ...props }: Props) => {
	const { push } = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const [state, formAction] = useFormState(action, undefined)
	const formRef = useRef<HTMLFormElement>(null)

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (state?.type !== "success") return
		formRef.current?.reset()
		searchParams.size && push(pathname)
	}, [state, pathname])

	useEffect(() => {
		if (!state?.type) return
		toast[state.type](state?.message)
	}, [state])

	return (
		<>
			<form action={formAction} ref={formRef} {...props}>
				{children}
			</form>
		</>
	)
}

type AnonymousFormProps = Omit<
	React.FormHTMLAttributes<HTMLFormElement>,
	"action"
> & {
	action: (
		state: AnonymousState | undefined,
		formData: FormData
	) => Promise<AnonymousState>
	children: React.ReactNode
}

export const CreateAnonymousWhimForm = ({
	action,
	children,
	...props
}: AnonymousFormProps) => {
	const [state, formAction] = useFormState(action, undefined)

	useEffect(() => {
		if (!state?.type) return
		toast[state.type](state?.message)
	}, [state])

	return (
		<>
			<form action={formAction} {...props}>
				{children}
			</form>

			{state?.shorted_url ? (
				<div className="flex w-full max-w-2xl flex-row items-center rounded-sm">
					<span className="h-9 grow rounded-sm border bg-card px-3 py-1 text-card-foreground shadow">
						{`whim.li/${state.shorted_url}`}
					</span>

					<CopyWhim
						size="icon"
						variant="default"
						className="ml-1.5 grow-0 rounded-sm"
						whimUrl={state.shorted_url}
						secretKey={null}
					/>
				</div>
			) : null}
		</>
	)
}
