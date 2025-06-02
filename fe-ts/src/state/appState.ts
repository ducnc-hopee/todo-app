import { TABS, TAB_LABELS, TTab } from "../constants/tab";
import { IAppState } from "../types/appState";

const currentTab = window.location.hash.replace('#', '') as TTab;

export let state: IAppState = {
    todos: [],
    currentFilter: currentTab in TAB_LABELS ? currentTab : TABS.ALL,
    currentTodoId: null,
    isAddModalOpen: false,
    isEditModalOpen: false,
    isViewModalOpen: false,
    currentTodo: null,
};

export function setState(partialState: Partial<IAppState>) {
  state = { ...state, ...partialState };
}

export function getState(): IAppState {
  return state;
}