import { memo, useEffect, useCallback, PropsWithChildren, useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Nav from '@/components/Nav/Nav';
import Cursor from '@/components/Cursor/Cursor';
// import Analytics from '@/utils/analytics';
import { setPrevRoute, setIsWebpSupported, useAppDispatch } from '@/redux';
import { checkWebpSupport } from '@/utils/basic-functions';
import { device } from '@jam3/detect';
import { useAppSelector } from '@/redux';

export type Props = PropsWithChildren<{}>;

function Layout({ children }: Props) {
  const activeLang = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  const router = useRouter();
  // @ts-ignore
  const [cookieConsentValue, setCookieConsentValue] = useState<boolean | string | undefined>(getCookieConsentValue());

  const handleRouteChange = useCallback(
    (url) => {
      if (router.asPath !== url) dispatch(setPrevRoute(router.asPath));
    },
    [dispatch, router.asPath]
  );

  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, handleRouteChange]);

  useEffect(() => {
    checkWebpSupport('lossy', (isSupported) => dispatch(setIsWebpSupported(isSupported)));
  }, [dispatch]);

  return (
    <LazyMotion features={domAnimation}>
      {/* <Analytics consent={cookieConsentValue?.statistics} /> */}
      <Nav />
      {children}
      {device.desktop && <Cursor />}
      <CookieConsent
        disableStyles={true}
        onAccept={() => setCookieConsentValue(true)}
        buttonText={activeLang === 'en' ? 'I agree' : 'Acconsento'}
        debug={false}
      >
        {activeLang === 'en' ? 'This website uses cookies' : 'Questo sito utilizza i cookies'}
      </CookieConsent>
    </LazyMotion>
  );
}

export default memo(Layout);
