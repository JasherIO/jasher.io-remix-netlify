// https://github.com/tailwindlabs/tailwindcss.com/blob/7617a606ee89065144bcfe3e6b35d2938e707c0a/src/hooks/useIsomorphicLayoutEffect.js
import { useEffect, useLayoutEffect } from 'react';

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;