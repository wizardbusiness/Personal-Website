import React, { useState, useRef, useEffect, type RefObject } from "react";
import * as Toast from "@radix-ui/react-toast";
import { ClipboardIcon, CrossCircledIcon } from "@radix-ui/react-icons";

const ContactInfo = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [btnBottom, setBtnBottom] = useState(0);
  const [btnLeft, setBtnLeft] = useState(0);
  const [btnHeight, setBtnHeight] = useState(0);
  const timerRef = useRef(0);
  const infoRef = useRef(null);
  const btnRef: RefObject<HTMLButtonElement> = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    handleWindowSizeChange(btnRef);
  }, [open]);

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
  // handle dynamic positioning of toast popup according to window size
  const handleWindowSizeChange = (btnRef: RefObject<HTMLButtonElement>) => {
    // check position of left and bottom edges of button and use them to position toast
    const btnLeftBound = btnRef.current?.getBoundingClientRect().left;
    const btnBottomBound = btnRef.current?.getBoundingClientRect().bottom;
    setBtnLeft(btnLeftBound);
    setBtnBottom(btnBottomBound);
  };
  // insert dynamic values here since tailwind doesn't support them
  const toastStyle = { top: `${btnBottom}px`, left: `${btnLeft}px` };
  return (
    <Toast.Provider duration={!error && 900} swipeDirection="right">
      <button
        ref={btnRef}
        data-copy-info
        className="select-none decoration-double hover:underline"
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
        className={`items-center rounded-md border border-gray-400 bg-slate-600 p-3 focus:border-2 radix-state-closed:animate-fade-out radix-state-open:animate-fade-in`}
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
      <Toast.Viewport
        style={toastStyle}
        className={`fixed z-20
        flex w-[270px] list-none flex-col items-center gap-4`}
      />
    </Toast.Provider>
  );
};

export default ContactInfo;
