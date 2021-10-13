import styles from '@/styles/export-vars.module.scss';

export const queries = {
  mobile: `(max-width: ${styles.large})`,
  phone: `(max-width: ${styles.medium})`,
  tablet: `(max-width: ${styles.large})`,
  minimum: `(max-width: 320px)`,
  xsmall: `(max-width: 370px)`,
  small: `(max-width: ${styles.msmall})`,
  msmall: `(max-width: ${styles.medium})`,
  medium: `(max-width: ${styles.large})`,
  large: `(max-width: 1130px)`,
  lsl: `(max-width: ${styles.slarge})`,
  slarge: `(max-width: ${styles.mlarge})`,
  mlarge: `(max-width: ${styles.hd})`,
  hd: `(max-width: ${styles.fullhd})`,
  fullhd: `(max-width: ${styles.xlarge})`
};

export interface Breakpoints {
  readonly mobile: boolean;
  readonly tablet: boolean;
  readonly large: boolean;
  readonly mlarge: boolean;
  readonly hd: boolean;
}

export interface BreakpointLayout extends Breakpoints {
  readonly all: Breakpoints;
}

function getLayout(): BreakpointLayout {
  if (typeof window === 'undefined') {
    return {
      mobile: false,
      tablet: false,
      large: false,
      mlarge: true,
      hd: false,
      all: { mobile: false, tablet: false, large: false, mlarge: false, hd: false }
    };
  }

  const TABLET_MEDIA_QUERY = `(min-width: ${styles.medium})`;
  const LARGE_MEDIA_QUERY = `(min-width: ${styles.large})`;
  const MLARGE_MEDIA_QUERY = `(min-width: ${styles.mlarge})`;
  const HD_MEDIA_QUERY = `(min-width: ${styles.fullhd})`;

  const TABLET_MATCH_MEDIA = window.matchMedia(TABLET_MEDIA_QUERY);
  const LARGE_MATCH_MEDIA = window.matchMedia(LARGE_MEDIA_QUERY);
  const MLARGE_MATCH_MEDIA = window.matchMedia(MLARGE_MEDIA_QUERY);
  const HD_MATCH_MEDIA = window.matchMedia(HD_MEDIA_QUERY);

  return {
    get mobile() {
      return !this.tablet && !this.large && !this.mlarge && !this.hd;
    },
    get tablet() {
      return TABLET_MATCH_MEDIA.matches && !this.large && !this.mlarge && !this.hd;
    },
    get large() {
      return LARGE_MATCH_MEDIA.matches;
    },
    get mlarge() {
      return MLARGE_MATCH_MEDIA.matches;
    },
    get hd() {
      return HD_MATCH_MEDIA.matches;
    },
    get all() {
      return {
        mobile: this.mobile,
        tablet: this.tablet,
        large: this.large,
        mlarge: this.mlarge,
        hd: this.hd
      };
    }
  };
}

export default getLayout();
