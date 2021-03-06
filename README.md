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

|工具命令 | 翻译 |
|------|------|
|› Press f to run only failed tests. | ›按f仅运行失败的测试。|
| › Press o to only run tests related to changed files. |  ›按o仅运行与更改的文件相关的测试。|
| › Press p to filter by a filename regex pattern. |  ›按p按文件名正则表达式模式过滤。|
| › Press t to filter by a test name regex pattern. |  ›按t以测试名称正则表达式模式进行过滤。|
| › Press q to quit watch mode. |  ›按q退出监视模式|
| › Press Enter to trigger a test run. |  ›按Enter触发测试运行。|

>* 注意：o模式底层机制依赖git，通过git来知晓哪些文件是否给更改，o模式也可通过在jest --watch 配置。

## 6.异步代码的测试方法（lesson6）
引用axios，npm install axios@0.19.0 --save, axios相关可自行查看[官方文档](http://www.axios-js.com/)  

回调类型异步函数需注意，测试用例走不到回调函数里，可采用done函数来操作。
>* 声明：
>* http://www.dell-lee.com/react/api/demo.json 返回 {success: true} 用于测试返回成功  
>* http://www.dell-lee.com/react/api/demo1.json 返回 404 用于测试返回失败  
```
export const fetchData = (fn) => {
    axios.get('http://www.dell-lee.com/react/api/demo.json').then((response) => {
        fn(response.data);
    }) 
}

test('fetchData 返回结果为 { success: true }', (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            success: true
        })
        done();
    })
});
```
无异步函数类型当然会更简单了。
>* expect.assertions(1); 表示之后的代码中至少需要执行一次expect方法，否则测试用例将不通过。（在测试promise的catch情况下很有用处，根据具体情况使用）   
```
// 成功：
test('fetchDataSuccess 返回结果为 { success: true }', () => {
    return fetchDataSuccess().then((response) => {
        expect(response.data).toEqual({
            success: true
        })
    })
});
// 失败：
test('fetchDataThrow 返回结果为 404', () => {
    expect.assertions(1);
    return fetchDataThrow().catch((e) => {
        expect(e.toString().indexOf('404') > -1).toBe(true);
    });
});
```

测试异步函数的时候，我们还可以有第2种写法：
```
// 测试成功情况
test('fetchData1 返回结果为 { success: true }', () => {
    return expect(fetchData1()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
});

// 测试失败情况
test('fetchDataThrow 返回结果为 404', () => {
    return expect(fetchDataThrow()).rejects.toThrow();
});
```

当然，写法还有很多，根据个人喜好去编写测试用例即可。

## 7.Jest中的钩子函数（lesson7）
jest官方提供如下几个钩子函数
```
    beforeAll(() => {
        // 在所有测试用例之前执行
        console.log('beforeAll')
    })
    
    afterAll(() => {
        // 在所有测试用例之后执行
        console.log('afterAll')
    })
    
    beforeEach(() => {
        // 在每个测试用例之后执行
        console.log('beforeEach')
    })
    
    afterEach(() => {
        // 在每个测试用例之前执行
        console.log('afterEach')
    })

```
同时describe函数，你可以把他理解为是给测试用例分组,这对钩子函数指定作用域很有用处。

```
    describe('测试增加相关的代码', () => {
        beforeAll(() => {
            console.log('beforeAll test addOne')
        })

        beforeEach(() => {
            console.log('beforeEach test addOne')
        })
        test.only('测试 Counter 中的 addOne 方法', () => {
            counter.addOne();
            expect(counter.number).toBe(1);
        })
        
        test('测试 Counter 中的 addTwo 方法', () => {
            counter.addTwo();
            expect(counter.number).toBe(2);
        })
    }) 
```
>* 如果你想只运行这一个测试用例，可以直接test.only去写，其他的测试用例会skipped掉，这对在测试用例中定位问题很有帮助。  
>* 另外对在测试用例之前做的准备工作，最好全部都写在对应的钩子函数中，避免以后踩坑。  

具体钩子函数相关用法可参考\>>> [官网API](https://jestjs.io/docs/en/setup-teardown) <<<