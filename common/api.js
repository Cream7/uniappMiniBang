import Request from '@/utils/requset.js'
let request = new Request().http


export default {
    // map页面
    getCompanyInfoList(data) {
        return request({
            url: "getCompanyInfoList",
            method: "GET", 
            data: data
        })
    },
}