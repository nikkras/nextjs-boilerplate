import { memo } from 'react';
import { m } from 'framer-motion';

import Head from '@/components/Head/Head';

function {{name}}() {
  return (
    <m.main
      className="{{name}}"
      initial={ opacity: 0 }
      animate={ opacity: 1, transition: { delay: 0.3 } }
      exit={ opacity: 0, transition: { duration: 0.3 } }
    >

    <section>
      <Head title="{{name}}" />

      <h1>{{name}} Page</h1>

      <style jsx>{`
        @import '../../styles/shared';

        .{{name}} {
        }
      `}</style>
      </section>

    </m.main>
  );
}

export default memo({{name}});
