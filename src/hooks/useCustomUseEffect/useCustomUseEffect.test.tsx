import { renderHook } from '@testing-library/react-hooks';
import { useCustomUseEffect } from './useCustomUseEffect';

// Test suite
describe('useCustomUseEffect', () => {
  it('should run effect on initial render', () => {
    const spyEffect = jest.fn();
    renderHook(() =>
      useCustomUseEffect(() => {
        spyEffect();
        return () => {};
      }, [])
    );

    // Ensure the effect runs on initial render
    expect(spyEffect).toHaveBeenCalledTimes(1);
  });

  it('should perform cleanup and rerun effect on dependency change', () => {
    const spyEffect = jest.fn();
    const spyCleanup = jest.fn();
    const { rerender } = renderHook(
      ({ count }) =>
        useCustomUseEffect(() => {
          spyEffect();
          return () => {
            spyCleanup();
          };
        }, [count]),
      { initialProps: { count: 1 } }
    );

    // Ensure effect runs on initial render
    expect(spyEffect).toHaveBeenCalledTimes(1);
    expect(spyCleanup).not.toHaveBeenCalled();

    // Trigger a dependency change
    rerender({ count: 2 });

    // Ensure cleanup runs before the new effect
    expect(spyCleanup).toHaveBeenCalledTimes(1);
    expect(spyEffect).toHaveBeenCalledTimes(2);
  });

  it('should call cleanup on component unmount', () => {
    const spyCleanup = jest.fn();
    const { unmount } = renderHook(() =>
      useCustomUseEffect(() => {
        return () => {
          spyCleanup();
        };
      }, [])
    );

    // Ensure cleanup runs on unmount
    unmount();
    expect(spyCleanup).toHaveBeenCalledTimes(1);
  });
});
