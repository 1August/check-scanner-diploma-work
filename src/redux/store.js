import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/authSlice'
import { favouritesReducer } from './slices/favouritesSlice'
import { localizationReducer } from './slices/localizationSlice'

const rootReducer = combineReducers({
	auth: authReducer,
	favourites: favouritesReducer,
	localization: localizationReducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})
