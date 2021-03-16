import less from "./css/index.less"
console.lg('hello webpack');

/**
 * sourceMap:源码与bundle代码之间的映射关系
 * 适合开发环境：
 * 		eval
 * 		eval-source-map
 * 		eval-cheap-source-map
 * 		eval-module-cheap-source-map
 * 适合生产环境
 * 		none
 * 		hidden-source-map
 */