import { memo } from 'react';
import { m } from 'framer-motion';

import Head from '@/components/Head/Head';

function contatti() {
  return (
    <m.main
      className="Contatti"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <section>
        <Head title="contatti" />

        <div className="container">
          <h1 className="title">Contatti Page</h1>
        </div>

        <style jsx>{`
          @import '../../styles/shared';

          :global(.Contatti) {
            position: relative;
          }
          .title {
            font-family: var(--font-tertiary);
            text-align: center;
            margin: 0;
            width: 100%;
            padding: px(180);
            line-height: 1.15;
            font-size: px(48);
          }
        `}</style>
      </section>
    </m.main>
  );
}

export default memo(contatti);
