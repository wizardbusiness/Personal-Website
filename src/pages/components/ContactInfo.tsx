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
        className="radix-state-open:animate-fade-in radix-state-closed:animate-fade-out items-center rounded-md border border-gray-400 bg-slate-600 p-3 focus:border-2"
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
      <Toast.Viewport className="fixed right-36 top-0 z-20 flex w-96 max-w-[100vw] list-none flex-col items-center gap-4 p-4" />
    </Toast.Provider>
  );
};

export default ContactInfo;

// gabrieljkime@gmail.com copied to clipboard

// import * as React from "react";
// import * as Toast from "@radix-ui/react-toast";

// const Toast = () => {
//   const [open, setOpen] = React.useState(false);
//   // const eventDateRef = React.useRef(new Date());
//   const timerRef = React.useRef(0);

//   React.useEffect(() => {
//     return () => clearTimeout(timerRef.current);
//   }, []);

//   return (
//     <Toast.Provider swipeDirection="right">
//       <button
//         className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded bg-white px-[15px] text-[15px] font-medium leading-[35px] shadow-[0_2px_10px] outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
//         onClick={() => {
//           setOpen(false);
//           window.clearTimeout(timerRef.current);
//           timerRef.current = window.setTimeout(() => {
//             // eventDateRef.current = oneWeekAway();
//             setOpen(true);
//           }, 100);
//         }}
//       >
//         Add to calendar
//       </button>

//       <Toast.Root
//         className="data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut grid grid-cols-[auto_max-content] items-center gap-x-[15px] rounded-md bg-white p-[15px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] [grid-template-areas:_'title_action'_'description_action'] data-[swipe=cancel]:translate-x-0 data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:transition-[transform_200ms_ease-out]"
//         open={open}
//         onOpenChange={setOpen}
//       >
//         <Toast.Title className="text-slate12 mb-[5px] text-[15px] font-medium [grid-area:_title]">
//           Scheduled: Catch up
//         </Toast.Title>
//         {/* <Toast.Description asChild> */}
//         {/* Hello */}
//         {/* <time
//             className="text-slate11 m-0 text-[13px] leading-[1.3] [grid-area:_description]"
//             dateTime={eventDateRef.current.toISOString()}
//           >
//             {prettyDate(eventDateRef.current)}
//           </time> */}
//         {/* </Toast.Description> */}
//         {/* <Toast.Action
//           className="[grid-area:_action]"
//           asChild
//           altText="Goto schedule to undo"
//         >
//           <button className="bg-green2 text-green11 shadow-green7 hover:shadow-green8 focus:shadow-green8 inline-flex h-[25px] items-center justify-center rounded px-[10px] text-xs font-medium leading-[25px] shadow-[inset_0_0_0_1px] hover:shadow-[inset_0_0_0_1px] focus:shadow-[0_0_0_2px]">
//             Undo
//           </button>
//         </Toast.Action> */}
//       </Toast.Root>
//       <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
//     </Toast.Provider>
//   );
// };
