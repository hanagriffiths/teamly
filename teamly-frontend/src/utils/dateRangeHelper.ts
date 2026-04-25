import dayjs from 'dayjs';
import { timeRanges } from '../constants/timeRanges';
import type { FiltersType } from '../types';

export function getDateRange(timeRange: FiltersType['timeRange']) {
    const now = dayjs("2026-04-14");
    let selectedRange: string = 'all';

    for (const range of timeRanges) {
        if (range.id === timeRange) {
            selectedRange = range.name;
        }
    }

    switch (selectedRange) {
        case 'Yesterday':
            return {
                start: now.subtract(1, 'day').startOf('day'),
                end: now.subtract(1, 'day').endOf('day'),
            };
        case 'Last Week':
            return {
                start: now.subtract(7, 'day').startOf('week'),
                end: now.subtract(7, 'day').endOf('week'),
            };
        case 'Last 2 Weeks':
            return {
                start: now.subtract(14, 'day').startOf('week'),
                end: now,
            };
        case 'all':
        default:
            return null;
    }
}