import { useRef } from 'react';

type CleanupCallback = void | (() => void) | Promise<void> | (() => Promise<void>);
type EffectCallback = () => CleanupCallback | void;
type DependencyList = readonly unknown[];

/**
 * Checks if dependencies have changed between renders.
 * @param prevDeps - Previous dependency list
 * @param deps - Current dependency list
 * @returns True if dependencies have changed, false otherwise
 */
const didDependenciesChange = (prevDeps: DependencyList, deps: DependencyList): boolean => {
  if (prevDeps.length !== deps.length) {
    console.warn("The length of the dependencies array must remain consistent between renders.");
    return true; // Return true if lengths are different as it's a change
  }

  return deps.some((dep, index) => !Object.is(dep, prevDeps[index]));
};

/**
 * Custom hook that mimics the behavior of useEffect without using useEffect or useLayoutEffect.
 * @param effect - Effect callback to be executed
 * @param deps - Dependency list to determine when to re-run the effect
 */
export const useCustomUseEffect = (effect: EffectCallback, deps: DependencyList) => {
  const prevDeps = useRef<DependencyList>([]); // Store the previous dependencies
  const isFirstRender = useRef(true); // Flag to check if it's the first render
  const cleanup = useRef<CleanupCallback | null>(null); // Store the cleanup function

  // Helper to run the cleanup function if it's callable
  const runCleanup = async () => {
    if (typeof cleanup.current === 'function') {
      const result = cleanup.current();
      if (result instanceof Promise) {
        await result;
      }
    }
  };

  // Handle the first render separately
  if (isFirstRender.current) {
    isFirstRender.current = false;
    cleanup.current = effect() || null;
  } else {
    // Check if dependencies have changed
    const isDepsChanged = didDependenciesChange(prevDeps.current, deps);

    // If dependencies have changed, run the cleanup function and then the effect
    if (isDepsChanged) {
      runCleanup().then(() => {
        cleanup.current = effect() || null;
      });
    }
  }

  // Update the previous dependencies to the current ones after cleanup and effect
  prevDeps.current = deps;
};
