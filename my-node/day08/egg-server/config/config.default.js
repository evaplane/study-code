/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1614138707882_2523';

  // add your middleware config here
  config.middleware = ['errorHandler'];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.swaggerdoc = {
	dirScanner: './app/controller',
	apiInfo: {
		title: 'eva接口',
		description: 'eva接口 swagger-ui for egg',
		version: '1.0.0',
	},
	schemes: ['http', 'https'],
	consumes: ['application/json'], // 指定处理请求的提交内容类型
	produces: ['application/json'], // 指定返回的内容类型
	enableSecurity: false, // 是否启用授权
	routerMap: true, // 是否启用自动生成路由
	enable: true,
  }
  config.mongoose = {
	url: 'mongodb://127.0.0.1:27017/egg_x',
	options: {
	// useMongoClient: true,
		autoReconnect: true,
		reconnectTries: Number.MAX_VALUE,
		bufferMaxEntries: 0,
	},
  }

  config.jwt = {
	secret: 'Great4-M',
	enable: true, // default is false
	match: /^\/api/, // optional
  }
	
	

  return {
    ...config,
    ...userConfig,
  };
};
