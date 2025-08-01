import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  colorScheme: localStorage.getItem('colorScheme') || 'default',
  fontSize: localStorage.getItem('fontSize') || 'medium',
  animations: localStorage.getItem('animations') !== 'false',
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
};

// Action types
const THEME_ACTIONS = {
  SET_THEME: 'SET_THEME',
  SET_COLOR_SCHEME: 'SET_COLOR_SCHEME',
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  TOGGLE_ANIMATIONS: 'TOGGLE_ANIMATIONS',
  SET_REDUCED_MOTION: 'SET_REDUCED_MOTION',
  RESET_PREFERENCES: 'RESET_PREFERENCES',
};

// Reducer
const themeReducer = (state, action) => {
  switch (action.type) {
    case THEME_ACTIONS.SET_THEME:
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        theme: action.payload,
      };

    case THEME_ACTIONS.SET_COLOR_SCHEME:
      localStorage.setItem('colorScheme', action.payload);
      return {
        ...state,
        colorScheme: action.payload,
      };

    case THEME_ACTIONS.SET_FONT_SIZE:
      localStorage.setItem('fontSize', action.payload);
      return {
        ...state,
        fontSize: action.payload,
      };

    case THEME_ACTIONS.TOGGLE_ANIMATIONS:
      const newAnimationsState = !state.animations;
      localStorage.setItem('animations', newAnimationsState.toString());
      return {
        ...state,
        animations: newAnimationsState,
      };

    case THEME_ACTIONS.SET_REDUCED_MOTION:
      return {
        ...state,
        reducedMotion: action.payload,
      };

    case THEME_ACTIONS.RESET_PREFERENCES:
      localStorage.removeItem('theme');
      localStorage.removeItem('colorScheme');
      localStorage.removeItem('fontSize');
      localStorage.removeItem('animations');
      return {
        theme: 'light',
        colorScheme: 'default',
        fontSize: 'medium',
        animations: true,
        reducedMotion: state.reducedMotion,
      };

    default:
      return state;
  }
};

// Create context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, initialState);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme class
    root.classList.remove('light', 'dark');
    root.classList.add(state.theme);
    
    // Apply color scheme
    root.setAttribute('data-color-scheme', state.colorScheme);
    
    // Apply font size
    root.setAttribute('data-font-size', state.fontSize);
    
    // Apply animations preference
    if (!state.animations || state.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [state.theme, state.colorScheme, state.fontSize, state.animations, state.reducedMotion]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e) => {
      dispatch({
        type: THEME_ACTIONS.SET_REDUCED_MOTION,
        payload: e.matches,
      });
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Auto-detect system theme preference
  useEffect(() => {
    if (state.theme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e) => {
        const systemTheme = e.matches ? 'dark' : 'light';
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(systemTheme);
      };

      handleChange(mediaQuery);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [state.theme]);

  // Theme functions
  const setTheme = (theme) => {
    dispatch({ type: THEME_ACTIONS.SET_THEME, payload: theme });
  };

  const setColorScheme = (scheme) => {
    dispatch({ type: THEME_ACTIONS.SET_COLOR_SCHEME, payload: scheme });
  };

  const setFontSize = (size) => {
    dispatch({ type: THEME_ACTIONS.SET_FONT_SIZE, payload: size });
  };

  const toggleAnimations = () => {
    dispatch({ type: THEME_ACTIONS.TOGGLE_ANIMATIONS });
  };

  const resetPreferences = () => {
    dispatch({ type: THEME_ACTIONS.RESET_PREFERENCES });
  };

  // Get current effective theme
  const getEffectiveTheme = () => {
    if (state.theme === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return state.theme;
  };

  // Check if dark mode is active
  const isDarkMode = getEffectiveTheme() === 'dark';

  // Color scheme options
  const colorSchemes = {
    default: {
      name: 'Default',
      primary: '#7c6df2',
      secondary: '#f97316',
      accent: '#14b8a6',
    },
    blue: {
      name: 'Ocean Blue',
      primary: '#3b82f6',
      secondary: '#06b6d4',
      accent: '#8b5cf6',
    },
    green: {
      name: 'Nature Green',
      primary: '#22c55e',
      secondary: '#84cc16',
      accent: '#f59e0b',
    },
    purple: {
      name: 'Royal Purple',
      primary: '#8b5cf6',
      secondary: '#ec4899',
      accent: '#f97316',
    },
    warm: {
      name: 'Warm Sunset',
      primary: '#f59e0b',
      secondary: '#ef4444',
      accent: '#8b5cf6',
    },
  };

  // Font size options
  const fontSizes = {
    small: {
      name: 'Small',
      scale: '0.875',
    },
    medium: {
      name: 'Medium',
      scale: '1',
    },
    large: {
      name: 'Large',
      scale: '1.125',
    },
    xlarge: {
      name: 'Extra Large',
      scale: '1.25',
    },
  };

  // Context value
  const value = {
    ...state,
    setTheme,
    setColorScheme,
    setFontSize,
    toggleAnimations,
    resetPreferences,
    getEffectiveTheme,
    isDarkMode,
    colorSchemes,
    fontSizes,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
