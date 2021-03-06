import { memo, useState, useEffect } from 'react';
import { m } from 'framer-motion';
import classnames from 'classnames';
import Image from '@/components/Image/DefaultImage';
import getLayout from '@/utils/layout';
import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function Home({ className }: Props) {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLarge(getLayout.large);
      window.addEventListener('resize', () => setLarge(getLayout.large));
    }
  }, []);

  return (
    <m.main
      className={classnames('Home', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Head />
      <section className="intro">
        <h1 className="title">nikkras next.js boilerplate</h1>
        <h2 className="description">extended from jam3.</h2>
        {typeof window !== 'undefined' && large ? (
          <div className="image">
            <Image src="test.jpg" alt="test" />
          </div>
        ) : null}
      </section>

      <style jsx>{`
        @import '../styles/shared';

        .intro {
          width: 100%;
          color: #333;
          min-height: 100vh;

          > .title {
            font-family: var(--font-tertiary);
            margin: 0;
            width: 100%;
            padding-top: px(120);
            padding-bottom: px(24);
            letter-spacing: -1px;
            line-height: 1.15;
            @include font-size(40, 40);
            font-size: clamp(4rem, 0.517rem + 3.4014vw, 8rem);
            @include font-fluid(40, 80, 1024, 2200);
          }

          > .title,
          > .description {
            text-align: center;
          }

          .image {
            text-align: center;
            padding: 10vw;
            :global(img) {
              width: 100%;
              display: inline-block;
            }
          }
        }
      `}</style>
    </m.main>
  );
}

export default memo(Home);
