import { TEvents } from "../constants/customEvent";

export function publish<T>(eventName: TEvents, data: T): void {
  const event = new CustomEvent<T>(eventName, { detail: data });
  window.dispatchEvent(event);
}

export function subscribe<T>(
  eventName: TEvents,
  callback: (data: T) => void
): () => void {
  const handler = (event: Event) => {
    const customEvent = event as CustomEvent<T>;
    callback(customEvent.detail);
  };

  window.addEventListener(eventName, handler);

  return () => {
    window.removeEventListener(eventName, handler);
  };
}
