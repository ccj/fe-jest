import Counter from './Counter'

describe('Counter 的测试代码', () => {
    let counter = null;
    
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
        counter = new Counter();
    })
    
    afterEach(() => {
        // 在每个测试用例之前执行
        console.log('afterEach')
    })
    
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
    
    describe('测试减少相关的代码', () => {
        test('测试 Counter 中的 minusOne 方法', () => {
            counter.minusOne();
            expect(counter.number).toBe(-1);
        })
        
        test('测试 Counter 中的 minusTwo 方法', () => {
            counter.minusTwo();
            expect(counter.number).toBe(-2);
        })
    })
})

