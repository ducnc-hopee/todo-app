type ModalInitOptions = {
    onSubmit?: (...args: any[]) => void;
    onClose: () => void;
    open?: boolean;
    todo?: any;
};

export function initModal(modalComponent: Function, options: ModalInitOptions) {
    modalComponent(options);
}

type ModalInitOptions2 = {
    onAddClick: () => void; 
}

export function initModal1(modalComponent1: Function, options1: ModalInitOptions2)
{
    modalComponent1(options1)
}

