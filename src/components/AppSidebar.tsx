"use client"

import { useState } from "react";
import { BadgeIndianRupee, BanknoteArrowDown, BriefcaseBusiness, ChevronDown, ChevronUp, LayoutDashboard, Plus, Projector, Sparkles, User2 } from "lucide-react"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarSeparator } from "./ui/sidebar"
import Link from "next/link"
import Image from "next/image"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible"
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import AddTransaction from "./AddTransaction"
import AddCategory from "./AddCategory"
import { useAppStore } from "@/stores/appStore";
import { handleSignOut } from "@/app/actions/authActions";
import { LogOut, Settings, User } from 'lucide-react'


const items = [
  {
    title: 'Dashboard',
    url: '/',
    icon: LayoutDashboard,
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: BadgeIndianRupee,
  },
  {
    title: 'Expenses',
    url: '/expenses',
    icon: BanknoteArrowDown,
  },
  {
    title: 'Budget',
    url: '/budget',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Insights',
    url: '/insights',
    icon: Sparkles,
  },
]
const AppSidebar = () => {
  const [transactionSheetOpen, setTransactionSheetOpen] = useState(false);
  const [categorySheetOpen, setCategorySheetOpen] = useState(false);
  const user = useAppStore((state) => state.user);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/' className="flex items-center">
                <Image
                  src='https://ik.imagekit.io/fmyeeukr7/finance-logo-simple-golden-color-concept-template-2R454WX-removebg-preview.png'
                  alt="logo"
                  width={70}
                  height={80}
                />
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                  FinVisual
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>
            Transactions
          </SidebarGroupLabel>
          <SidebarGroupAction>
            <Plus /> <span className="sr-only">Add Transaction</span>
          </SidebarGroupAction>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/#'>
                    <Projector />
                    See all Transactions
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Sheet open={transactionSheetOpen} onOpenChange={setTransactionSheetOpen}>
                  <SheetTrigger asChild>
                    <SidebarMenuButton onClick={() => setTransactionSheetOpen(true)}>
                      <Plus />
                      Add Transaction
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <AddTransaction onClose={() => setTransactionSheetOpen(false)} />
                </Sheet>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* COLLAPSABLE */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Cotegories
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href='/#'>
                        <Projector />
                        See all Categories
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <Sheet open={categorySheetOpen} onOpenChange={setCategorySheetOpen}>
                      <SheetTrigger asChild>
                        <SidebarMenuButton onClick={() => setCategorySheetOpen(true)}>
                          <Plus />
                          Add Category
                        </SidebarMenuButton>
                      </SheetTrigger>
                      <AddCategory onClose={() => setCategorySheetOpen(false)} />
                    </Sheet>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {user?.name} <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className='h-[1.2rem] w-[1.2rem] mr-2' />
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
                  Settings
                </DropdownMenuItem>
                {/* Logout Button */}
                <DropdownMenuItem variant='destructive' onClick={handleSignOut}>
                  <LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar