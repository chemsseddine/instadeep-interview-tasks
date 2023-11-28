console.log('Task Two');

interface Action {
    type: string;
    [key: string]: any;
}

type Reducer<S, A> = (state: S | undefined, action: A) => S;

type Listener = () => void;

interface Store<S, A> {
    subscribe: (listener: Listener) => () => void;
    getState: () => S;
    dispatch: (action: A) => void;
}

function createStore<S, A extends Action>(reducer: Reducer<S, A>): Store<S, A> {
    let state: S;
    let listeners: Listener[] = [];

    const getState = () => state;

    const dispatch = (action: A) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    };

    const subscribe = (listener: Listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({} as A);

    const handler = {
        get: (target: any, prop: string) => {
            if (['subscribe', 'dispatch', 'getState'].includes(prop)) {
                return target[prop];
            }
        },
        set: () => {
            console.log('State mutation is not allowed directly. Please use dispatch.');
            return true;
        }
    };

    return new Proxy({
        subscribe,
        getState,
        dispatch
    }, handler);
}


const resultStore = createStore<number, Action>((state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        default:
            return state;
    }
});

resultStore.subscribe(() => {
    console.log('State changed');
});

resultStore.dispatch({ type: 'INCREMENT' });

console.log(resultStore.getState());
