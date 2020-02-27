test('测试10与10相匹配',() => {
    // toBe 匹配器 matchers 类似于===
    expect(10).toBe(10);
})

test('测试对象内容相等',() => {
    // toEqual 匹配器
    const a = { one: 1 };
    expect(a).toEqual({ one: 1 });
})