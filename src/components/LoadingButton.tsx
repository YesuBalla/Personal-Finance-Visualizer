import { Button } from "./ui/button";

export default function LoadingButton({ pending, children }: { pending: boolean, children: React.ReactNode }) {
    return (
        <Button className="w-full" type="submit" disabled={pending}>
            {pending ?
                (<div className="flex items-center justify-center">
                    <svg
                        className="animate-spin h-5 w-5 text-white mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                    </svg>
                </div>) : (children)
            }
        </Button>
    )
}