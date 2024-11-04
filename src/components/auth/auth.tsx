import React from "react";
import {useAuth0} from "@auth0/auth0-react";
import LoginButton from "@/components/auth/login";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Skeleton} from "@/components/ui/skeleton";
import {CircleX} from "lucide-react";
import {TypographyP, TypographySmall} from "@/components/typography/Typography";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const Auth = () => {
  const {error, isLoading, user, logout} = useAuth0()
  let slot;

  if (isLoading) slot = <Loading />;
  if (error) slot = <Error />;
  if (!user) slot = <LoginButton/>;
  else {
    slot = (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex w-full h-full items-center space-x-2">
            <Avatar className="h-12 w-12 select-none">
              <AvatarImage src={user?.picture}/>
              <AvatarFallback>{user?.name}</AvatarFallback>
            </Avatar>
            <div className="h-full w-[70%] items-center">
              <TypographyP>{user?.name}</TypographyP>
              <TypographyP>{user?.email}</TypographyP>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={`w-10`}>
          <DropdownMenuItem
            onClick={() => {
              logout({ logoutParams: { returnTo: window.location.origin }})
                .then(()=>{
                  window.location.reload()
                })
            }}
          >
            <p className={`mx-auto`}>Log out</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>


    )
  }

  return (
    <div className={`w-full h-full`}>
      {slot}
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex w-full h-full items-center space-x-2">
      <Skeleton className="h-12 w-12 rounded-full"/>
      <div className="space-y-2 h-full w-[70%] items-center">
        <Skeleton className="h-4 w-[70%]"/>
        <Skeleton className="h-4 w-[35%]"/>
      </div>
    </div>
  )
}

const Error = () => {
  return (
    <div className={`flex w-full h-full items-center space-x-2`}>
      <CircleX className={`h-10 w-10 text-red-600`}/>
      <div className="h-full w-[70%] content-center">
        <TypographyP>Error</TypographyP>
        <TypographySmall>Sorry, something went wrong.</TypographySmall>
      </div>
    </div>
  )
}

export default Auth;