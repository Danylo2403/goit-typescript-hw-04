import React, { ReactNode, useEffect, useRef } from "react";

// Визначення типів для пропсів
interface ObserverProps {
  children: ReactNode;
  onContentEndVisible: () => void;
}

// Задайте тип для пропсів компонента
export function Observer({ children, onContentEndVisible }: ObserverProps) {
  // Визначте правильний тип для useRef та зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Визначте тип для options, підказка, клас також може бути типом для options
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      
      <div ref={endContentRef} />
    </div>
  );
}
