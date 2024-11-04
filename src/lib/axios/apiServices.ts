

import {AuthInfo} from "@/hooks/use-auth-info";
import {callExternalApi} from "@/lib/axios/externalApiServices";


export const syncUser = (authInfo: AuthInfo) => {
  const config = {
    url: '/user/sync-user',
    method: "post",
    headers: {
      'Authorization': authInfo.Authorization
    },
    data: {
      'Auth0-sub': authInfo["Auth0-sub"],
      'Auth0-email': authInfo["Auth0-email"]
    }
  }
  return callExternalApi({config})
};

export const getWebsites = (authInfo: AuthInfo) => {
  const config = {
    url: '/website/get-websites',
    method: "post",
    headers: {
      'Authorization': authInfo.Authorization
    },
    data: {
      'Auth0-sub': authInfo["Auth0-sub"],
      'Auth0-email': authInfo["Auth0-email"]
    }
  }
  return callExternalApi({config})
}

export const getWebsiteByIndex = (authInfo: AuthInfo, websiteIndex: string) => {
  const config = {
    url: '/website/get-website-by-index',
    method: "post",
    headers: {
      'Authorization': authInfo.Authorization
    },
    data: {
      'Auth0-sub': authInfo["Auth0-sub"],
      'Auth0-email': authInfo["Auth0-email"],
      'index': websiteIndex
    }
  }
  return callExternalApi({config})
}

export const createWebsite = (authInfo: AuthInfo, websiteUrl: string) => {
  const config = {
    url: '/website/create-website',
    method: "post",
    headers: {
      'Authorization': authInfo.Authorization
    },
    data: {
      'Auth0-sub': authInfo["Auth0-sub"],
      'Auth0-email': authInfo["Auth0-email"],
      'website_url': websiteUrl
    }
  }
  return callExternalApi({config})
}