import request from "./http";

export function getSongList() {
    return request({
        url: "/top/playlist",
        method: "get",
    })
}