// Sidebar component
"use client";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@repo/ui/components/ui/sidebar";
import { ViewType } from "@/types/types";
import { Input } from "@repo/ui/components/ui/input";
import { Button } from "@repo/ui/components/ui/button";
import {
  BrickWallIcon,
  Check,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Layout,
  LayoutDashboard,
  Link2,
  LogOut,
  MessageSquare,
  Pencil,
  Share2,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface ReviewSidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  shareExpanded: boolean;
  toggleShareExpand: () => void;
  templateId?: string;
}

export default function ReviewSidebar({
  activeView,
  setActiveView,
  shareExpanded,
  toggleShareExpand,
  templateId,
}: ReviewSidebarProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`http://localhost:3001/r/${templateId}`);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Sidebar className="border-r border-gray-800 bg-black h-full flex flex-col">
      <SidebarHeader className="border-b border-gray-800 h-14  px-4 bg-gradient-to-r from-zinc-900 to-black">
        <Link href={"/"}>
          <h2 className="text-xl font-semibold flex items-center pt-1 text-yellow-500">
            <Layout className="mr-2 h-4 w-4" /> ReviewSnap
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard menu item */}
              <SidebarMenuItem>
                <Link href="/dashboard" className="w-full">
                  <SidebarMenuButton className="w-full hover:bg-zinc-800/70">
                    <div className="flex items-center">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </div>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>

              {/* Divider */}
              <div className="my-2 border-t border-gray-800"></div>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("reviews")}
                  className={activeView === "reviews"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "hover:bg-zinc-800/70"}
                >
                  <div className="flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Reviews</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("integrations")}
                  className={activeView === "integrations"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "hover:bg-zinc-800/70"}
                >
                  <div className="flex items-center">
                    <Link2 className="mr-2 h-4 w-4" />
                    <span>Integrations</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem className="flex flex-col">
                <SidebarMenuButton
                  onClick={toggleShareExpand}
                  className={activeView === "share"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "hover:bg-zinc-800/70"}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Share</span>
                    </div>
                    {shareExpanded
                      ? <ChevronUp className="h-4 w-4" />
                      : <ChevronDown className="h-4 w-4" />}
                  </div>
                </SidebarMenuButton>
                {shareExpanded && (
                  <ShareExpander
                    templateId={templateId}
                    copySuccess={copySuccess}
                    handleCopyLink={handleCopyLink}
                    setActiveView={setActiveView}
                  />
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("wallOfLove")}
                  className={activeView === "wallOfLove"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "hover:bg-zinc-800/70"}
                >
                  <div className="flex items-center">
                    <BrickWallIcon className="mr-2 h-4 w-4" />
                    <span>Wall of Love</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setActiveView("editTemplate")}
                  className={activeView === "editTemplate"
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "hover:bg-zinc-800/70"}
                >
                  <div className="flex items-center">
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit Template</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Sign out footer */}
      <SidebarFooter className="border-t border-gray-800 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-400 hover:text-white hover:bg-zinc-800/70"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

// Share expander component
function ShareExpander({
  templateId,
  copySuccess,
  handleCopyLink,
  setActiveView,
}: {
  templateId?: string;
  copySuccess: boolean;
  handleCopyLink: () => void;
  setActiveView: (view: ViewType) => void;
}) {
  return (
    <div className="mt-2 px-2 py-2 bg-zinc-800/50 rounded-md border border-yellow-500/10">
      <div className="flex items-center space-x-2 mb-2">
        <Input
          readOnly
          value={`http://localhost:3001/r/${templateId}`}
          className="text-xs h-8 bg-zinc-900 border-gray-700 text-white"
        />
        <Button
          size="icon"
          variant="outline"
          onClick={handleCopyLink}
          className="shrink-0 h-8 w-8 bg-yellow-500/10 border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20"
        >
          {copySuccess
            ? <Check className="h-3 w-3 text-green-500" />
            : <ClipboardCopy className="h-3 w-3" />}
        </Button>
      </div>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setActiveView("share")}
        className="w-full text-xs text-yellow-500 hover:bg-yellow-500/10"
      >
        More sharing options
      </Button>
    </div>
  );
}
