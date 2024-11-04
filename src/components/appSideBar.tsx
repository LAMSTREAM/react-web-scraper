import React, {useMemo} from "react";
import {useSelector} from "react-redux";
import {PanelLeftClose, SquarePen} from "lucide-react";

import {capitalizeFirstLetter, cn} from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarHeader, SidebarMenu, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";
import Auth from "@/components/auth/auth";
import {Website} from "@/lib/types";
import {selectWebsites} from "@/lib/redux/slice";
import {groupWebsitesByDate} from "@/lib/group-websites";
import {TypographyP, TypographySmall} from "@/components/typography/Typography";
import {Link, useLocation, useParams} from "react-router-dom";


const AppSideBar = ({
  headerClassName,
  footerClassName,
}:{
  headerClassName?: string;
  footerClassName?: string;
}) => {
  const {toggleSidebar} = useSidebar()
  const location = useLocation()
  const websites = useSelector(selectWebsites)

  let id: string = '';
  if(location.pathname.startsWith('/website')){
    id = location.pathname.split('/')[2]
  }

  const groupedWebsites = useMemo(()=>{
    return groupWebsitesByDate(websites)
  }, [websites])

  return (
    <Sidebar>
      <SidebarHeader className={cn(`p-0`, headerClassName)}>
        <SidebarMenu className={`h-full`}>
          <SidebarMenuItem className={`flex justify-between items-center p-3`}>
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <PanelLeftClose />
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/`}>
                <SquarePen />
              </Link>
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <RenderWebsiteGroup currentWebsiteId={id} label="Today" websites={groupedWebsites.today} />
        <RenderWebsiteGroup currentWebsiteId={id} label="Yesterday" websites={groupedWebsites.yesterday} />
        <RenderWebsiteGroup currentWebsiteId={id} label="This Week" websites={groupedWebsites.thisWeek} />
        <RenderWebsiteGroup currentWebsiteId={id} label="This Month" websites={groupedWebsites.thisMonth} />

        {/* Render 'older' section using the same component */}
        {groupedWebsites.older.length > 0 && (
          <>
            {groupedWebsites.older.map((olderGroup) => (
              <RenderWebsiteGroup
                currentWebsiteId={id}
                key={olderGroup.date}
                label={olderGroup.date} // Use the date as the label for older groups
                websites={olderGroup.websites}
              />
            ))}
          </>
        )}
      </SidebarContent>
      <SidebarFooter className={cn("", footerClassName)}>
        <Auth />
      </SidebarFooter>
    </Sidebar>
  )
}

// Helper component to render each group
const RenderWebsiteGroup = ({
  label,
  websites,
  currentWebsiteId,
}: {
  label: string;
  websites: Website[];
  currentWebsiteId: string|undefined;
}) => {
  let id: number;
  if(currentWebsiteId === undefined){
    id = -1
  }else{
    id = parseInt(currentWebsiteId)
  }

  return (
    <>
      {websites.length > 0 && (
        <SidebarGroup>
          <SidebarGroupLabel>
            <TypographySmall>
              {capitalizeFirstLetter(label)}
            </TypographySmall>
          </SidebarGroupLabel>
          {websites.map((website) => (
            <Button asChild variant={`ghost`} key={website.index}>
              <Link
                to={`/website/${website.index}`}
                className={`h-8 items-center mb-1 hover:bg-secondary ${id === website.index && 'bg-secondary text-secondary-foreground'}`}
              >
                <SidebarGroupContent>
                  <TypographyP className={`max-w-full overflow-hidden text-ellipsis`}>
                    {website.website_url}
                  </TypographyP>
                </SidebarGroupContent>
              </Link>
            </Button>
          ))}
        </SidebarGroup>
      )}
    </>
  );
}

export default AppSideBar;