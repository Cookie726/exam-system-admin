import {
    get,
    // post
} from "../utils/request"

export const annexUpload = (data) => {
    console.log("附件上传data：", data)
    return Promise.resolve({
        code: 0,
        msg: "",
        data: "http://www.liskarm.xyz:80/AixinMarket/upload/1bb1264d-4c97-48fd-afd6-3a1e7985f436.jpg"
    })
}

export const imageUpload = (data) => {
    console.log("图片上传data：", data)
    return Promise.resolve({
        code: 0,
        msg: "",
        data: "http://www.liskarm.xyz:80/AixinMarket/upload/1bb1264d-4c97-48fd-afd6-3a1e7985f436.jpg"
    })
}

export const download = (fileName = '测试Mjdt9OJLWpy.txt') => {
    return get("/download", {
        fileName
    })
}