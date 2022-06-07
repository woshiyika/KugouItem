import request from './http';

export function getMVList(params) {
    return request({
        url: "/mv/exclusive/rcmd",
        method: "get",
        params
    })
}

export function getMvDetail(mvid) {
    return request({
        url: '/mv/detail/info?mvid=' + mvid,
        method: "get",
    })
}

export function getMvUrl(id) {
    return request({
        url: '/mv/url?id=' + id,
        method: "get",
    })
}