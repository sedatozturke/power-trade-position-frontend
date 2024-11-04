import { configureStore } from '@reduxjs/toolkit'
import { reportsApi } from '../reports/api'

export const store = configureStore({
  reducer: {
    [reportsApi.reducerPath]: reportsApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(reportsApi.middleware) 
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch