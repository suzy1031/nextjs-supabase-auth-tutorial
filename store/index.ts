import { create } from "zustand";
import { Database } from "../lib/database.types";

export type ProfileType = Database["public"]["Tables"]["profiles"]["Row"];

type StateType = {
  user: ProfileType;
  setUser: (payload: ProfileType) => void;
};

const useStore = create<StateType>((set) => ({
  user: { id: "", name: "", email: "", introduce: "", avatar_url: "" },
  setUser: (payload) => set({ user: payload }),
}));
export default useStore;
