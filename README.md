# Writing a basic useEffect from scratch
Complexity: Mid-Senior  
Time: up to 30 minutes  
Areas of expertise: React, advanced JavaScript/TypeScript, component lifecycle

Imagine that we’re in a world where hooks exist but useEffect somehow doesn’t.
Your task is to recreate the basic functions of useEffect by essentially making a polyfill.
The basic functions include:


- Execute the function on the first render.  
- Find a way to determine if it’s the first render.  
- Cache the dependencies in order to compare after they have changed.  
- Execute the effect again in case the dependencies have changed.  
- Manage the cleanUp function and execute it after the effect.    

A different example of a solution can be found in this [article](https://dev.to/joaquinniembro/writing-useeffect-from-scratch-2gbm) by Joaquin-Niembro.

Further complications:

- Asynchronous Effects: Modify the task so that the effects can be asynchronous, meaning the function passed to the "useEffect" equivalent can return a promise or be an async function.
- Conditional Dependencies: Introduce a scenario where the effect should only run if certain conditions are met, i.e., based on a combination of state variables or props.
- Dependency Comparison: Implement a more sophisticated mechanism for comparing dependencies, such as deep object comparison or custom comparison functions for specific types.
- Circular Dependencies: Consider scenarios where dependencies are interdependent or circular, and ensure that the effect behaves predictably in such cases.
