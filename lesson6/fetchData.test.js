import { fetchData, fetchData1, fetchDataSuccess, fetchDataThrow } from './fetchData';

// 回调类型异步函数的测试
test('fetchData 返回结果为 { success: true }', (done) => {
    fetchData((data) => {
        expect(data).toEqual({
            success: true
        })
        done();
    })
});

// 没有回调类型异步函数的测试: 成功
test('fetchDataSuccess 返回结果为 { success: true }', () => {
    return fetchDataSuccess().then((response) => {
        expect(response.data).toEqual({
            success: true
        })
    })
});

// 没有回调类型异步函数的测试: 失败
test('fetchDataThrow 返回结果为 404', () => {
    expect.assertions(1);
    return fetchDataThrow().catch((e) => {
        expect(e.toString().indexOf('404') > -1).toBe(true);
    });
});

// 异步函数的另一种测试方法：成功
test('fetchDataSuccess 返回结果为 { success: true }', async () => {
    await expect(fetchDataSuccess()).resolves.toMatchObject({
        data: {
            success: true
        }
    })
});

// 异步函数的另一种测试方法：失败
test('fetchDataThrow 返回结果为 404', async () => {
    await expect(fetchDataThrow()).rejects.toThrow();
});

