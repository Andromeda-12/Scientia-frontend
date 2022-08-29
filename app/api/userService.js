import instance from "./instance";

export default class userService {
  static getUsers = (query) => {
    if (!query) return instance.get("/user");

    return instance.get("/user", { params: { ...query } });
  };
}
