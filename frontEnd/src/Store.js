
import { create } from 'zustand'

const useStore = create((set) => ({
  isCalendarOpen: false,
  setIsCalendarOpen: (isCalendarOpenVariable) => set({isCalendarOpen: isCalendarOpenVariable}),

}))

export default useStore
