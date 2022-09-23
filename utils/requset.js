import operate from '../common/operate.js'

export default class Request {
    http(param) {
        // 请求参数
        const url = param.url,
            data = param.data || {};
        let method = param.method,
            header = {},
            hideLoading = param.hideLoading || true;
        //拼接完整请求地址
        const requestUrl = operate.api + url;
        //拼接完整请求地址（根据环境切换）
        // var requestUrl = operate.api() + url;
        //请求方式:GET或POST(POST需配置
        // header: {'content-type' : "application/x-www-form-urlencoded"},)
        if (method) {
            method = method.toUpperCase(); //小写改为大写
            if (method == "POST") {
                header = {
                    'content-type': "application/x-www-form-urlencoded"
                };
            } else {
                header = {
                    'content-type': "application/json"
                };
            }
        }
        if (!hideLoading) {
            uni.showLoading({
                title: '加载中...'
            });
        };
        return new Promise((resolve, reject) => {
            uni.request({
                url: requestUrl,
                data: data,
                method: method,
                header: header,
                success: (res) => {
                    if (res.statusCode && res.statusCode != 200) {
                        uni.showToast({
                            title: res.errMsg,
                            icon: 'none'
                        });
                        return;
                    }
                    resolve(res.data);
                },
                fail: (err) => {
                    uni.showToast({
                        title: err.data.msg,
                        icon: 'none'
                    });
                    resolve(err.data);
                },
                complete() {
                    if (!hideLoading) {
                        uni.hideLoading();
                    }
                    resolve();
                    return;
                }
            })
        })
    }
}