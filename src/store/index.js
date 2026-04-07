import { configureStore } from '@reduxjs/toolkit'
import savedReducer from './savedSlice'

const store = configureStore({
  reducer: {
    saved: savedReducer
  }
})

// Save Redux state to localStorage whenever it changes
store.subscribe(() => {
  try {
    const items = store.getState().saved.items
    localStorage.setItem('foodfacts', JSON.stringify(items))
  } catch (error) {
    console.error('Failed to save to localStorage:', error)
  }
})

export default store