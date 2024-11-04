import React, {useCallback, useState} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import useAuthInfo from "@/hooks/use-auth-info";
import {Input} from "@/components/ui/input";
import {useNavigate} from "react-router-dom";
import {createWebsite} from "@/lib/axios/apiServices";
import {TypographyP} from "@/components/typography/Typography";

const Main = ({className}: React.HtmlHTMLAttributes<HTMLDivElement>) => {
  const authInfo = useAuthInfo()
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const submitWebsite = useCallback(async (url: string)=>{
    if(!authInfo)return;
    const {data, error} = await createWebsite(authInfo, url);
    if(error){
      alert('Create website failed')
      console.log('Create website failed');
    }
    if(data){
      //@ts-ignore
      const website_index = data.website.index
      console.log('Create webiste success, id: :', website_index)
      navigate(`/website/${website_index}`)
    }
    setIsSubmitting(false)
  }, [authInfo, navigate])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true)
    // Redirect to another page or handle the URL as needed
    submitWebsite(url)
  };

  return (
    <main
      className={cn("w-full h-full flex flex-col items-center justify-center text-center space-y-4 bg-gray-100 dark:bg-gray-900", className)}>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Enter Website URL
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="url"
          value={url}
          onChange={handleInputChange}
          placeholder="https://example.com"
          required
          className="w-80" // Adjust the width as needed
        />
        <Button type="submit" className="w-80">
          Submit
        </Button>
      </form>
      <TypographyP>{isSubmitting && 'Processing...'}</TypographyP>
    </main>
  )
}

export default Main;