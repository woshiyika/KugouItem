import request from './http';


export function playListDetail(id) {
    return request({
        url: "/playlist/detail?id=" + id,
        method: "get",
    })
}
export function getSongDetail(params) {
    return request({
        url: "/song/detail",
        method: "get",
        params
    })
}