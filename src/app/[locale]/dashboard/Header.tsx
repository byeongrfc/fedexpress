"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Send,
  Search,
  LogOut,
  User,
  Bell,
  Home,
  Menu,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import TruckLoader from "@/components/TruckLoader";
import { logout } from "@/actions/auth";

interface Props {
  userName: string;
}

export default function Header({ userName }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logout();
    });
  };

  return (
    <>
      {isPending && <TruckLoader displayText="Logging out..." />}

      {/* Mobile Header */}
      <header className="lg:hidden bg-card border-b border-border p-4 sticky top-0">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">FedExpress</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden"
          >
            {isSidebarOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className="w-64">
        <div
          className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          fixed lg:top-0 lg:left-0 lg:translate-x-0 z-30 w-64 bg-card border-r border-border min-h-screen p-4 transition-transform duration-300 ease-in-out lg:transition-none
        `}
        >
          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold text-primary">FedExpress</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <User className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium text-foreground">{userName}</p>
                <p className="text-sm text-muted-foreground">Account Holder</p>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 p-2 rounded-lg bg-primary/10 text-primary"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Home className="h-5 w-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/track"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Search className="h-5 w-5" />
                <span>Track Package</span>
              </Link>
              <Link
                href="/send"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Send className="h-5 w-5" />
                <span>Send Package</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Package className="h-5 w-5" />
                <span>All Shipments</span>
              </Link>
            </nav>

            <Separator />

            <div className="space-y-2">
              <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors w-full">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </button>
              <button
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors w-full"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
