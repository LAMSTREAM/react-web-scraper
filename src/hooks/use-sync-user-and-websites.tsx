
import {useCallback, useEffect} from "react";
import {getWebsites, syncUser} from "@/lib/axios/apiServices";
import useAuthInfo from "@/hooks/use-auth-info";
import {useDispatch} from "react-redux";
import {syncUserWebsites} from "@/lib/redux/slice";

// sync user and get website of the user whenever user enter the page or login
export const useSyncUserAndWebsites = () => {
  const dispatch = useDispatch()
  const authInfo = useAuthInfo()

  const fetchData = useCallback(async ()=>{
    if(!authInfo)return;
    const {data, error} = await syncUser(authInfo);
    if(error)console.log('Sync user failed')
    if(data)console.log('Sync user succeed')

    const {data: sitesData, error: sitesError} = await getWebsites(authInfo);
    if(sitesError)console.log('Get websites failed')
    if(sitesData){
      //@ts-ignore
      dispatch(syncUserWebsites(sitesData.websites))
    }

  }, [authInfo, dispatch])

  // Fetch again when user is authenticated
  useEffect(() => {
    if (authInfo) {
      fetchData();
    }
  }, [authInfo, fetchData]);

  return;
}