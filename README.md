# @crfmn/use-audio

A React hook for audio manipulation, providing easy audio management within your React application. This package offers an `AudioProvider` for context, an `AudioContainer` for rendering audio elements, and a `useAudio` hook for controlling audio playback.

## Installation

To install the package, run:

```bash
npm install @crfmn/use-audio
```

## Usage

### AudioProvider

Wrap your component tree with `AudioProvider` to provide audio context to your components.

```tsx
import { AudioProvider } from '@crfmn/use-audio';

const App: FC = () => (
  <AudioProvider>
    <YourComponent />
  </AudioProvider>
);
```

### AudioContainer

Use `AudioContainer` to render the audio elements managed by the context.

```tsx
import { AudioContainer } from '@crfmn/use-audio';

const YourComponent: FC = () => (
  <div>
    <AudioContainer />
  </div>
);
```

### useAudio Hook

The `useAudio` hook allows you to initialize and play audio within your components.

```tsx
import { useAudio } from '@crfmn/use-audio';

const PlayButton: FC = () => {
  const { play, isInit } = useAudio("path/to/your/audio/file.mp3");

  return (
    <button onClick={play} disabled={!isInit}>
      Play
    </button>
  );
};
```

## Example

Here is a complete example combining `AudioProvider`, `AudioContainer`, and `useAudio`:

```tsx
import React, { FC } from 'react';
import { AudioProvider, AudioContainer, useAudio } from '@crfmn/use-audio';

const AudioPlayer: FC = () => {
  const { play, isInit } = useAudio("path/to/your/audio/file.mp3");

  return (
    <div>
      <button onClick={play} disabled={!isInit}>
        Play
      </button>
      <AudioContainer />
    </div>
  );
};

const App: FC = () => (
  <AudioProvider>
    <AudioPlayer />
  </AudioProvider>
);

export default App;
```

## API

### AudioProvider

`AudioProvider` is a context provider that manages the state and logic for the audio elements.

```tsx
<AudioProvider>
  {children}
</AudioProvider>
```

### AudioContainer

`AudioContainer` renders the audio elements based on the audio sources provided in the context.

```tsx
<AudioContainer />
```

### useAudio

`useAudio` hook provides functions to initialize and play audio.

#### Parameters

- `src: string | null` - The source URL of the audio file.

#### Returns

- `play: () => void` - Function to play the audio.
- `isInit: boolean` - Indicates if the audio source has been initialized.

```ts
const { play, isInit } = useAudio(src);
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub.

## License

MIT License. See LICENSE for details.

## Author

Alex Craftsman
- Website: https://crf.mn/
- Email: alx@crf.mn
- GitHub: https://github.com/Alex-Craftsman