interface SignUpResponse {
    success: boolean
    message: string
}

interface SignInResponse {
    success: boolean;
    message?: string;
    errorType?: "CredentialsSignin" | "OAuthAccountExists" | "OAuthAccountNotLinked" | "InvalidPassword" | "UserNotFound" | "UnknownError";
}