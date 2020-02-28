# fe-jest
掘金：https://juejin.im/post/5e54d5ca6fb9a07c817613d4
code：https://github.com/ccj/fe-jest

## 1.自动测试及原理（lesson1）
核心代码：

```
function expect(result) {
    return {
        toBe: function(actual) {
            if(result !== actual) {
                throw new Error(`预期值和实际值不相等预期${actual} 结果却是${ result}`)
            }
        }
    }
}

function test(desc, fn) {
    try {
        fn();
        console. Log(`${desc}通过测试`)
    }catch(e) {
        console. log(`${desc}没有通过测试${e}`)
    }
}

test('测试加法3+7',() => {
    expect(add(3,7)). toBe(10);
})

```

## 2.jest模块化测试（lesson2） 
npm init 初始化代码为npm的一个包   
npm install jest@24.8.0 -D 安装jest  
jest默认封装了test以及expect的方法，可直接以commonJS方式引入和调用

单元测试=》模块化测试  
集成测试=》多个模块话化测试


## 3.jest的简单配置（lesson3）
npx jest --init  初始化node_modules下的jest  
初始化后会生成一个jest.config.js的配置文件  
npx jest --coverage 生成一个覆盖率的视图，对应在coverage文件下可找到  
将项目转为esmodule方式导出和引入，但是jest是在node环境下，支持commonJS方式语法，不支持esmodule方式的语法  
解决方法是，我们可以通过babel将esmodule方式转换为commonJS方式，这样就可以支持。  
npm install @babel/core@7.4.5 @babel/preset-env@7.4.5 -D  
babel配置
```
{
    "presets": [
        ["@babel/preset-env", {
            "targets": {
                "node": "current"
            }
        }]
    ]
}
```
通过配置完成之后，重新运行npm test恢复正常，之所以能够正常运行，他的底层机制如下:  
// npm run test         当你执行npm test的时候  
// jest (babel-jest)    jest内部集成一个babel-jest的插件，它会检查当前环境下是否安装了babel或则babel-core  
// babel-core           如果发现已经安装了babel  
// 取.babelrc           则会取.babelrc的配置  
// 在运行测试之前，结合babel, 先把代码做一次转化  
// 最后运行转化过的测试用例代码  


## 4.jest的匹配器Matcher（lesson4）
当运行npm run test时，jest会自动到项目找以test.js的文件。
在我们编写测试用例过程中，如果每次都要运行npm run test，这样就会很麻烦。
我们可以在package.json中，加上--watchAll的参数，这样就会实时去监听我们的测试用例。

简单列几个匹配器:toBe,toEqual。
匹配器有很多，不一一介绍，详见[官方匹配器API](https://jestjs.io/docs/zh-Hans/expect)

## 5.jest命令行工具的使用（lesson5）
>* jest --watchAll 模式下，运行npm run test时，控制台会有如下提示，直接看英语提示即可操作，非常简单。  

工具命令 | 翻译
-|-|-
 › Press f to run only failed tests. | ›按f仅运行失败的测试。
 › Press o to only run tests related to changed files. |  ›按o仅运行与更改的文件相关的测试。
 › Press p to filter by a filename regex pattern. |  ›按p按文件名正则表达式模式过滤。
 › Press t to filter by a test name regex pattern. |  ›按t以测试名称正则表达式模式进行过滤。
 › Press q to quit watch mode. |   ›按q退出监视模式
 › Press Enter to trigger a test run. |   ›按Enter触发测试运行。

>* 注意：o模式底层机制依赖git，通过git来知晓哪些文件是否给更改，o模式也可通过在jest --watch 配置。