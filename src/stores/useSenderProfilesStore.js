import { create } from "zustand";
import { persist } from "zustand/middleware";
import { newId } from "../lib/id";

const defaultSenderId = newId("sender");

const defaultSenderProfile = {
  id: defaultSenderId,
  displayName: "Default",
  name: "Vinu Cyril",
  addressLines: [
    "No:60, 4th cross",
    "Brindavan Layout",
    "Horamavu Kalkere main road",
    "Bangalore 560043",
  ],
  pan: "BVOPC1207M",
  bankAccount: "50100255641330",
  ifsc: "HDFC0004075",
  upiId: "7560824678@ybl",
};

export const useSenderProfilesStore = create(
  persist(
    (set) => ({
      activeSenderId: defaultSenderId,
      sendersById: { [defaultSenderId]: defaultSenderProfile },
      senderIds: [defaultSenderId],

      setActiveSenderId: (id) => set({ activeSenderId: id }),

      upsertSender: (sender) =>
        set((state) => {
          const id = sender.id ?? newId("sender");
          const exists = Boolean(state.sendersById[id]);
          return {
            activeSenderId: state.activeSenderId ?? id,
            sendersById: { ...state.sendersById, [id]: { ...sender, id } },
            senderIds: exists ? state.senderIds : [id, ...state.senderIds],
          };
        }),

      removeSender: (id) =>
        set((state) => {
          if (!state.sendersById[id]) return state;
          const rest = { ...state.sendersById };
          delete rest[id];
          const senderIds = state.senderIds.filter((x) => x !== id);
          const activeSenderId =
            state.activeSenderId === id
              ? (senderIds[0] ?? null)
              : state.activeSenderId;
          return { sendersById: rest, senderIds, activeSenderId };
        }),
    }),
    {
      name: "invoice_sender_profiles_v1",
      version: 1,
    },
  ),
);
