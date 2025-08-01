'use client';

import Link from 'next/link'
import { LogOut, Moon, Settings, Sun, User } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useTheme } from 'next-themes'
import { SidebarTrigger } from './ui/sidebar';
import { handleSignOut } from '@/app/actions/authActions';
import { useSession } from 'next-auth/react';


const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();

    const avatarUrl = session?.user?.image || 'https://placehold.co/40x40/E5E7EB/4B5563?text=CN';

    const userInitials = session?.user?.name
        ? session.user.name.split(' ').map((n) => n[0]).join('')
        : 'CN';

    return (
        <nav className='p-4 flex items-center justify-between sticky top-0 bg-background z-10'>
            {/* Left */}
            <SidebarTrigger />
            {/* Right */}
            <div className='flex items-center gap-4'>
                <Link href='/'>Dashboard</Link>
                {/* THEME MENU */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* USER MENU */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src={avatarUrl} />
                            <AvatarFallback>{userInitials}</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent sideOffset={10}>
                        <DropdownMenuLabel>
                            My Account
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <User className='h-[1.2rem] w-[1.2rem] mr-2' />
                            Profile
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
            </div>
        </nav>
    )
}

export default Navbar