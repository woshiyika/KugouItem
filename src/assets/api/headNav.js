import request from './http';

export function getUserDetail(uid) {
    return request({
        url: "/user/detail?uid=" + uid,
        method: "get",
    })
}