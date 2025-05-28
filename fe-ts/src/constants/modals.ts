export const MODAL_TYPES = Object.freeze({
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK',
    VIEW_TASK: 'VIEW_TASK',
    }); 

    export type TModalTypes = typeof MODAL_TYPES[keyof typeof MODAL_TYPES];