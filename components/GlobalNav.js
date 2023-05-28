'use client';

import { useState } from "react";
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { menuItem } from "@/public/MenuItem";
import clsx from "clsx";
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/20/solid';

export function GlobalNav() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <div className="fixed top-0 z-10 flex w-full flex-col border-b border-gray-800 bg-[#F2F2F2] lg:bottom-0 lg:z-auto lg:w-52">
      <div className={`flex h-14 items-center py-4 px-4 lg:h-auto`}>
        <Link href="/" className="group flex w-full items-center gap-x-2.5" onClick={close}>
          <div className="flex items-center h-10 w-full max-w-fit font-bold text-left">
            AI AUDIO to TEXT PLATFORM
          </div>
        </Link>
      </div>
      <button type="button" className="group absolute right-0 top-0 flex h-14 items-center gap-x-2 px-4 lg:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <XMarkIcon className="block w-6 text-gray-400" />
        ) : (
          <Bars3BottomRightIcon className="block w-6 text-gray-400" />
        )}
      </button>
      <div className={clsx('overflow-y-auto lg:static lg:block', {'fixed inset-x-0 bottom-0 top-14 mt-px bg-[#F2F2F2]': isOpen, hidden: !isOpen,})}>
        <nav className="space-y-6 px-2 py-5">
          {menuItem.map((section) => {
            return (
              <div key={section.name}>
                <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-[#2D3748]">
                  <div>{section.name}</div>
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => (
                    <GlobalNavItem key={item.slug} item={item} close={close} />
                  ))}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  )
}

function GlobalNavItem({ item, close }) {
  const segment = usePathname();
  const isActive = item.slug === segment;

  return (
    <Link onClick={close} href={`${item.slug}`} className={clsx(
        'block rounded-md px-3 py-2 text-sm font-medium hover:text-gray-300',
        {
          'text-gray-500/80 hover:bg-gray-800': !isActive,
          'text-white bg-gray-800': isActive,
        },
        item.name == 'Projects' ? 'first-step' : ''
      )}>
      {item.name}
    </Link>
  );
}