import { useRef, useEffect } from 'react';

export function useOutsideClick(callback: () => void) {
  const ref = useRef(null);

  useEffect(() => {
    function clickHandle(e: MouseEvent) {
      const element = e.target as HTMLElement;
      const closestBtn = element.closest('button');
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(element) &&
        !closestBtn?.classList.contains(
          'js-toggle'
        )
      ) {
        callback();
      }
    }

    document.addEventListener('click', clickHandle, true);

    return () => document.removeEventListener('click', clickHandle, true);
  }, [callback]);

  return ref;
}
