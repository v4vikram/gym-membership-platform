import { create } from "zustand";

export const useCounterStore = create((set) => ({
  count: 0,                        // state
  increase: () => set((state)=>({ count: state.count + 1 })), // action
//   decrease: () => set((s) => ({ count: s.count - 1 })),
//   reset: () => set({ count: 0 }),
}));
