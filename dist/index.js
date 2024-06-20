"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, createRef, useCallback, useContext, useEffect, useRef, useState, Fragment, } from "react";
export const AudioContext = createContext(undefined);
export const AudioProvider = ({ children, }) => {
    const [audio, setAudio] = useState([]);
    const [audioRef, audioRefSet] = useState({});
    const init = useCallback((src) => {
        setAudio((prev) => {
            if (prev.includes(src)) {
                return prev;
            }
            return [...prev, src];
        });
    }, []);
    const set = useCallback((ref) => {
        audioRefSet(ref);
    }, []);
    const play = useCallback((src) => {
        if (src === null) {
            return () => { };
        }
        const index = audio.indexOf(src);
        if (index === -1) {
            return () => { };
        }
        return () => {
            var _a;
            const a = (_a = audioRef[src]) === null || _a === void 0 ? void 0 : _a.current;
            // https://stackoverflow.com/questions/68594620/automatically-play-audio-object-in-javascript
            a === null || a === void 0 ? void 0 : a.play().catch((_) => {
                window.addEventListener("click", () => {
                    a.play();
                }, { once: true });
            });
        };
    }, [audio, audioRef]);
    return (_jsx(AudioContext.Provider, { value: {
            audio,
            audioRef,
            init,
            play,
            set,
        }, children: children }));
};
export const AudioContainer = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error("useAudioContainer must be used within AudioProvider");
    }
    useEffect(() => {
        let needChange = false;
        const newRefs = Object.assign({}, context.audioRef);
        context.audio.forEach((src) => {
            if (!newRefs[src]) {
                newRefs[src] = createRef();
                needChange = true;
            }
        });
        if (needChange) {
            context.set(newRefs);
        }
    }, [context]);
    return (_jsx(Fragment, { children: context.audio.map((src) => (_jsx("audio", { ref: context.audioRef[src], src: src }, src))) }));
};
export const useAudio = (src) => {
    const context = useContext(AudioContext);
    const onceRef = useRef(null);
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
//# sourceMappingURL=index.js.map