"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useCreateQueryString } from "@/hooks/use-create-query-string";

export const DatePicker = () => {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get("date")?.toString();

  const createQueryString = useCreateQueryString(searchParams);

  return (
    <>
      <input
        type="hidden"
        name="expiration"
        value={searchParams.get("date")?.toString() || ""}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full items-center justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-1.5 size-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date ? new Date(date) : undefined}
            onSelect={(val) => {
              const newParams = createQueryString("date", val?.toISOString());
              push(`${pathname}?${newParams}`);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </>
  );
};
