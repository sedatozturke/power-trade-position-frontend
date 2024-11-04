import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IReportDetail, IReportItem } from './response'

export const reportsApi = createApi({
  reducerPath: 'reportsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5045/api/Report' }),
  endpoints: (builder) => ({
    getReports: builder.query<IReportItem[], string>({
      query: (searchQuery) => {
        return {
          url: '',
          params: { search: searchQuery}
        }
      },
    }),
    getReportDetail: builder.query<IReportDetail, string>({
      query: (id) => `${id}`,
    }),
    getComparisonReportDetail: builder.query<IReportDetail, string>({
      query: (id) => `${id}`,
    }),
  }),
})

export const { useGetReportsQuery, useLazyGetReportsQuery, useGetReportDetailQuery, useLazyGetComparisonReportDetailQuery } = reportsApi