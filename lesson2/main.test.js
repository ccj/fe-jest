const main  = require('./main.js');
const { add } = main;

test('测试加法3+7',() => {
    expect(add(3,7)). toBe(11);
})