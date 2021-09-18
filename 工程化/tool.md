##### 脚手架
	自动创建项目基础文件的工具
	1. 约定
		- 相同文件组织结构，代码开发范式，模块依赖，工具配置
	2. 脚手架工具 (集成的工程化方案)
		- create-react-app
		- vue-cli
		- angular-cli
		- yeoman通用型
		- [Plop小型的脚手架工具](https://plopjs.com)

##### yeoman  
 	最老牌、最强大、最通用的脚手架工具，通过创建自己的Generator定制项目基础
	- 使用步骤 
		1. 明确需求 2. 找到合适的[Generator](https://yeoman.io/generators/)/定制自己的Generator
		3. npm i generator-xxx 4. yo xxx启动与生成
	- 自定义 模块名必须是generator-xxx形式
		1. 基本的 Generator 结构 (yo xxx默认app目录)
			├─ generators/ ········································ 生成器目录
			│  └─ app/ ············································ 默认生成器目录
			│     └─ index.js ····································· 默认生成器实现
			└─ package.json
		2. 多个 Sub Generator (yo xxx:component)
			├─ generators/ ········································ 生成器目录
			│  ├─ app/ ············································ 默认生成器目录
			│  │  └─ index.js ····································· 默认生成器实现
			+│  └─ component/ ······································ 其他生成器目录
			+│     └─ index.js ····································· 其他生成器实现
			└─ package.json ······································· 模块包配置文件	
		// 举个栗子
		```javascript
		module.exports = class extends Generator {
			prompting() {
				const prompts = [
					{
						type: 'input',
						name: 'name',
						message: 'Your project name?',
						default: this.appname
					}
				];
				return this.prompt(prompts).then(answers => { 
					this.answers = answers;
				});
			}
			writing() { 
				this.fs.copyTpl(glob.sync(this.templatePath('**/*'), { dot: true }), this.destinationPath(), this.answers);
			}
			install() { 
				this.yarnInstall();
			}
		};
		```



##### vite
	面向现代浏览器的一个更轻，更快的web应用开发工具
	1. 背景
		- webpack dev server冷启动时间长
		- webpack 热更速度慢
	2. 上手
		- 安装
			- npm init vite-app <project-name>
			- yarn create vite-app <project-name>
		- 特性
			- 利用现代浏览器原生支持 ESM 特性，不打包模块。
			- 对需要编译的文件采用即时编译(按需编译)
			- optimizeDeps

