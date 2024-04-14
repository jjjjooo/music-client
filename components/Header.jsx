"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import UserIcon from "@/components/UserIcon";
import { FiSearch } from "react-icons/fi";
import { FaChromecast } from "react-icons/fa";
import PagePadding from "@/components/PagePadding";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Logo from "@/components/Logo";
import Navigator from "@/components/Navigator";
import { cn } from "@/lib/utils";
import useUIState from "@/hooks/useUIState";

const HeaderDrawer = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[240px] h-full">
        <div className="py-3">
          <div className="px-3">
            <Logo
              isInDrawer
              onClickClose={() => {
                setIsOpen(false);
              }}
            />
          </div>
          <Navigator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Header = ({ children }) => {
  const { headerImageSrc, setHeaderImageSrc } = useUIState();
  const [isScrolled, setIsScrolled] = useState(false);
  const headRef = useRef();
  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = headRef?.current?.scrollTop;
      setIsScrolled(scrollValue !== 0);
    };
    headRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      headRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <header ref={headRef} className="relative overflow-y-auto w-full h-full">
        <section className="absolute w-full top-0">
          <div className="relative h-[400px] w-full">
            <Image
              alt="mediaItem"
              className="object-cover"
              fill
              src={headerImageSrc || "https://source.unsplash.com/random/?tree"}
            />
            <div className="absolute h-[400px] top-0 bg-black opacity-40 w-full "></div>
            <div className="absolute h-[400px] top-0 bg-gradient-to-t from-black w-full "></div>
          </div>
        </section>
        <section className={cn("sticky top-0 z-10", isScrolled && "bg-black")}>
          <PagePadding>
            <div className="h-[64px] flex flex-row justify-between items-center">
              <article
                className="hidden h-[42px] lg:flex flex-row items-center min-w-[480px] rounded-2xl px-[16px] gap-4
              bg-[rgba(0,0,0,0.14)] border border-neutral-500"
              >
                <div>
                  <FiSearch size={20} />
                </div>
                <input
                  className="h-full w-full bg-transparent"
                  type="text"
                  placeholder="노래, 앨범, 아티스트, 팟캐스트 검색"
                />
              </article>
              <HeaderDrawer>
                <article className="lg:hidden">
                  <Logo />
                </article>
              </HeaderDrawer>
              <article className="flex flex-row gap-6 items-center">
                <FaChromecast size={26} />
                <UserIcon />
              </article>
            </div>
          </PagePadding>
        </section>
        <section className="relative">{children}</section>
      </header>
    </>
  );
};

export default Header;
