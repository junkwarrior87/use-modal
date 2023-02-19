import {useRef} from 'react';

const useNonNullRef = <T>() => useRef<T>(null!);

function show(modal: HTMLDialogElement, initialValue = '') {
    modal.showModal();
    modal.returnValue = initialValue;
}

export function useModal() {
    const ref = useNonNullRef<HTMLDialogElement>();
    return [ref, {
        show: (initialValue = '') => show(ref.current, initialValue),
        showAsync: (initialValue = '') => new Promise<string>(resolve => {
            const {current} = ref;
            show(current, initialValue);
            current.addEventListener('close', () => resolve(current.returnValue), {passive: true, once: true});
        }),
        hide: (value?: string) => ref.current.close(value),
    }] as const;
}

export type ModalHandle = ReturnType<typeof useModal>[1];
export const useModalHandle = () => useNonNullRef<ModalHandle>();