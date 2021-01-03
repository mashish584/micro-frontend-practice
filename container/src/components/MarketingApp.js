import React, { useEffect, useRef } from "react";
import { mount } from "marketing/MarketingApp";

export default () => {
  const elRef = useRef(null);

  useEffect(() => {
    mount(elRef.current);
  }, []);

  return <div ref={elRef} />;
};
