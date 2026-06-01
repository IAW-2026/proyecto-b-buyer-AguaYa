import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  return <SignUp forceRedirectUrl= {`${baseUrl}/auth/create-buyer` }/>;
}

