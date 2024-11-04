import React from "react";
import {PanelLeftOpen} from "lucide-react";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {useSidebar} from "@/components/ui/sidebar";
import {ThemeModeToggle} from "@/components/theme/theme-mode-toggle";
import {useIsMobile} from "@/hooks/use-mobile";

const Header = ({
  className,
}: {
  className?: string;
}) => {
  const isMobile = useIsMobile()
  const {state, toggleSidebar} = useSidebar()

  return (
    <header className={cn("flex justify-between items-center w-full p-3", className)}>
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className={`${(!isMobile && state === "expanded") && 'invisible'}`}>
        <PanelLeftOpen />
      </Button>
      <ThemeModeToggle />
    </header>
  )
}

export default Header;