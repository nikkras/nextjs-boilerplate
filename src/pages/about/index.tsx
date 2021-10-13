import { memo } from 'react';
import { motion } from 'framer-motion';

import Head from '@/components/Head/Head';

// type Props = {
//   page?: string;
// };

// function About({ page }: Props) {
function About() {
  return (
    <motion.main
      className="About"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3 } }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    >
      <Head title="About" />
      <div className="container">
        <h1 className="title">About Page</h1>
      </div>

      <style jsx>
        {`
          @import '../../styles/shared';

          :global(.About) {
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
        `}
      </style>
    </motion.main>
  );
}

export default memo(About);
