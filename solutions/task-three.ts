console.log('Task Three');

type SetState<T> = (newValue: T) => void;
type BindRerender = (callback: () => void) => void;

function useState<T>(initialValue: T): [T, SetState<T>, BindRerender] {
    let _value = initialValue;
    let _rerender = () => {};

    function setState(newValue: T) {
        _value = newValue;
        _rerender();
    }

    function _bindRerender(callback: () => void) {
        _rerender = callback;
    }

    return [_value, setState, _bindRerender];
}


type CleanupFunction = () => void;

function useEffect(effectFunction: () => void | CleanupFunction): () => void {
    const cleanup = effectFunction();
    return () => {
        if (typeof cleanup === 'function') {
            cleanup();
        }
    };
}


interface MockReact {
    useState: typeof useState;
    useEffect: typeof useEffect;
}

function mockReactEnvironment() {
    // @ts-ignore
    globalThis.React = {
        useState,
        useEffect
    } as unknown as MockReact;
}

mockReactEnvironment();

const testUseState = () => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('AO');

    useEffect(() => {
        console.log('useEffect');
    });

    return {
        count,
        setCount,
        name,
        setName
    };
}

const result = testUseState();
console.log(result);