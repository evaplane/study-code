源码文件指引地址：https://www.processon.com/view/link/5dd68342e4b001fa2e0c4697

##说明
本项目用于调试源码，即修改配置使得项目中引用的 react 包来自 src/react，使得我们可以在 src/react 下 debug 和打 log 调试。

##使用步骤

1. 在根目录下安装： npm install
2. 解压 src 下的 react（v17.0.0） 压缩包，源码中有些配置需要修改，压缩包里我已经修改完，你只需要直接解压即可。（如果是自己从 github 上 clone 下来的 react 项目，请按照下面五条配置项进行修改）
3. 在根目录下启动： npm start

##其他修改

### 修改 react 包

如果想要自己重新 clone react，有以下 5 个文件需要更改：

1. /src/react/packages/react-reconciler/src/ReactFiberHostConfig.js

```jsx
//invariant(false, 'This module must be shimmed by a specific renderer.'); //sy
export * from "./forks/ReactFiberHostConfig.dom";
```

2. /src/react/packages/shared/invariant.js

```jsx
export default function invariant(condition, format, a, b, c, d, e, f) {
  if (condition) return; //加上这个
  throw new Error(
    "Internal React error: invariant() is meant to be replaced at compile " +
      "time. There is no runtime version."
  );
}
```

3. /src/react/packages/shared/ReactSharedInternals.js

```jsx
// import React from 'react';
// const ReactSharedInternals =
//   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

import ReactSharedInternals from "../react/src/ReactSharedInternals";
export default ReactSharedInternals;
```

4. /src/react/packages/scheduler/index.js

   ```jsx
   "use strict";

   export * from "./src/Scheduler";
   //添加以下
   export {
     unstable_flushAllWithoutAsserting,
     unstable_flushNumberOfYields,
     unstable_flushExpired,
     unstable_clearYields,
     unstable_flushUntilNextPaint,
     unstable_flushAll,
     unstable_yieldValue,
     unstable_advanceTime
   } from "./src/SchedulerHostConfig.js";
   ```

5. react/packages/scheduler/src/SchedulerHostConfig.js

```js
// 注释掉这里
// throw new Error('This module must be shimmed by a specific build.');

// 添加以下
export {
  unstable_flushAllWithoutAsserting,
  unstable_flushNumberOfYields,
  unstable_flushExpired,
  unstable_clearYields,
  unstable_flushUntilNextPaint,
  unstable_flushAll,
  unstable_yieldValue,
  unstable_advanceTime
} from "./forks/SchedulerHostConfig.mock.js";

export {
  requestHostCallback,
  requestHostTimeout,
  cancelHostTimeout,
  shouldYieldToHost,
  getCurrentTime,
  forceFrameRate,
  requestPaint
} from "./forks/SchedulerHostConfig.default.js";
```
