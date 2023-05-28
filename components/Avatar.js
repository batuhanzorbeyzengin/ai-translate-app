import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { avatarMenuItems } from '@/public/AvatarItem';

function DropdownMenuItem({ item }) {
  return (
    <DropdownMenu.Item
      className="group text-[15px] leading-none text-[#2D3748] rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-[#1f2937] data-[highlighted]:text-violet1"
      disabled={item.disabled}
    >
      {item.name}
    </DropdownMenu.Item>
  );
}

export function AvatarElement() {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <Avatar.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
            BZ
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          {avatarMenuItems.map((item, index) => (
            <>
              {item.name === "Manage Account" || item.name === "Pricing" ? <DropdownMenu.Separator className="h-[1px] bg-violet6 m-[5px]" /> : null}
              <DropdownMenuItem item={item} key={index} />
            </>
          ))}
          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
