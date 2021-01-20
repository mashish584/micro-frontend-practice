import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "auth/AuthApp";

export default () => {
  const elRef = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentChange } = mount(elRef.current, {
      onNavigate: ({ pathname: nextpathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextpathname) {
          history.push(nextpathname);
        }
      },
      initialPath: history.location.pathname,
    });

    if (onParentChange) {
      history.listen(onParentChange);
    }
  }, []);

  return <div ref={elRef} />;
};
