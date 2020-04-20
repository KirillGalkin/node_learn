import {
  getGroups,
  getGroupById,
  upsertGroup,
  deleteGroup,
} from "./../api/controllers/groupController";
import { groups } from "./data/constants";
import { Group } from "../entity";
import { mockResponse, mockRequest } from "./utils/testUtils";

describe("GroupController", () => {
  describe("test getGroups", () => {
    beforeEach(() => {
      Group.find = jest.fn();
    });
    it("should return groups", async () => {
      const query = {
        search: "",
        limit: 10,
        sort: "ASC",
      };
      const req = mockRequest({ query });
      const res = mockResponse();
      Group.find = jest.fn().mockReturnValue(Promise.resolve(groups));
      const result = await getGroups(req, res);
      expect(result).toEqual(groups);
    });
    it("unable to retrieve data from db", async () => {
      const query = {
        search: "",
        limit: 10,
        sort: "ASC",
      };
      const req = mockRequest({ query });
      const res = mockResponse();
      Group.find = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error("test error")));
      await getGroups(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({
        error: "test error",
      });
    });
  });
  describe("test getGroupById", () => {
    beforeEach(() => {
      Group.findOne = jest.fn();
    });
    it("should return group", async () => {
      const id = groups[0].id;
      const params = { id };
      const req = mockRequest({ params });
      const res = mockResponse();
      Group.findOne = jest.fn().mockReturnValue(Promise.resolve(groups[0]));
      const result = await getGroupById(req, res);
      expect(result).toEqual(groups[0]);
    });
    it("unable to retrieve data from db", async () => {
      const params = { id: groups[0].id };
      const req = mockRequest({ params });
      const res = mockResponse();
      Group.findOne = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error("test error")));
      await getGroupById(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({
        error: "test error",
      });
    });
  });

  describe("test upsertGroup", () => {
    beforeEach(() => {
      Group.save = jest.fn();
    });
    it("should update or insert group", async () => {
      const entity = groups[0];
      const req = mockRequest(entity);
      const res = mockResponse();
      Group.save = jest.fn().mockReturnValue(Promise.resolve(entity));
      const result = await upsertGroup(req, res);
      expect(result).toEqual(entity);
    });
    it("unable to retrieve data from db", async () => {
      const entity = groups[0];
      const req = mockRequest(entity);
      const res = mockResponse();
      Group.save = jest
        .fn()
        .mockReturnValue(Promise.reject(new Error("test error")));
      await upsertGroup(req, res);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toBeCalledWith({
        error: "test error",
      });
    });
  });

  describe("test deleteGroup", () => {
    beforeEach(() => {
      Group.delete = jest.fn();
    });
    it("should delete group", async () => {
      const id = groups[0].id;
      const params = { id };
      const req = mockRequest({ params });
      const res = mockResponse();
      Group.delete = jest
        .fn()
        .mockReturnValue(Promise.resolve({ raw: [], affected: 1 }));
      const result = await deleteGroup(req, res);
      expect(result).toEqual({ raw: [], affected: 1 });
    });
  });
});
