"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EmojiAvatar } from "@/components/shared/emoji-avatar"

type ProjectType = {
  title: string;
  slug: string;
  color: string;
};

const projects: ProjectType[] = [
  {
    title: "Project 1",
    slug: "project-number-one",
    color: "bg-red-500",
  },
  {
    title: "Project 2",
    slug: "project-number-two",
    color: "bg-blue-500",
  },
];
const selected: ProjectType = projects[1];

export default function ProjectSwitcher({
  large = false,
}: {
  large?: boolean;
}) {
  const { data: session, status } = useSession();
  const [openPopover, setOpenPopover] = useState(false);

  if (!projects || status === "loading") {
    return <ProjectSwitcherPlaceholder />;
  }

  return (
    <div>
      <Popover open={openPopover} onOpenChange={setOpenPopover}>
        <PopoverTrigger>
          <Button
            className="h-8 px-2"
            variant={openPopover ? "secondary" : "ghost"}
            onClick={() => setOpenPopover(!openPopover)}
          >
            <div className="flex items-center space-x-3 pr-2">
              <div
                className={cn(
                  "size-3 shrink-0 rounded-full",
                  selected.color,
                )}
              />
              <div className="flex items-center space-x-3">
                <span
                  className={cn(
                    "inline-block truncate text-sm font-medium xl:max-w-[120px]",
                    large ? "w-full" : "max-w-[80px]",
                  )}
                >
                  {selected.slug}
                </span>
              </div>
            </div>
            <ChevronsUpDown
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="max-w-60 p-2">
          <ProjectList
            selected={selected}
            projects={projects}
            setOpenPopover={setOpenPopover}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

function ProjectList({
  selected,
  projects,
  setOpenPopover,
}: {
  selected: ProjectType;
  projects: ProjectType[];
  setOpenPopover: (open: boolean) => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [newProjectEmoji, setNewProjectEmoji] = useState("🚀");

  return (
    <div className="flex flex-col gap-1">
      {projects.map(({ slug, color }) => (
        <Link
          key={slug}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "relative flex h-9 items-center gap-3 p-3 text-muted-foreground hover:text-foreground",
          )}
          href="#"
          onClick={() => setOpenPopover(false)}
        >
          <div className={cn("size-3 shrink-0 rounded-full", color)} />
          <span
            className={`flex-1 truncate text-sm ${selected.slug === slug
              ? "font-medium text-foreground"
              : "font-normal"
              }`}
          >
            {slug}
          </span>
          {selected.slug === slug && (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-foreground">
              <Check size={18} aria-hidden="true" />
            </span>
          )}
        </Link>
      ))}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="relative flex h-9 items-center justify-center gap-2 p-2"
            onClick={(e) => {
              // Keep popover open if possible? No, usually we want to close popover and open dialog
              // But popover is controlled by parent.
              // We can close popover and then open dialog, but we need state for dialog.
              // Actually, if we put Dialog inside Popover Content, it might get clipped or behave weirdly.
              // Better to put Dialog adjacent or handle state.
              // Let's keep it simple: clicking button opens Dialog.
              // IMPORTANT: We need to prevent the popover from closing OR make sure Dialog state persists.
              // shadcn popover closes on outside click.
              // If we render Dialog here, it will be unmounted when Popover closes.
              // Strategy: Use a parent state or prevent popover close.
              // However, simple solution: When button clicked, keep popover open? No.
              // Alternative: Move Dialog outside of ProjectList, to ProjectSwitcher.
              // But ProjectList is simpler to modify.
              // Let's try handling it inline. If we set OpenDialog(true), we should ensure Popover stays?
              // Actually, usually you close the picker popover and open the modal.
              // Since `setOpenPopover(false)` unmounts `ProjectList`, `openDialog` state will be lost.
              // FIX: Move Dialog state to `ProjectSwitcher`.
            }}
          >
            <Plus size={18} className="absolute left-2.5 top-2" />
            <span className="flex-1 truncate text-center">New Project</span>
          </Button>
        </DialogTrigger>
        {/* We cannot render Dialog content here if Popover closes. */}
        {/* So we MUST move state up. I will do that in next step. */}
        {/* For now, just placeholder to make sure I am replacing correctly. */}
      </Dialog>
    </div>
  );
}

function ProjectSwitcherPlaceholder() {
  return (
    <div className="flex animate-pulse items-center space-x-1.5 rounded-lg px-1.5 py-2 sm:w-60">
      <div className="h-8 w-36 animate-pulse rounded-md bg-muted xl:w-[180px]" />
    </div>
  );
}
