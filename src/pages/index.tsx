import { memo, useState, useEffect } from 'react';
import { m } from 'framer-motion';
import classnames from 'classnames';
import Image from '@/components/Image/Image';
import getLayout from '@/utils/layout';
import Head from '@/components/Head/Head';

type Props = {
  className: string;
};

function Landing({ className }: Props) {
  const [large, setLarge] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setLarge(getLayout.large);
      window.addEventListener('resize', () => setLarge(getLayout.large));
    }
  }, []);

  return (
    <m.main
      className={classnames('Landing', className)}
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
            <Image imageObj={{ file: 'test.jpg', alt: 'test' }} />
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
            font-size: px(48);
          }

          > .title,
          > .description {
            text-align: center;
          }

          .image {
            text-align: center;
            padding: 10vw;
            img {
              display: inline-block;
            }
          }
        }
      `}</style>
    </m.main>
  );
}

export default memo(Landing);
