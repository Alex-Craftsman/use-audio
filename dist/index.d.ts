import { type FC, type PropsWithChildren, type RefObject } from "react";
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
export declare const AudioContext: import("react").Context<UseAudioContext | undefined>;
export declare const AudioProvider: FC<PropsWithChildren>;
export declare const AudioContainer: FC;
export declare const useAudio: (src: string | null) => UseAudioHook;
export {};
