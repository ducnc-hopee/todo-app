export const EVENTS = Object.freeze({
  OPEN_MODAL: "open_modal",
});

export type TEvents = typeof EVENTS[keyof typeof EVENTS];