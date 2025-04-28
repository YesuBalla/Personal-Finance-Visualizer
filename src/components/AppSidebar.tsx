"use client"
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions");
      setTransactions(res.data.transactions);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/'>
                <Image src='/yardsticklive_logo.jpeg' alt="logo" width={30} height={40} />
                <span>Yardstick</span>
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
                <Sheet>
                  <SheetTrigger asChild>
                    <SidebarMenuButton>
                      <Plus />
                      Add Transaction
                    </SidebarMenuButton>
                  </SheetTrigger>
                  <AddTransaction onTransactionAdded={fetchTransactions} />
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
                    <Sheet>
                      <SheetTrigger asChild>
                        <SidebarMenuButton>
                          <Plus />
                          Add Category
                        </SidebarMenuButton>
                      </SheetTrigger>
                      <AddCategory />
                    </Sheet>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        {/* NESTED */}
        {/* <SidebarGroup>
          <SidebarGroupLabel>
            Nested Items
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/#'>
                    <Projector />
                    See all Transactions
                  </Link>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Transaction
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton asChild>
                      <Link href='/#'>
                        <Plus />
                        Add Category
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Yesu Balla <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar