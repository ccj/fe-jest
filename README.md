# fe-jest
前端要学的测试课

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
拷贝一份lesson1代码    
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
