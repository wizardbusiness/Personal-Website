import React, { useState, useRef, useEffect } from "react";
import * as Toast from "@radix-ui/react-toast";
import { ClipboardIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const ContactInfo = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const timerRef = useRef(0);
  const infoRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleCopyInfo = () => {
    const contactInfo = infoRef.current?.value;
    try {
      navigator.clipboard.writeText(contactInfo);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  const handleClickToast = () => {
    handleCopyInfo();
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  return (
    <Toast.Provider duration={700} swipeDirection="right">
      <button
        data-copy-info
        className="relative select-none decoration-double hover:underline"
        onClick={handleClickToast}
      >
        Contact
      </button>
      <textarea
        readOnly
        ref={infoRef}
        data-contact-info
        value="gabrieljkime@gmail.com"
        className="absolute h-0 w-0 text-transparent"
      />
      <Toast.Root
        className={`items-center rounded-md border border-gray-400 ${
          !error ? "bg-slate-600" : "bg-red-500"
        } p-3 focus:border-2 radix-state-closed:animate-fade-out radix-state-open:animate-fade-in`}
        open={open}
        onOpenChange={setOpen}
      >
        <Toast.Title className="flex items-center gap-2 text-lg italic">
          {!error ? "Copied to Clipboard!" : "Error copying to clipboard"}
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
