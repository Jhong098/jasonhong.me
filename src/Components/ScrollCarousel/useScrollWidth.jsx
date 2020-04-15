import { useLayoutEffect, useCallback, useState } from "react";

const getScrollWidth = element => {
  if (!element) {
    return {
      scrollWidth: 0
    };
  }

  return {
    scrollWidth: element.scrollWidth
  };
};

export default ref => {
  const [rect, setScrollWidth] = useState(
    getScrollWidth(ref ? ref.current : null)
  );

  const handleResize = useCallback(() => {
    if (!ref.current) return;

    setScrollWidth(getScrollWidth(ref.current));
  }, [ref]);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    handleResize();

    if (typeof ResizeObserver === "function") {
      let resizeObserver = new ResizeObserver(() => handleResize());
      resizeObserver.observe(element);

      return () => {
        if (!resizeObserver) {
          return;
        }

        resizeObserver.disconnect();
        resizeObserver = null;
      };
    } else {
      // Browser support, remove freely
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [handleResize, ref]);

  return rect;
};
