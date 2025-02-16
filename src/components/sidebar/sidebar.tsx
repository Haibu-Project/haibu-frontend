"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  LogOut,
  Settings,
  HelpCircle,
  ChevronsLeft,
  MoreVertical,
  LayoutDashboard,
  Presentation,
  BookOpen,
  Calendar,
  Layers,
  PencilRuler,
  Home,
  Bell,
  MessageCircle,
} from "lucide-react";

// Simulación de usuario autenticado
const user = { name: "John Doe", email: "john@example.com" };

const Sidebar = () => {
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    setSelectedOption(pathname);
  }, [pathname]);

  const Menus = [
    { title: "Home", icon: Home, route: "/home" },
    { title: "Messages", icon: MessageCircle, route: "/message" },
    { title: "Notifications", icon: Bell, route: "/notifications" },
    { title: "Settings", icon: Settings, route: "/settings" },
  ];

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <aside
      className={`bg-main border border-gray-700 h-full p-4 flex flex-col rounded-xl transition-all duration-300 
      ${isOpen ? "w-72" : "w-20"}`}
    >
      {/* Botón para abrir/cerrar el Sidebar */}
      {/* Toggle collapse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute ${isOpen ? "left-[265px]" : "left-14"}  bg-white text-black p-2 rounded-full shadow-md transition-all`}
      >
        <ChevronsLeft
          className={`transition-transform ${!isOpen && "rotate-180"}`}
        />
      </button>

      {/* Logo y Nombre */}
      <div className="flex justify-center items-center gap-x-2 mb-8">
        <Image
          src="/haibu-logos/Haibu-Over-Purple.svg"
          alt="Logo"
          width={150}
          height={150}
          className=""
        />
      </div>

      {/* Menú de navegación */}
      <nav className="flex flex-col flex-grow gap-y-2">
        {Menus.map((menu) => (
          <Link
            key={menu.route}
            href={menu.route}
            className={cn(
              "flex items-center gap-x-4 p-3 rounded-lg transition-colors text-white",
              selectedOption === menu.route
                ? "bg-[#575fcf] text-white"
                : "hover:bg-[#4b4b9c] hover:text-gray-200"
            )}
          >
            <menu.icon size={24} />
            <span
              className={`transition-all duration-300 ${!isOpen && "hidden"}`}
            >
              {menu.title}
            </span>
          </Link>
        ))}
      </nav>

      {/* Sección inferior: Ayuda y Perfil */}
      <div className="mt-auto space-y-4">
        {/* Popover para el perfil */}
        <Popover>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-x-3 p-3 rounded-lg w-full text-left text-white hover:bg-[#4b4b9c]">
              <Image
                src="https://ui-avatars.com/api/?name=John+Doe"
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div
                className={`flex-1 transition-all duration-300 ${
                  !isOpen && "hidden"
                }`}
              >
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-300">{user.email}</p>
              </div>
              {isOpen && <MoreVertical size={20} />}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 bg-[#3B3B98] text-white border-gray-700 rounded-lg">
            <Link
              href="/settings"
              className="flex items-center gap-x-2 p-3 hover:bg-[#4b4b9c] rounded-lg"
            >
              <Settings size={20} />
              Editar Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-x-2 p-3 text-red-500 hover:bg-red-700 hover:text-white rounded-lg"
            >
              <LogOut size={20} />
              Cerrar Sesión
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </aside>
  );
};

export default Sidebar;
