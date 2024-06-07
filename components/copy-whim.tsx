"use client";

import { useEffect, useState } from "react";

import {
  CheckCircledIcon,
  CopyIcon,
  DoubleArrowRightIcon,
  InputIcon,
  SliderIcon,
} from "@radix-ui/react-icons";
import { toast } from "sonner";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = ButtonProps & {
  whimUrl: string;
  secretKey: string | null;
  align?: "center" | "end" | "start";
};

export const CopyWhim = ({
  whimUrl,
  variant = "ghost",
  secretKey,
  align = "end",
  ...props
}: Props) => {
  const [isCopied, setIsCopied] = useState({
    link: false,
    clean: false,
    automatic: false,
  });
  const handleCopy = async (whim: string) => {
    navigator.clipboard.writeText(whim);
  };

  useEffect(() => {
    if (!isCopied) {
      return;
    }

    const timer = setTimeout(() => {
      setIsCopied({ link: false, clean: false, automatic: false });
    }, 3000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} {...props}>
          <CopyIcon className="size-4 shrink-0" aria-hidden="true" />
          <span className="sr-only">Copy Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuLabel>Copy Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setIsCopied((prev) => ({ ...prev, link: true }));
            handleCopy(`${location.origin}/${whimUrl}`);
            toast.info(
              `${secretKey ? "Protected whim" : "Whim"} copied with link style`,
              {
                description: `${location.origin}/${whimUrl}`,
                className: "bg-muted",
              },
            );
          }}
        >
          Link
          {isCopied.link ? (
            <CheckCircledIcon className="ml-auto size-4" aria-hidden="true" />
          ) : (
            <InputIcon className="ml-auto size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Link copy</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setIsCopied((prev) => ({ ...prev, clean: true }));
            handleCopy(`${location.host}/${whimUrl}`);
            toast.info(
              `${
                secretKey ? "Protected whim" : "Whim"
              } copied with clean style`,
              {
                description: `${location.host}/${whimUrl}`,
                className: "bg-muted",
              },
            );
          }}
        >
          Clean
          {isCopied.clean ? (
            <CheckCircledIcon className="ml-auto size-4" aria-hidden="true" />
          ) : (
            <SliderIcon className="ml-auto size-4" aria-hidden="true" />
          )}
          <span className="sr-only">Clean copy</span>
        </DropdownMenuItem>
        {secretKey ? (
          <>
            <DropdownMenuItem
              onClick={() => {
                setIsCopied((prev) => ({ ...prev, automatic: true }));
                handleCopy(`${location.host}/${whimUrl}?sk=${secretKey}`);
                toast.warning("Automatic whim copied", {
                  description: `${location.host}/${whimUrl}?sk=${secretKey}`,
                  className: "bg-muted",
                });
              }}
            >
              Automatic
              {isCopied.automatic ? (
                <CheckCircledIcon
                  className="ml-auto size-4"
                  aria-hidden="true"
                />
              ) : (
                <DoubleArrowRightIcon
                  className="ml-auto size-4"
                  aria-hidden="true"
                />
              )}
              <span className="sr-only">Clean copy</span>
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
