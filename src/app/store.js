import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userDetailsReducer from '../features/userDetails/userDetailsSlice';
import chatSelectionReducer from '../features/chatSelections/chatSelection';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ 
  userDetails: userDetailsReducer,
  chatSelection: chatSelectionReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)