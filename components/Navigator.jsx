"use client";
import React, { useMemo } from "react";
import { GoHome } from "react-icons/go";
import { FiPlus, FiMusic, FiCompass } from "react-icons/fi";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { dummyPlaylistArray } from "@/lib/dummyData";
import PlayListNav from "./PlayListNav";

const Navigator = () => {
  const pathname = usePathname();

  const routes = useMemo(() => {
    return [
      {
        icon: <GoHome size={24} />,
        label: "홈",
        isActive: pathname === "/",
        href: "/",
      },
      {
        icon: <FiCompass size={24} />,
        label: "둘러보기",
        isActive: pathname === "/explore",
        href: "/explore",
      },
      {
        icon: <FiMusic size={24} />,
        label: "보관함",
        isActive: pathname === "/library",
        href: "/library",
      },
    ];
  }, [pathname]);

  return (
    <>
      <section>
        {routes.map((route) => {
          return (
            <Link key={route.label} href={route.href}>
              <div
                className={cn(
                  "flex flex-row items-center gap-4 p-2 rounded-lg hover:bg-neutral-700 text-[16px]",
                  route.isActive && "bg-neutral-800"
                )}
              >
                {route.icon}
                <span>{route.label}</span>
              </div>
            </Link>
          );
        })}
      </section>
      <section className="px-6 mt-4">
        <div className="w-full h-[1px] bg-neutral-700"></div>
      </section>
      <section className="px-6">
        <div className="flex flex-row items-center justify-center p-2 rounded-3xl font-[200] my-6 bg-neutral-800 gap-2">
          <FiPlus size={24}></FiPlus>
          <span>새 재생목록</span>
        </div>
      </section>
      <section>
        <ul className="flex flex-col">
          {dummyPlaylistArray.map((playlist) => {
            return (
              <PlayListNav key={playlist.id} playlist={playlist}></PlayListNav>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default Navigator;
