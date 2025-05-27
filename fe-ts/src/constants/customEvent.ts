export const EVENTS = Object.freeze
({
  OPEN_EDIT_MODAL: 'OPEN_EDIT_MODAL',
  OPEN_VIEW_MODAL: 'OPEN_VIEW_MODAL',
});

export type TEvents = typeof EVENTS[keyof typeof EVENTS];