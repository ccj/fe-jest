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
拷贝一份lesson1代码。
npm init 初始化代码为npm的一个包
npm install jest@24.8.0 -D 安装jest
jest默认封装了test以及expect的方法，可直接以commonJS方式引入和调用

单元测试=》模块化测试
集成测试=》多个模块话化测试