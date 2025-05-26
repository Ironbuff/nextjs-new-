'use client'
import {configureStore} from '@reduxjs/toolkit'
import authreducer from '../store/auth'

export const store = configureStore({
    reducer:{
        auth:authreducer
    }
})

export type RootState = ReturnType<typeof store.getState> //defines datatype of the  auth and state
export type AppDispatch = typeof store.dispatch