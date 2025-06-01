"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  BookOpen,
  CheckSquare,
  ChevronDown,
  ClipboardList,
  Home,
  Lightbulb,
  LogOut,
  Settings,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [userType, setUserType] = useState<string | null>(null)

  useEffect(() => {
    // Get user type from sessionStorage
    const storedUserType = sessionStorage.getItem("userType")
    setUserType(storedUserType)
  }, [])

  const isActive = (path: string) => pathname === path

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-between p-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <BookOpen className="h-6 w-6" />
              <span className="text-lg">EduGestão</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Principal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
                      <Link href="/dashboard">
                        <Home className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/okrs")}>
                      <Link href="/okrs">
                        <BarChart3 className="h-5 w-5" />
                        <span>OKRs</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/indicators")}>
                      <Link href="/indicators">
                        <ClipboardList className="h-5 w-5" />
                        <span>Indicadores</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/action-plans")}>
                      <Link href="/action-plans">
                        <CheckSquare className="h-5 w-5" />
                        <span>Planos de Ação</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/best-practices")}>
                      <Link href="/best-practices">
                        <Lightbulb className="h-5 w-5" />
                        <span>Boas Práticas</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            {userType === "gpa" && (
              <SidebarGroup>
                <SidebarGroupLabel>Administração</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
                        <Link href="/admin/users">
                          <User className="h-5 w-5" />
                          <span>Usuários</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild isActive={isActive("/admin/settings")}>
                        <Link href="/admin/settings">
                          <Settings className="h-5 w-5" />
                          <span>Configurações</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </SidebarContent>
          <SidebarFooter className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  <span>{userType === "gpa" ? "Usuário GPA" : "Usuário Escola"}</span>
                  <ChevronDown className="ml-auto h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <header className="flex h-16 items-center border-b px-6">
            <SidebarTrigger />
            <div className="ml-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {userType === "gpa" ? "Visão GPA" : "Escola Municipal João da Silva"}
              </span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    Filtros
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Período: 2024</DropdownMenuItem>
                  <DropdownMenuItem>Disciplina: Todas</DropdownMenuItem>
                  {userType === "gpa" && <DropdownMenuItem>Unidade: Todas</DropdownMenuItem>}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto bg-slate-50 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
