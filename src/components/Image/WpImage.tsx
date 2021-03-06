import { memo, forwardRef, useMemo, ForwardedRef } from 'react';

import sassVars from '@/styles/export-vars.module.scss';

import { Breakpoints } from '@/utils/layout';
import { useAppSelector } from '@/redux';

type SrcSetSizes = {
  [breakpoint in keyof Breakpoints]: string;
};

export type Props = {
  className?: string;
  sourceUrl: string;
  sourceSrcSet?: string;
  alt: string;
  loadingType?: 'lazy' | 'eager';
  sizes?: Partial<SrcSetSizes>;
};

const DEFAULT_SIZES: SrcSetSizes = {
  hd: '1568px',
  mlarge: '1280px',
  large: '960px',
  tablet: '640px',
  mobile: '320px'
};

const Image = (
  { className, sourceUrl, sourceSrcSet, alt, loadingType = 'lazy', sizes = {} }: Props,
  ref: ForwardedRef<HTMLImageElement>
) => {
  const isWebpSupported = useAppSelector((state) => state.isWebpSupported);

  const { src, srcSet } = useMemo(() => {
    const webpSrcSet = sourceSrcSet?.replace(/\uploads/g, 'uploads-webpc/uploads').replace(/\jpg/g, 'jpg.webp');
    const webpSrc = sourceUrl.replace(/\uploads/g, 'uploads-webpc/uploads').replace(/\jpg/g, 'jpg.webp');

    const src = isWebpSupported ? webpSrc : sourceUrl;
    const srcSet = isWebpSupported ? webpSrcSet : sourceSrcSet;

    return { src, srcSet };
  }, [isWebpSupported, sourceUrl, sourceSrcSet]);

  const { hd, mlarge, large, tablet, mobile } = { ...DEFAULT_SIZES, ...sizes };
  if (srcSet) {
    return (
      <img
        className={className}
        ref={ref}
        srcSet={srcSet}
        src={src}
        alt={alt}
        decoding="async"
        loading={loadingType}
        sizes={
          srcSet &&
          `(min-width: ${sassVars.hd}) ${hd}, (min-width: ${sassVars.mlarge}) ${mlarge}, (min-width: ${sassVars.large}) ${large}, (min-width: ${sassVars.medium}) ${tablet}, ${mobile}`
        }
      />
    );
  } else {
    return <img className={className} ref={ref} src={src} alt={alt} decoding="async" loading={loadingType} />;
  }
};

export default memo(forwardRef(Image));
