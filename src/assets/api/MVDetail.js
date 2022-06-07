import request from './http';

export function getMvDetail(mvid) {
    return request({
        url: "/mv/detail?mvid=" + mvid,
        method: "get",
    })
}

export function getMvUrl(id) {
    return request({
        url: '/mv/url?id=' + id,
        method: "get",
    })
}

export function getMvXS(id) {
    return request({
        url: '/simi/mv?mvid=' + id,
        method: "get",
    })
}

export function getMvComment(id) {
    return request({
        url: '/comment/mv?id=' + id,
        method: "get",
    })
}