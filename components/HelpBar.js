import * as React from 'react';
import * as Toast from '@radix-ui/react-toast';
import * as Accordion from '@radix-ui/react-accordion';
import { QuestionMarkCircleIcon, XMarkIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from 'clsx';
import { helpBarItem } from '@/public/HelpBarItem';

export function HelpBar() {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  return (
    <Toast.Provider swipeDirection="right">
      <button className="flex space-x-1" onClick={() => {
        setOpen(false);
        eventDateRef.current = oneWeekAway();
        setOpen(true);
      }}>
        <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
        <span className="text-gray-500">
          Help
        </span>
      </button>

      <Toast.Root
        className="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut"
        open={open}
        onOpenChange={setOpen}
      >
        <div className='flex justify-between mb-3'>
          <Toast.Title className=" mb-[5px] font-medium text-slate12 text-[15px]">
            Hi 👋 Batuhan Zorbey Zengin
          </Toast.Title>
          <Toast.Action asChild altText="Goto schedule to undo">
            <button className="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px]">
              <XMarkIcon className="h-6 w-6 text-gray-500" />
            </button>
          </Toast.Action>
        </div>
        <Toast.Description asChild>
          <div className='[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]'>
            <Accordion.Root
              className="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
              type="single"
              defaultValue="item-1"
              collapsible
            >
              {helpBarItem.map((item, index) => (
                <AccordionItem key={index} value={`item-${index + 1}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion.Root>
          </div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  )
}

function oneWeekAway(date) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

const AccordionItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Item
    className={clsx(
      'focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </Accordion.Item>
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Header className="flex">
    <Accordion.Trigger
      className={clsx(
        'text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDownIcon
        className="h-6 w-6 text-gray-500"
        aria-hidden
      />
    </Accordion.Trigger>
  </Accordion.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx(
      'text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
      className
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="py-[15px] px-5">{children}</div>
  </Accordion.Content>
));
AccordionContent.displayName = "AccordionContent";
