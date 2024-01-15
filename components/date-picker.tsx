"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const DatePicker = () => {
  const [ date, setDate ] = useState<Date>();

  return (
    <>
      <input
        type="hidden"
        name="expiration"
        value={ date?.toISOString() || '' }
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={ cn(
              "w-full items-center justify-start text-left font-normal",
              !date && "text-muted-foreground"
            ) }
          >
            <CalendarIcon className="mr-1.5 size-4" />
            { date
              ? format( date, "PPP" )
              : <span>Pick a date</span> }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={ date }
            onSelect={ setDate }
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
