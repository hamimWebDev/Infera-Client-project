import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailability: builder.query({
      query: ({ facilityId, date }) => ({
        url: `check-availability`,
        params: { facilityId, date },
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    addBookings: builder.mutation({
      query: (bookingData) => ({
        url: `bookings`,
        method: "POST",
        body: bookingData,
      }),
      invalidatesTags: ["user"],
    }),
    getUserBookings: builder.query({
      query: () => ({
        url: `/bookings/user`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateBooking: builder.mutation({
      query: ({ bookingId, bookingData }) => ({
        url: `/bookings/${bookingId}`,
        method: "PUT",
        body: bookingData,
      }),
      invalidatesTags: ["user"],
    }),
    cancelBooking: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/bookings/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCheckAvailabilityQuery,
  useAddBookingsMutation,
  useGetUserBookingsQuery,
  useUpdateBookingMutation,
  useCancelBookingMutation,
} = userApi;
