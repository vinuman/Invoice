import { create } from "zustand";
import { persist } from "zustand/middleware";
import { newId } from "../lib/id";

const defaultClientId = newId("client");

const defaultClientProfile = {
  id: defaultClientId,
  displayName: "Pentagon Studio",
  companyName: "Pentagon Studio",
  addressLines: ["4/108", "Kadakkarapally PO", "Cherthala,", "Alappuzha, 688529"],
  gstin: "32CWCPA6689R1ZX",
};

export const useClientProfilesStore = create(
  persist(
    (set) => ({
      activeClientId: defaultClientId,
      clientsById: { [defaultClientId]: defaultClientProfile },
      clientIds: [defaultClientId],

      setActiveClientId: (id) => set({ activeClientId: id }),

      upsertClient: (client) =>
        set((state) => {
          const id = client.id ?? newId("client");
          const exists = Boolean(state.clientsById[id]);
          return {
            activeClientId: state.activeClientId ?? id,
            clientsById: { ...state.clientsById, [id]: { ...client, id } },
            clientIds: exists ? state.clientIds : [id, ...state.clientIds],
          };
        }),

      removeClient: (id) =>
        set((state) => {
          if (!state.clientsById[id]) return state;
          const rest = { ...state.clientsById };
          delete rest[id];
          const clientIds = state.clientIds.filter((x) => x !== id);
          const activeClientId =
            state.activeClientId === id ? clientIds[0] ?? null : state.activeClientId;
          return { clientsById: rest, clientIds, activeClientId };
        }),
    }),
    {
      name: "invoice_client_profiles_v1",
      version: 1,
    }
  )
);

