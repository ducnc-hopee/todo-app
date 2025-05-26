export const TABS = Object.freeze({
    ALL: 'all',
    INPROCESS: 'complete',
    COMPLETED: 'incomplete'
})

export type TTab = typeof TABS[keyof typeof TABS];

export const TAB_LABELS = Object.freeze({
    [TABS.ALL]: 'ALL',
    [TABS.INPROCESS]: '2',
    [TABS.COMPLETED]: '3'
})