// "use client";

import {
  BarChart3,
  Bell,
  FileText,
  Layout,
  LayoutDashboardIcon,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";
// import { Button } from "@repo/ui/components/ui/button";
// import CreateTemplateButton from "@/components/CreateTemplateBtn";
import { getAllTemplate } from "../actions/template";
import { requireAuth } from "@/lib/auth";
import TemplateCard from "@/components/template/TemplateCard";
import StatCard from "@repo/ui/components/SellerCards/StatCard";
// import { useRouter } from "next/navigation";

import { User as UserType } from "@repo/database/client";
import RenderAuthButtons from "@/components/auth/AuthButtons";
import Link from "next/link";

type SelectedUserFields = Pick<UserType, "id" | "image" | "name" | "email">;

export default async function Dashboard() {
  // const router = useRouter();
  const userAuth = await requireAuth();
  const sellerId = userAuth.id;
  const templates = await getAllTemplate(sellerId);

  // Ensure user data matches SelectedUserFields type
  const user: SelectedUserFields = {
    id: userAuth.id,
    name: userAuth.name || "Anonymous",
    email: userAuth.email || "",
    image: userAuth.image || "",
  };

  // Calculate total reviews across all templates
  const totalReviews = templates.reduce(
    (total, template) => total + template.reviews.length,
    0,
  );

  // Calculate response rate (placeholder - you'd need actual data for this)
  const responseRate = "89%";

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="bg-black pt-4 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <LayoutDashboardIcon className="h-8 w-8 text-yellow-500" />
              <span className="ml-2 text-xl font-bold text-white">
                RevewSnap
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center">
              <div className="w-full relative">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search templates..."
                    className="w-full px-4 py-2 pl-12 pr-4 rounded-lg border border-gray-500 bg-gradient-to-r from-zinc-800 to-zinc-700 text-white shadow-inner shadow-zinc-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                  />
                  <Search className="absolute left-4 top-2.5 h-5 w-5 text-yellow-400 drop-shadow-md transition-all duration-300 hover:text-yellow-300 hover:scale-110" />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="h-6 w-6 text-gray-400" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-6 w-6 text-gray-400" />
              </button>

              {user && user.name && (
                <div className="hidden md:flex ">
                  {<RenderAuthButtons user={user} />}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Reviews"
            value={totalReviews}
            description="Across all templates"
            icon={<BarChart3 className="h-6 w-6" />}
          />
          <StatCard
            title="Active Templates"
            value={templates.length}
            description="Currently in use"
            icon={<FileText className="h-6 w-6" />}
          />
          <StatCard
            title="Response Rate"
            value={responseRate}
            description="Last 30 days"
            icon={<Users className="h-6 w-6" />}
          />
        </div>

        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-yellow-500">My Templates</h1>
            <p className="text-gray-400 mt-1">
              Manage and create review templates
            </p>
          </div>
          <Link
            href={"/template/create"}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-gradient-to-r from-yellow-600 to-yellow-300 hover:from-yellow-600 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            <Plus className="h-5 w-5 mr-2 text-black" /> Create Template
          </Link>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.length > 0
            ? (
              templates.map((template) => (
                <TemplateCard
                  key={template.id}
                  id={template.id}
                  title={template.title}
                  reviewCount={template.reviews.length}
                  lastUpdated={template.updatedAt}
                />
              ))
            )
            : (
              <div className="col-span-full p-8 text-center bg-zinc-800/30 rounded-lg border border-yellow-500/10">
                <p className="text-gray-400">
                  No templates yet. Create your first template!
                </p>
              </div>
            )}
        </div>
      </main>
    </div>
  );
}
