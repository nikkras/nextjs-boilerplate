import React, { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '@/redux';
import classnames from 'classnames';
import styles from './Cursor.module.scss';
// import ArrowRight from '../../assets/svgs/arrow-right-no-fill.svg';
// import ArrowLeft from '../../assets/svgs/arrow-left-no-fill.svg';
// import PlayIcon from '../../assets/svgs/play-not-filled.svg';
// import ZoomIcon from '../../assets/svgs/plus-circle-filled-02.svg';
import SpinnerIcon from '../../assets/svgs/spinner.svg';
import { gsap } from 'gsap';

// const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

const mousePos: {
  x: number;
  y: number;
} = {
  x: 0,
  y: 0
};

const cursorObj: {
  visible: boolean;
  state: string;
  locked: {
    locked: boolean;
    x: number;
    y: number;
  };
} = {
  visible: false,
  state: 'default',
  locked: {
    locked: false,
    x: 0,
    y: 0
  }
};

export default function CustomCursor() {
  const cursorEl = useRef<HTMLDivElement>(null);
  const cursorCircle = useRef<HTMLDivElement>(null);
  const cursorSpinner = useAppSelector((state) => state.cursorSpinner);
  const cursorState = useAppSelector((state) => state.cursorState);
  const cursorLocked = useAppSelector((state) => state.cursorLocked);
  const [cursorHidden, setCursorHidden] = useState(true);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (cursorEl && cursorEl.current) {
      gsap.set(cursorEl.current, { opacity: 0 });
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseout', onMouseLeave);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseout', onMouseLeave);
      cancelAnimationFrame(requestRef.current as number);
    };
  }, []);

  useEffect(() => {
    if (!cursorHidden) {
      gsap.to(cursorEl.current, 0.3, { autoAlpha: 1, delay: 0.5 });
      requestRef.current = requestAnimationFrame(animate);
    } else {
      gsap.set(cursorEl.current, { opacity: 0 });
      cancelAnimationFrame(requestRef.current as number);
    }
  }, [cursorHidden]);

  useEffect(() => {
    cursorObj.state = cursorState;
    cursorObj.locked = cursorLocked;
  }, [cursorState, cursorLocked]);

  const onMouseMove = (event: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = event;
    mousePos.x = clientX;
    mousePos.y = clientY;
    if (!cursorObj.visible) {
      cursorObj.visible = true;
      setCursorHidden(false);
    }
  };

  const onMouseLeave = (event: { clientX: number; clientY: number }) => {
    const { clientX, clientY } = event;
    if (clientY <= 0 || clientX <= 0 || clientX >= window.innerWidth || clientY >= window.innerHeight) {
      cursorObj.visible = false;
      setCursorHidden(true);
    }
  };

  const animate = () => {
    requestRef.current = requestAnimationFrame(animate);
    renderRAF();
  };

  const renderRAF = () => {
    if (cursorEl.current && cursorObj.visible) {
      let targetX: number | undefined = cursorObj.locked.locked ? cursorObj.locked.x : mousePos.x;
      let targetY: number | undefined = cursorObj.locked.locked ? cursorObj.locked.y : mousePos.y;
      let cursorBounds: DOMRect = cursorEl.current.getBoundingClientRect();

      let x: number = cursorBounds?.x;
      let y: number = cursorBounds?.y;

      let dx: number = targetX - cursorBounds.x;
      let dy: number = targetY - cursorBounds.y;

      x += dx * 0.15;
      y += dy * 0.15;

      cursorEl.current.style.left = `${x}px`;
      cursorEl.current.style.top = `${y}px`;

      let angle = Math.atan2(dy, dx);
      let dist = Math.sqrt(dx * dx + dy * dy) / 60;

      gsap.set(cursorCircle.current, {
        scaleX: 1 + dist,
        scaleY: 1 - dist / 4,
        rotation: (180 * angle) / Math.PI
      });
    }
  };

  return (
    <div
      ref={cursorEl}
      className={classnames(
        styles.Cursor,
        cursorSpinner && styles.CursorSpinner,
        cursorState === 'slides' && styles.CursorSlides,
        cursorState === 'arrow-right' && styles.ArrowRight,
        cursorState === 'arrow-left' && styles.ArrowLeft,
        cursorState === 'play' && styles.Play,
        cursorState === 'intro' && styles.Intro,
        cursorState === 'zoom' && styles.Zoom,
        cursorLocked.locked && styles.CursorLocked,
        cursorHidden && styles.CursorHidden
      )}
    >
      <span className={styles.defaultCursor} ref={cursorCircle}></span>
      {cursorState === 'intro' && <span className={styles.introText}>VIDEO</span>}
      {/* {cursorState === 'arrow-right' && <ArrowRight />}
      {cursorState === 'arrow-left' && <ArrowLeft />}
      {cursorState === 'play' && <PlayIcon />}
      {cursorState === 'zoom' && <ZoomIcon />} */}
      {cursorSpinner && (
        <span className={styles.spinnerContainer}>
          <SpinnerIcon />
        </span>
      )}
    </div>
  );
}
