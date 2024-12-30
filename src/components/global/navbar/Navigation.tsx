'use client'
import * as React from "react"
import Link from "next/link"
 
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"



export default function Navigation() {
    return (
        <NavigationMenu>
          <NavigationMenuList>
          <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Find Work</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[300px] grid-cols-1 ">
                 <li>
                    <Link href="/jobs" passHref>
                      <div className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Browse Jobs</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Find the right job for you
                        </p>
                      </div>
                    </Link>
                  </li>
                 
          
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                 About us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )
    }
     
    