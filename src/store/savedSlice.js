import { createSlice } from '@reduxjs/toolkit'

const loadFromStorage = () => {
  try {
    const data = localStorage.getItem('foodfacts')
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

const saveToStorage = (items) => {
  try {
    localStorage.setItem('foodfacts', JSON.stringify(items))
  } catch (e) {
    console.error("Storage error", e)
  }
}

const savedSlice = createSlice({
  name: 'saved',
  initialState: {
    items: loadFromStorage()
  },
  reducers: {
    addItem: (state, action) => {
      const exists = state.items.find(i => i.id === action.payload.id)

      if (!exists) {
        state.items.push(action.payload)
        saveToStorage(state.items)
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
      saveToStorage(state.items)
    }
  }
})

export const { addItem, removeItem } = savedSlice.actions
export default savedSlice.reducer