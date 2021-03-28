
const times = {}

const t = performance.getEntriesByType("navigation")[0]

// dns时间
times.dns = t.domainLookupEnd - t.domainLookupStart

// response时间
times.resTime = t.responseEnd - t.responseStart

// tcp时间
times.tcp = t.connectEnd - t.connectStart

// 白屏时间 从apache到processing开始
times.blankTime = t.domInteractive - t.fetchStart

// 首屏时间 
times.startTime = t.contentLoadEventEnd - t.fetchStart

// dom渲染的时间
times.domParse = t.domComplete - t.domInteractive;

console.table(times)
console.table(t)