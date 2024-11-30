import { baseApi } from "../../api/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => ({
        url: `/auth/users`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    getUser: builder.query({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
      }),
      providesTags: ["user"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/auth/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    updateUser: builder.mutation({
      query: ({ userId, userData }) => ({
        url: `/auth/user/${userId}`,
        method: "PUT",
        body: userData,
      }),
      invalidatesTags: ["admin"],
    }),

    addVisiting: builder.mutation({
      query: (visitingData) => ({
        url: `visiting`,
        method: "POST",
        body: visitingData,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllVisiting: builder.query({
      query: () => ({
        url: `visiting`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteAVisiting: builder.mutation<void, string>({
      query: (visitingId) => ({
        url: `/visiting/${visitingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    updateVisiting: builder.mutation({
      query: ({ visitingId, visitingData }) => ({
        url: `/visiting/${visitingId}`,
        method: "PUT",
        body: visitingData,
      }),
      invalidatesTags: ["admin"],
    }),
    GetAVisiting: builder.query({
      query: (VisitingId) => ({
        url: `/visiting/${VisitingId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    addPublicRelationOfficer: builder.mutation({
      query: (publicRelationData) => ({
        url: `publicRelation`,
        method: "POST",
        body: publicRelationData,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllPublicRelation: builder.query({
      query: () => ({
        url: `publicRelation`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteAPublicRelation: builder.mutation<void, string>({
      query: (PublicRelationId) => ({
        url: `/publicRelation/${PublicRelationId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    updatePublicRelation: builder.mutation({
      query: ({ PublicRelationId, PublicRelationData }) => ({
        url: `/publicRelation/${PublicRelationId}`,
        method: "PUT",
        body: PublicRelationData,
      }),
      invalidatesTags: ["admin"],
    }),
    GetAPublicRelation: builder.query({
      query: (PublicRelationId) => ({
        url: `/publicRelation/${PublicRelationId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    addAdmission: builder.mutation({
      query: (admissionData) => ({
        url: `admission`,
        method: "POST",
        body: admissionData,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllAdmission: builder.query({
      query: () => ({
        url: `admission`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteAAdmission: builder.mutation<void, string>({
      query: (AdmissionId) => ({
        url: `/admission/${AdmissionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    updateAAdmission: builder.mutation({
      query: ({ admissionId, admissionData }) => ({
        url: `/admission/${admissionId}`,
        method: "PUT",
        body: admissionData,
      }),
      invalidatesTags: ["admin"],
    }),
    GetAAdmission: builder.query({
      query: (AdmissionId) => ({
        url: `/admission/${AdmissionId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    addAdmissionCamp: builder.mutation({
      query: (admissionCampData) => ({
        url: `admissionCamp`,
        method: "POST",
        body: admissionCampData,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllAdmissionCamp: builder.query({
      query: () => ({
        url: `admissionCamp`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteAAdmissionCamp: builder.mutation<void, string>({
      query: (AdmissionCampId) => ({
        url: `/admissionCamp/${AdmissionCampId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    updateAAdmissionCamp: builder.mutation({
      query: ({ admissionCampId, admissionCampData }) => ({
        url: `/admissionCamp/${admissionCampId}`,
        method: "PUT",
        body: admissionCampData,
      }),
      invalidatesTags: ["admin"],
    }),
    GetAAdmissionCamp: builder.query({
      query: (AdmissionCampId) => ({
        url: `/admissionCamp/${AdmissionCampId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    addRepresentativeTeacher: builder.mutation({
      query: (representativeTeacherData) => ({
        url: `representativeTeacher`,
        method: "POST",
        body: representativeTeacherData,
      }),
      invalidatesTags: ["admin"],
    }),
    getAllRepresentativeTeacher: builder.query({
      query: () => ({
        url: `representativeTeacher`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    deleteARepresentativeTeacher: builder.mutation<void, string>({
      query: (representativeTeacherId) => ({
        url: `/representativeTeacher/${representativeTeacherId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),
    updateARepresentativeTeacher: builder.mutation({
      query: ({ representativeTeacherId, representativeTeacherData }) => ({
        url: `/representativeTeacher/${representativeTeacherId}`,
        method: "PUT",
        body: representativeTeacherData,
      }),
      invalidatesTags: ["admin"],
    }),
    GetARepresentativeTeacher: builder.query({
      query: (RepresentativeTeacherId) => ({
        url: `/representativeTeacher/${RepresentativeTeacherId}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,

  useAddVisitingMutation,
  useGetAllVisitingQuery,
  useUpdateVisitingMutation,
  useDeleteAVisitingMutation,
  useGetAVisitingQuery,

  useAddPublicRelationOfficerMutation,
  useGetAllPublicRelationQuery,
  useUpdatePublicRelationMutation,
  useDeleteAPublicRelationMutation,
  useGetAPublicRelationQuery,

  useAddAdmissionMutation,
  useGetAllAdmissionQuery,
  useUpdateAAdmissionMutation,
  useDeleteAAdmissionMutation,
  useGetAAdmissionQuery,

  useAddAdmissionCampMutation,
  useGetAllAdmissionCampQuery,
  useUpdateAAdmissionCampMutation,
  useDeleteAAdmissionCampMutation,
  useGetAAdmissionCampQuery,

  useAddRepresentativeTeacherMutation,
  useGetAllRepresentativeTeacherQuery,
  useUpdateARepresentativeTeacherMutation,
  useDeleteARepresentativeTeacherMutation,
  useGetARepresentativeTeacherQuery,
} = adminApi;
