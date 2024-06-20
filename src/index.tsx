"use client";

import {
  createContext,
  createRef,
  type FC,
  type PropsWithChildren,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  Fragment,
} from "react";

type RefNode = RefObject<HTMLAudioElement>;

type UseAudioContext = {
  audio: string[];
  audioRef: Record<string, RefNode>;
  init: (src: string) => void;
  play: (src: string | null) => () => void;
  set: (ref: Record<string, RefNode>) => void;
};

export type UseAudioHook = {
  play: () => void;
  isInit: boolean;
};

export const AudioContext = createContext<UseAudioContext | undefined>(
  undefined
);

export const AudioProvider: FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren) => {
  const [audio, setAudio] = useState<string[]>([]);

  const [audioRef, audioRefSet] = useState<Record<string, RefNode>>({});

  const init = useCallback((src: string) => {
    setAudio((prev) => {
      if (prev.includes(src)) {
        return prev;
      }

      return [...prev, src];
    });
  }, []);

  const set = useCallback((ref: Record<string, RefNode>) => {
    audioRefSet(ref);
  }, []);

  const play = useCallback(
    (src: string | null): (() => void) => {
      if (src === null) {
        return () => {};
      }

      const index = audio.indexOf(src);

      if (index === -1) {
        return () => {};
      }

      return () => {
        const a = audioRef[src]?.current;

        // https://stackoverflow.com/questions/68594620/automatically-play-audio-object-in-javascript
        a?.play().catch((_) => {
          window.addEventListener(
            "click",
            () => {
              a.play();
            },
            {once: true}
          );
        });
      };
    },
    [audio, audioRef]
  );

  return (
    <AudioContext.Provider
      value={{
        audio,
        audioRef,
        init,
        play,
        set,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const AudioContainer: FC = () => {
  const context = useContext(AudioContext);

  if (context === undefined) {
    throw new Error("useAudioContainer must be used within AudioProvider");
  }

  useEffect(() => {
    let needChange = false;
    const newRefs = {...context.audioRef};

    context.audio.forEach((src: string) => {
      if (!newRefs[src]) {
        newRefs[src] = createRef();

        needChange = true;
      }
    });

    if (needChange) {
      context.set(newRefs);
    }
  }, [context]);

  return (
    <Fragment>
      {context.audio.map((src) => (
        <audio key={src} ref={context.audioRef[src]} src={src} />
      ))}
    </Fragment>
  );
};

export const useAudio = (src: string | null): UseAudioHook => {
  const context = useContext(AudioContext);

  const onceRef = useRef<string | null>(null);

  if (context === undefined) {
    throw new Error("useAudio must be used within AudioProvider");
  }

  useEffect(() => {
    if (src === null) {
      return;
    }

    if (onceRef.current !== src && !context.audio.includes(src)) {
      onceRef.current = src;

      context.init(src);
    }
  }, [context, src]);

  return {
    play: context.play(src),
    isInit: (src && !!context.audioRef[src]) || false,
  };
};
