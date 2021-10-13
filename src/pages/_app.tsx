import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { AnimatePresence } from 'framer-motion';
import { device, browser } from '@jam3/detect';
import { gsap } from 'gsap';
import classnames from 'classnames';
import { useRouter } from 'next/router';

import Footer from '@/components/Footer/Footer';

import 'normalize.css';

import '@/styles/main.scss';

import Layout from '@/components/Layout/Layout';

import { store } from '@/redux';
// import '@/utils/why-did-you-render';

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
  require('default-passive-events');
  require('focus-visible');
}

// This default export is required in a new `pages/_app.js` file.
function App({ Component, pageProps }: AppProps) {
  const { isUnsupported, ...componentProps } = pageProps;
  const containerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (isBrowser) {
      if (process.env.NODE_ENV !== 'production' && window.location.href.indexOf('?nostat') === -1) {
        require('@jam3/stats')();
      }

      document.body.className = `${document.body.className} ${classnames(device.type, browser.name, {
        'touch-device': device.touch
      })}`.trim();

      footerRef.current = document.querySelector('footer.Footer');
    }
  }, []);

  function handleExitComplete() {
    if (typeof window !== 'undefined') {
      // window.scrollTo({ top: 0 });
      scrollRef.current?.scrollTo(0, { duration: 0, disableLerp: true });
      gsap.to(footerRef.current, 1, { autoAlpha: 1, delay: 0.3 });
      scrollRef.current?.update();
    }
  }

  return isUnsupported ? (
    <Component {...componentProps} />
  ) : (
    <Provider store={store}>
      <Layout>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            lerp: 0.17
          }}
          watch={[]}
          location={router.asPath}
          containerRef={containerRef}
          onLocationChange={(scroll: any) => {
            scroll.scroll.listeners.scroll = [];
            gsap.to(footerRef.current, 0.3, { autoAlpha: 0 });
          }}
          onUpdate={(scroll: any) => {
            scrollRef.current = scroll;
          }}
        >
          <div id="site" ref={containerRef}>
            <div data-scroll-container>
              <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
                <Component {...componentProps} key={router.route} />
              </AnimatePresence>
              <Footer />
            </div>
          </div>
        </LocomotiveScrollProvider>
      </Layout>
    </Provider>
  );
}

export default App;
