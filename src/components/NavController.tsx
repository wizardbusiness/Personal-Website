import React from "react";
import useIsTouchDevice from "../scripts/hooks/useIsTouchDevice";
import PageScrollWidget from "./PageScrollWidget";

const NavController = ({ pageUrl, navDirection, children }) => {
  const isTouchDevice = useIsTouchDevice();
  return (
    <div
      data-swipe-container
      className="flex h-1/5 w-full items-end justify-center"
    >
      <PageScrollWidget
        isTouchDevice={isTouchDevice}
        pageUrl={pageUrl}
        navDirection={navDirection}
      >
        {children}
      </PageScrollWidget>
    </div>
  );
};

export default NavController;
