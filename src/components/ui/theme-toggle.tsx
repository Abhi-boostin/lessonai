"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  const handleThemeChange = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const transition = document.createElement('div')
    transition.className = 'theme-transition'
    transition.style.setProperty('--theme-transition-top', `${e.clientY}px`)
    transition.style.setProperty('--theme-transition-left', `${e.clientX}px`)
    document.body.appendChild(transition)
    
    requestAnimationFrame(() => {
      transition.classList.add('active')
      setTheme(theme === "light" ? "dark" : "light")
      
      setTimeout(() => {
        document.body.removeChild(transition)
      }, 1000)
    })
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleThemeChange}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
} 