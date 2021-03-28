(function(modules){
			function require(module){
				function newRequire(relativePath){
					return require(modules[module].yilai[relativePath])
				}
				const exports = {};
				(function(exports,require,code){
					eval(code);
				})(exports,newRequire,modules[module].code)

				return exports;
			}
			require("src/index.js")
		})({"src/index.js":{"yilai":{"./a.js":"./src/a.js"},"code":"\"use strict\";\n\nvar _a = require(\"./a.js\");\n\nconsole.log(\"\".concat(_a.a, \"hello webpack\"));"},"./src/a.js":{"yilai":{"./b.js":"./src/b.js"},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.a = void 0;\n\nvar _b = require(\"./b.js\");\n\nvar a = \"eva\" + _b.b;\nexports.a = a;"},"./src/b.js":{"yilai":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.b = void 0;\nvar b = \"!!!!!\";\nexports.b = b;"}})