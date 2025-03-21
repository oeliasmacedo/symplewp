"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useWordPress } from "@/contexts/WordPressContext"

export function SiteSwitcher() {
  const { sites, currentSite, switchSite } = useWordPress()
  const [open, setOpen] = useState(false)

  // If no sites are connected, show a placeholder
  if (!sites.length) {
    return (
      <Button
        variant="ghost"
        className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <div className="flex items-center">
          <Globe className="mr-2 h-5 w-5" />
          <span className="font-medium">No sites connected</span>
        </div>
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <div className="flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            <span className="font-medium truncate">{currentSite?.name || sites[0].name}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Search site..." />
          <CommandEmpty>No site found.</CommandEmpty>
          <CommandGroup heading="My WordPress Sites">
            {sites.map((site) => (
              <CommandItem
                key={site.id}
                value={site.id}
                onSelect={() => {
                  switchSite(site.id)
                  setOpen(false)
                }}
              >
                <Check className={cn("mr-2 h-4 w-4", currentSite?.id === site.id ? "opacity-100" : "opacity-0")} />
                <div className="flex flex-col">
                  <span>{site.name}</span>
                  <span className="text-xs text-muted-foreground truncate">{site.url}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

