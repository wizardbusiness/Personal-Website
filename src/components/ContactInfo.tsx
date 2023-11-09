import React, { useState, useRef, useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { ClipboardIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const ContactInfo = () => {
  const [open, setOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <Toast.Provider duration={700} swipeDirection="right">
      <button
        data-copy-info
        className="relative select-none decoration-double hover:underline"
        onClick={() => {
          setOpen(false);
          window.clearTimeout(timerRef.current);
          timerRef.current = window.setTimeout(() => {
            setOpen(true);
          }, 100);
        }}
      >
        Contact
      </button>
      {/* <span data-contact-info className=" absolute h-0 w-0 text-transparent">
        gabrieljkime@gmail.com
      </span> */}
      <Toast.Root
        className="items-center rounded-md border border-gray-400 bg-slate-600 p-3 focus:border-2 radix-state-closed:animate-fade-out radix-state-open:animate-fade-in"
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="flex items-center gap-2 text-lg italic">
          Copied to Clipboard!
          <ClipboardIcon height={30} width={30} />
          <Toast.Action
            className="flex justify-end"
            asChild
            altText="close dialog"
          >
            <button className="-translate-y-2 translate-x-2">
              <CrossCircledIcon height={25} width={25} />
            </button>
          </Toast.Action>
        </Toast.Title>
        <Toast.Description asChild>
          <div className="text-xl">gabrieljkime@gmail.com</div>
        </Toast.Description>
      </Toast.Root>
      <Toast.Viewport className="fixed left-0 top-0 z-20 flex w-96 max-w-[100vw] list-none flex-col items-center gap-4 p-4 lg:left-3/4" />
    </Toast.Provider>
  );
};

export default ContactInfo;
