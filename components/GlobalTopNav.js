'use client';

import { AddressBar } from "./AddressBar";
import { AvatarElement } from "./Avatar";
import { HelpBar } from "./HelpBar";

export function GlobalTopNav() {
  return (
    <div className="hidden lg:block lg:max-w-[1598px] lg:mx-auto">
      <div className="p-4 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <AddressBar />
        <div className="flex justify-end items-center gap-2">
          <HelpBar />
          <AvatarElement />
        </div>
      </div>
    </div>
  )
}