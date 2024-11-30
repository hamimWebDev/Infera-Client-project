import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  DefinitionType,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../features/store";

import { toast } from "sonner";
import { logOut, setUser } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = (await baseQuery(args, api, extraOptions)) as any;

  if (result.error?.status === 404) {
    toast.error(result.error.data.message);
  }

  if (result.error?.status === 401) {
    // Attempt to refresh the token
    const res = await fetch(
      "http://localhost:5000/api/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!res.ok) {
      console.error("Failed to refresh token:", res.statusText);
      api.dispatch(logOut());
      return result;
    }

    const data = await res.json().catch((err) => {
      console.error("Failed to parse JSON response:", err);
      return null;
    });

    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
      // Retry the original query with the new token
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: ["admin", "user"],
  endpoints: () => ({}),
});
