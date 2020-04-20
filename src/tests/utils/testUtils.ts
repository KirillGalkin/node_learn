import { User } from "../../entity";

export const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export const mockRequest = (
  { sessionData, body, query, params } = {} as any
): any => ({
  session: { data: sessionData },
  body,
  query,
  params,
});
