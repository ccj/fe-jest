import { fetchData, fetchData1 } from './fetchData';

// 回调类型异步函数的测试
test('fetchData 返回结果为 { success: true }', (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            success: true
        })
        done();
    })
});

// 没有回调类型异步函数的测试
test('fetchData1 返回结果为 { success: true }', () => {
    return fetchData1().then((response) => {
        expect(response.data).toEqual({
            success: true
        })
    })
});

