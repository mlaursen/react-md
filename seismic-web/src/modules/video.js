import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'videojs-plus';
import 'videojs-plus/dist/videojs-plus.css';

const defaultPlayerOptions = {
  autoplay: true,
  muted: true,
  aspectRatio: '16:9',
  mobileView: false,
};

export default function VideoJS({
  children,
  playerOptions,
  onPlayerInit,
  onPlayerDispose,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && containerRef.current.querySelector('video')) {
      const videoEl = containerRef.current.querySelector('video');
      const player = videojs(videoEl, {
        ...defaultPlayerOptions,
        ...playerOptions,
      });

      // used to move children component into player's elment
      // your may not thest script
      const playerEl = player.el();
      const flag = player.getChild('PlayToggleLayer').el();
      for (const child of containerRef.current.children) {
        if (child !== playerEl) {
          playerEl.insertBefore(child, flag);
        }
      }
      // ----
      onPlayerInit && onPlayerInit(player);

      // for debug purpose
      window.player = player;

      return () => {
        onPlayerDispose && onPlayerDispose(null);
        player.dispose();
      };
    }
  }, [onPlayerInit, onPlayerDispose, playerOptions]);

  return (
    <div className="player" ref={containerRef}>
      <video />
      {children}
    </div>
  );
}
