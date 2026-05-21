import { useRouteError } from "react-router";
import { useEffect, useRef } from "react";
import ErrorOverlay from "../../vite-error-overlay-plugin";

export default function ErrorPage() {
  const ref = useRef<HTMLDivElement>(null);
  const error = useRouteError() as Error;

  useEffect(() => {
    if (ref.current) {
      const CustomErrorOverlay = window.customElements.get('vite-error-overlay');
      if (CustomErrorOverlay) {
      ref.current.appendChild(new CustomErrorOverlay(error, 'runtime'));
      }
    }
  }, [error]);

  return (
    <div ref={ref}></div>
  );
};
