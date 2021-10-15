import React, { useState, useEffect, useRef } from 'react';

export type Props = {
  figureClassName: string;
  lazySrc: string;
  fullSrc: string;
  imgAlt: string;
  figureDelay: boolean | number;
  imgScrollSpeed: boolean | number;
};

function LazyImage({ figureClassName, lazySrc, fullSrc, imgAlt, figureDelay = false, imgScrollSpeed = false }: Props) {
  const [showImage, setShowImage] = useState(false);
  const figureRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const callback = (entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setShowImage(true);
        }
      });
    };

    const options = {
      threshold: 0.2
    };

    const observer = new IntersectionObserver(callback, options);
    if (figureRef.current) {
      observer.observe(figureRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (figureDelay && imgScrollSpeed) {
    return (
      <figure
        data-scroll
        data-inview-translate
        data-inview-delay={figureDelay}
        className={figureClassName}
        ref={figureRef}
      >
        {showImage ? (
          <img data-scroll data-scroll-speed={imgScrollSpeed} src={fullSrc} alt={imgAlt} />
        ) : (
          <img data-scroll data-scroll-speed={imgScrollSpeed} src={lazySrc} alt={imgAlt} />
        )}
      </figure>
    );
  } else {
    return (
      <figure className={figureClassName} ref={figureRef}>
        {showImage ? <img src={fullSrc} alt={imgAlt} /> : <img src={lazySrc} alt={imgAlt} />}
      </figure>
    );
  }
}
export default LazyImage;
