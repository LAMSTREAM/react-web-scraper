import React, {useCallback, useEffect} from "react";
import useAuthInfo from "@/hooks/use-auth-info";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getWebsiteByIndex} from "@/lib/axios/apiServices";
import {selectWebsiteByWebsiteIndex, syncWebsiteWithAnalysis} from "@/lib/redux/slice";
import {Card} from "@/components/ui/card";
import {useIsMobile} from "@/hooks/use-mobile";
import {useAuth0} from "@auth0/auth0-react";
import {TypographyP} from "@/components/typography/Typography";

const MainWithWebsite = ({className}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const {user} = useAuth0()
  const isMobile = useIsMobile()
  const authInfo = useAuthInfo()
  const dispatch = useDispatch()
  const {id} = useParams<{id: string}>()
  //@ts-ignore
  const website = useSelector(state => selectWebsiteByWebsiteIndex(state, id));

  const fetchData = useCallback(async ()=>{
    if(!authInfo || id === undefined)return;
    const {data, error} = await getWebsiteByIndex(authInfo, id);
    if(error)console.log('Get website by index failed');
    if(data){
      //@ts-ignore
      dispatch(syncWebsiteWithAnalysis(data.website))
    }
  }, [authInfo, dispatch, id])

  useEffect(() => {
    if(id === undefined)return;
    fetchData()
  }, [fetchData, id])

  if(!website || id === undefined){
    return <></>
  }

  return (
    <div className={`pb-[--header-height] w-full h-full flex flex-col items-center justify-center`}>
      {website && (
        <div className={`p-4 w-full flex-grow overflow-y-auto ${isMobile ? 'no-scrollbar' : 'light-scrollbar'}`}>
          {/* User Side: Website URL */}
          <div className="mb-4 flex items-start justify-end"> {/* Added justify-end to align content to the right */}
            <div className="flex-grow text-right"> {/* User content is right-aligned */}
              <TypographyP>You:</TypographyP>
              <Card className="bg-background p-4 rounded-lg inline-block">
                <p>{website.website_url}</p>
              </Card>
            </div>
            <img
              src={user?.picture} // User avatar on the right
              alt="User Avatar"
              className="w-8 h-8 rounded-full ml-2"
            />
          </div>

          {/* AI Side: Website Preview and Questions */}
          <div className="mt-4 flex items-start">
            <img
              src="/logo.png" // Replace with the path to your AI avatar image
              alt="AI Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="flex-grow">
              <TypographyP>Scraper:</TypographyP>
              <hr />
              {website.website_preview && (
                <div className="my-2">
                <h4 className="text-md font-medium">Website Preview:</h4>
                  <img
                    src={`data:image/png;base64,${website.website_preview}`}
                    alt="Website Preview"
                    style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
                  />
                </div>
              )}
              <hr />
              <div className="my-4">
                {website.questions && website.questions.map((question, index) => {
                  const item = JSON.parse(question);
                  console.log(item.options)
                  return (
                    <div key={index} className="mt-2">
                      <TypographyP>{item.question}</TypographyP>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        { //@ts-ignore
                          item.options.map((option, optionIndex) => (
                          <Card key={optionIndex} className="bg-background hover:bg-secondary p-2 rounded-lg shadow">
                            {option}
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainWithWebsite;