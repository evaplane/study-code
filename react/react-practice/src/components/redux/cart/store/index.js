import {createStore} from "redux";

import reducers from "./reducers";

// 加上后面的话下面就会出现redux
const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;