import {
  getUsers,
  getUserById,
  deleteUser,
  upsertUser,
} from "../api/controllers/userController";
import { users } from "./data/constants";
import { User } from "../entity";
import { mockResponse, mockRequest } from "./utils/testUtils";

describe("UserController", () => {
  describe("test getUsers", () => {
    beforeEach(() => {
      User.find = jest.fn();
    });
    it("should return users", async () => {
      const query = {
        search: "",
        limit: 10,
        sort: "ASC",
      };
      const req = mockRequest({ query });
      const res = mockResponse();
      User.find = jest.fn().mockReturnValue(Promise.resolve(users));
      const result = await getUsers(req, res);
      expect(result).toEqual(users);
    });
    it("unable to retrieve data from db", async () => {
      const query = {
        search: "",
        limit: 10,
        sort: "ASC",
      };
      const req = mockRequest({ query });
      const res = mockResponse();
      User.find = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error("test error")));
      await getUsers(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({
        error: "test error",
      });
    });
  });
  describe("test getUserById", () => {
    beforeEach(() => {
      User.findOne = jest.fn();
    });
    it("should return user", async () => {
      const id = users[0].id;
      const params = { id };
      const req = mockRequest({ params });
      const res = mockResponse();
      User.findOne = jest.fn().mockReturnValue(Promise.resolve(users[0]));
      const result = await getUserById(req, res);
      expect(result).toEqual(users[0]);
    });
    it("unable to retrieve data from db", async () => {
      const params = { id: users[0].id };
      const req = mockRequest({ params });
      const res = mockResponse();
      User.findOne = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error("test error")));
      await getUserById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({
        error: "test error",
      });
    });
  });
  // describe("test deleteUser", () => {
  //   beforeEach(() => {
  //     User.findOne = jest.fn();
  //   });
  //   it("should delete user softly", async () => {
  //     // jest.spyOn(getManager, "");
  //     const id = users[0].id;
  //     const params = { id };
  //     const req = mockRequest({ params });
  //     const res = mockResponse();
  //     User.findOne = jest.fn().mockReturnValue(Promise.resolve(users[0]));
  //     const result = await deleteUser(req, res);
  //     expect(result).toEqual(users[0]);
  //   });
  //   it("unable to retrieve data from db", async () => {
  //     const params = { id: users[0].id };
  //     const req = mockRequest({ params });
  //     const res = mockResponse();
  //     User.findOne = jest
  //       .fn()
  //       .mockReturnValue(Promise.reject(new Error("test error")));
  //     await deleteUser(req, res);
  //     expect(res.status).toHaveBeenCalledWith(500);
  //     expect(res.json).toBeCalledWith({ error: "test error" });
  //   });
  // });

  describe("test upsertUser", () => {
    beforeEach(() => {
      User.save = jest.fn();
    });
    it("should update or insert user", async () => {
      const entity = users[0];
      const req = mockRequest(entity);
      const res = mockResponse();
      User.save = jest.fn().mockReturnValue(Promise.resolve(entity));
      const result = await upsertUser(req, res);
      expect(result).toEqual(entity);
    });
    it("unable to retrieve data from db", async () => {
      const entity = users[0];
      const req = mockRequest(entity);
      const res = mockResponse();
      User.save = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error("test error")));
      await upsertUser(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({
        error: "test error",
      });
    });
  });
});
