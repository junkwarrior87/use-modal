# use-modal

Wrapper hooks for handling modal dialogs in React

## Install

```sh
npm i @goldfinger87/use-modal
```

## Usage

```tsx
import {Ref, useImperativeHandle} from 'react';
import {ModalHandle, useModal, useModalHandle} from '@goldfinger87/use-modal';

function Modal({handle}: { handle: Ref<ModalHandle> }) {
    const [ref, imp] = useModal();
    const {hide} = imp;
    useImperativeHandle(handle, () => imp, []);
    return <dialog ref={ref}>
        <button onClick={() => hide()}>hide</button>
        <button onClick={() => hide('returnValue')}>hide w/ value</button>
    </dialog>;
}

function App() {
    const modal = useModalHandle();
    return <>
        <Modal handle={modal}/>
        <button onClick={() => modal.current.show()}>show</button>
        <button onClick={() => modal.current.showAsync('init').then(console.log)}>showAsync</button>
    </>;
}
```