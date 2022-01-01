export function createStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(createStore)(reducer);
    }

    let currentState = undefined;
    let currentListeners = [];

    /**
     * 获取当前State
     * @param {*} params
     */
    function getState(params) {
        return currentState;
    }

    /**
     * 执行数据操作，并触发监听实践
     * @param {*} params
     */
    function dispatch(action) {
        currentState = reducer(currentState, action);
        // 监听函数是一个数组
        currentListeners.map((listener) => listener());
    }

    function subscribe() {
        currentListeners.push(listener);
    }

    // 触发一次，保证值和项目中的不同
    dispatch({ type: "@INIT/JKDJKDJ" });

    return {
        getState,
        dispatch,
        subscribe,
    };
}

export function applyMiddleware(...middlewares) {
    return (createStore) => (...args) => {
        const store = createStore(...args);
        let dispatch = store.dispatch;

        const middleAPpi = {
            getState: store.getState,
            dispatch,
        };

        const middlewareChain = middlewares.map((middleware) =>
            middleware(middleApi)
        );


        dispatch = compose(...middlewareChain)(dispatch);

        return {
            ...store,
            dispatch,
        };
    };
}

export function compose(...funcs) {
    if (funcs.length === 0) {
        return (arg) => arg;
    }
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
