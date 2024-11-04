import React from "react";
import {LogIn} from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button} from "@/components/ui/button";
import {TypographyP} from "@/components/typography/Typography";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button
      variant={`outline`}
      className={`flex w-full h-full content-center space-x-2`}
      onClick={() => loginWithRedirect()}
    >
      <LogIn className="h-12 w-12 rounded-full"/>
      <TypographyP>
        Log in to explore more features...
      </TypographyP>
    </Button>
  )
};

export default LoginButton;