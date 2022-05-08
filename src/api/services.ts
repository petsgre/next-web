import { instance } from "./request"
export const login = (data) => {
  return instance.request({
    data,
    method: "post",
    url: "/api/user/login",
  })
}
export const getUserList = (config) => {
  return instance.request({
    method: "get",
    url: "http://192.168.1.104:8020/user",
    ...config,
  })
}
export const getUserById = (id, config) => {
  return instance.request({
    method: "get",
    url: `http://192.168.1.104:8020/user/${id}`,
    ...config,
  })
}
