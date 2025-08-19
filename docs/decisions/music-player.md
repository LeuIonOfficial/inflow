# Music Player Library Decision

## Context

We need to implement a global, persistent music player for the RockBand portfolio website that:

- Works with Next.js SSR/SSG
- Supports playlists and programmatic control
- Persists state across route changes
- Provides keyboard shortcuts
- Has a clean, customizable UI

## Options Evaluated

### 1. Howler.js + Custom React Wrapper

**Pros:**

- Excellent browser compatibility and audio format support
- Lightweight (~25KB gzipped)
- Robust audio handling with fallbacks
- Well-maintained and battle-tested
- Works perfectly with SSR (no DOM dependencies during initialization)
- Excellent programmatic control
- Built-in support for spatial audio, fading, and advanced features

**Cons:**

- No built-in UI components (need custom implementation)
- Requires more development time for UI/UX
- Need to handle playlist management manually

**SSR Compatibility:** ✅ Excellent - No DOM dependencies during server rendering

### 2. WaveSurfer.js

**Pros:**

- Beautiful waveform visualizations
- Excellent for audio analysis and editing interfaces
- Good plugin ecosystem
- Strong community support

**Cons:**

- Heavier bundle size (~100KB+)
- Primarily designed for waveform visualization, not music playback
- More complex setup for simple music player use cases
- Canvas-based rendering can be resource intensive
- SSR requires careful handling of canvas elements

**SSR Compatibility:** ⚠️ Moderate - Requires client-side initialization

### 3. React H5 Audio Player

**Pros:**

- Ready-to-use React component
- Built-in responsive UI
- Good customization options
- TypeScript support
- Playlist support

**Cons:**

- Limited control over advanced audio features
- Less flexible for complex audio manipulations
- Styling customization can be challenging
- Smaller community compared to Howler.js
- Some SSR hydration issues reported

**SSR Compatibility:** ⚠️ Moderate - Requires careful hydration handling

### 4. React Player

**Pros:**

- Supports multiple media types (YouTube, Vimeo, SoundCloud, etc.)
- Good for mixed media playlists
- Active development
- Good documentation

**Cons:**

- Overkill for audio-only use cases
- Larger bundle size
- External dependencies for streaming services
- Less control over pure audio playback features

**SSR Compatibility:** ⚠️ Moderate - External service dependencies

### 5. Tone.js

**Pros:**

- Excellent for interactive audio applications
- Web Audio API wrapper with advanced features
- Great for music production tools
- Powerful synthesis and effects

**Cons:**

- Overkill for simple music playback
- Large bundle size
- Complex API for basic use cases
- Learning curve

**SSR Compatibility:** ⚠️ Moderate - Web Audio API dependencies

## Decision: Howler.js + Custom React Implementation

### Rationale

After evaluating all options, **Howler.js with a custom React wrapper** is the best choice for our use case because:

1. **SSR Compatibility**: Perfect for Next.js - no DOM dependencies during server rendering
2. **Performance**: Lightweight and optimized for music playback
3. **Reliability**: Battle-tested library used by major applications
4. **Flexibility**: Complete control over UI/UX to match our design system
5. **Features**: All required functionality (playlists, global state, keyboard shortcuts)
6. **Maintenance**: Active development and excellent documentation

### Implementation Plan

1. **Core Audio Manager**: Create a React Context with Howler.js for audio management
2. **Global Player Component**: Persistent mini-player that survives route changes
3. **Playlist Management**: Custom playlist logic with queue, shuffle, repeat modes
4. **Keyboard Shortcuts**: Global hotkeys for play/pause, next/prev, volume
5. **State Persistence**: localStorage integration for player state
6. **UI Components**: Custom components matching our shadcn/ui design system

### Technical Architecture

```typescript
// Core audio management with Howler.js
class AudioManager {
  private howl: Howl | null = null;
  private playlist: Track[] = [];
  private currentIndex: number = 0;

  play(track?: Track) {
    /* ... */
  }
  pause() {
    /* ... */
  }
  next() {
    /* ... */
  }
  prev() {
    /* ... */
  }
  setVolume(volume: number) {
    /* ... */
  }
}

// React Context for global state
const AudioContext = createContext<AudioContextType>();

// Global player component
const GlobalAudioPlayer = () => {
  // Mini player UI that persists across routes
  // Expandable to full player
  // Keyboard shortcut handling
};
```

### Bundle Impact

- Howler.js: ~25KB gzipped
- Custom React components: ~10-15KB estimated
- Total addition: ~35-40KB (acceptable for the functionality provided)

### Development Timeline

- **Week 1**: Core AudioManager and Context setup
- **Week 2**: Basic player UI and controls
- **Week 3**: Playlist management and advanced features
- **Week 4**: Keyboard shortcuts and state persistence
- **Week 5**: Testing, optimization, and polish

## Alternative Considered

If development time becomes a constraint, **React H5 Audio Player** would be the fallback option, accepting some limitations in customization for faster implementation.

## Success Metrics

- Player works seamlessly across all routes
- No audio interruptions during navigation
- Keyboard shortcuts work globally
- Player state persists across browser sessions
- Lighthouse performance score remains >90
- No SSR hydration errors

---

_Decision made: December 2024_
_Review date: March 2025_
