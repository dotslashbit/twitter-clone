import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex h-screen items-center justify-around gap-10 mx-20">
      <div className="flex flex-col items-center justify-center flex-1">
        <svg
          width="300"
          height="300.251"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
          />
        </svg>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <SignUp redirectUrl="/profile" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
