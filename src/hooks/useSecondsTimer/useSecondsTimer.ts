import { useCallback, useEffect, useState } from 'react';

export interface UseSecondsTimerOutput {
    counter: number;
    finished: boolean;
    restart: () => void;
}

export const DISABLED_TIMER = 0;
export const DEFAULT_TIMER = 59;
const SECOND = 1000;

const calculateEndTime = (currentTime: number): number => Date.now() + currentTime * SECOND;
const calculateCurrentTime = (endTime: number): number => Math.round((endTime - Date.now()) / SECOND);

export function useSecondsTimer(time: number = DEFAULT_TIMER): UseSecondsTimerOutput {
    const [counter, setCounter] = useState<number>(time);

    const restart = useCallback(() => {
        setCounter(time);
    }, [time]);

    useEffect(() => {
        setCounter(time);
    }, [time]);

    useEffect(() => {
        const endTime = calculateEndTime(counter);
        const timer = counter > 0 && setInterval(() => setCounter(calculateCurrentTime(endTime)), SECOND);

        return () => clearInterval(timer);
    }, [counter]);

    const finished = counter <= 0;

    return { counter, finished, restart };
}
