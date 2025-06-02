export const TABS = {
    ALL: 'all',
    INCOMPLETE: 'incomplete',
    COMPLETE: 'complete'
} as const;

export type TTab = typeof TABS[keyof typeof TABS];

export const TAB_LABELS: Record<TTab, string> = {
    [TABS.ALL]: 'All',
    [TABS.INCOMPLETE]: 'Incomplete',
    [TABS.COMPLETE]: 'Complete'
};