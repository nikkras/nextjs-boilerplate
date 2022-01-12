import { memo, useEffect, useCallback, PropsWithChildren, useState } from 'react';
import dynamic from 'next/dynamic';
import { LazyMotion, domAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Nav from '@/components/Nav/Nav';
import Cursor from '@/components/Cursor/Cursor';
// import Analytics from '@/utils/analytics';
import { setPrevRoute, setIsWebpSupported, useAppDispatch } from '@/redux';
import { checkWebpSupport } from '@/utils/basic-functions';
import { device } from '@jam3/detect';
import { useAppSelector } from '@/redux';

const AppAdmin = dynamic(() => import('@/components/AppAdmin/AppAdmin'), { ssr: false });

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

      {process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production' && <AppAdmin />}
    </LazyMotion>
  );
}

export default memo(Layout);
