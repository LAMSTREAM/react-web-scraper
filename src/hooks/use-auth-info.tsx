// src/hooks/useAuth.js
import {useAuth0} from '@auth0/auth0-react';
import {useEffect, useState} from "react";

// use for generate auth header to insert in axios header
const useAuthInfo = (): AuthInfo | null => {
  const [auth, setAuth] = useState<AuthInfo|null>(null)
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(()=>{
    if(isAuthenticated){
      getAccessTokenSilently()
        .then(token => {
          setAuth({
            Authorization: `Bearer ${token}`,
            'Auth0-sub': user?.sub || '',
            'Auth0-email': user?.email || ''
          })
          return;
        })
        .catch(error => {
          console.log(error)
        })
    }
    setAuth(null)
    return
  }, [getAccessTokenSilently, isAuthenticated, user?.email, user?.sub])

  return auth;
};

export type AuthInfo = {
  'Authorization': string;
  'Auth0-sub': string;
  'Auth0-email': string;
}

export default useAuthInfo;
