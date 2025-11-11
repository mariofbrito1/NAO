import React, { useRef, useEffect } from "react";
import { Box } from "@material-ui/core";

const ScrollSyncWrapper = ({ children, tableWidth = "2000px" }) => {
  const topScrollRef = useRef(null);
  const bottomScrollRef = useRef(null);

  useEffect(() => {
    const top = topScrollRef.current;
    const bottom = bottomScrollRef.current;
    if (!top || !bottom) return;

    const syncScroll = (src, dest) => {
      dest.scrollLeft = src.scrollLeft;
    };

    const topHandler = () => syncScroll(top, bottom);
    const bottomHandler = () => syncScroll(bottom, top);

    top.addEventListener("scroll", topHandler);
    bottom.addEventListener("scroll", bottomHandler);

    return () => {
      top.removeEventListener("scroll", topHandler);
      bottom.removeEventListener("scroll", bottomHandler);
    };
  }, []);

  return (
    <Box style={{ position: "relative" }}>
      {/* Scroll superior */}
      <div
        ref={topScrollRef}
        style={{
          overflowX: "auto",
          overflowY: "hidden",
          height: 16,
          marginBottom: 4,
        }}
      >
        <div style={{ width: tableWidth }} />
      </div>

      {/* Scroll + Tabla */}
      <div
        ref={bottomScrollRef}
        style={{ overflowX: "auto" }}
      >
        {children}
      </div>
    </Box>
  );
};

export default ScrollSyncWrapper;
