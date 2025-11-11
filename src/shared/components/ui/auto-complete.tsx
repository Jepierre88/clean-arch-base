'use client'

import { useState, useRef, useCallback, type KeyboardEvent } from "react"

import { Check } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { CommandGroup, CommandInput, CommandItem, CommandList } from "./command"
import { Command as CommandPrimitive } from "cmdk"
import { Skeleton } from "./skeleton"

export type Option = Record<"value" | "label", string> & Record<string, string>

type AutoCompleteProps = {
  options: Option[]
  emptyMessage: string
  value?: Option
  onValueChange?: (value: Option) => void
  onInputChange?: (value: string) => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
  renderOption?: (option: Option, isSelected: boolean) => React.ReactNode
}

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,
  onValueChange,
  onInputChange,
  disabled,
  isLoading = false,
  renderOption,
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [isOpen, setOpen] = useState(false)
  const [selected, setSelected] = useState<Option>(value as Option)
  const [inputValue, setInputValue] = useState<string>(value?.label || "")

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (!input) {
        return
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setOpen(true)
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === "Enter" && input.value !== "") {
        const optionToSelect = options.find(
          (option) => option.label === input.value,
        )
        if (optionToSelect) {
          setSelected(optionToSelect)
          onValueChange?.(optionToSelect)
        }
      }

      if (event.key === "Escape") {
        input.blur()
      }
    },
    [isOpen, options, onValueChange],
  )

  const handleBlur = useCallback(() => {
    setOpen(false)
    setInputValue(selected?.label)
  }, [selected])

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label)

      setSelected(selectedOption)
      onValueChange?.(selectedOption)

      // This is a hack to prevent the input from being focused after the user selects an option
      // We can call this hack: "The next tick"
      setTimeout(() => {
        inputRef?.current?.blur()
      }, 0)
    },
    [onValueChange],
  )

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={isLoading ? undefined : (value) => {
            setInputValue(value)
            onInputChange?.(value)
          }}
          onBlur={handleBlur}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            "ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          )}
        />
      </div>
      <div className="relative mt-1">
        <div
          className={cn(
            "animate-in fade-in-0 zoom-in-95 absolute top-0 z-50 w-full rounded-lg bg-popover border border-border shadow-lg",
            isOpen ? "block" : "hidden",
          )}
        >
          <CommandList className="rounded-lg max-h-48 overflow-auto p-1">
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className="p-2">
                  <Skeleton className="h-8 w-full rounded" />
                  <Skeleton className="h-8 w-full rounded mt-1" />
                  <Skeleton className="h-8 w-3/4 rounded mt-1" />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault()
                        event.stopPropagation()
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-md px-3 py-2 text-sm cursor-pointer",
                        "transition-colors duration-150 ease-out",
                        "hover:bg-muted focus:bg-muted",
                        "data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground",
                        !isSelected ? "text-popover-foreground" : "",
                      )}
                    >
                      {renderOption ? (
                        renderOption(option, isSelected)
                      ) : (
                        <>
                          <Check
                            className={cn(
                              "w-4 h-4 shrink-0 transition-opacity",
                              isSelected
                                ? "opacity-100 text-primary-foreground"
                                : "opacity-0 text-muted-foreground"
                            )}
                          />
                          <span className="truncate">{option.label}</span>
                        </>
                      )}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  )
}