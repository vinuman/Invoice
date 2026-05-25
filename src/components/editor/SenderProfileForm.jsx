import { useEffect, useMemo, useState } from "react";
import Section from "./Section";
import { Field, Select, TextArea, TextInput } from "./Field";
import { useSenderProfilesStore } from "../../stores/useSenderProfilesStore";
import { newId } from "../../lib/id";
import ConfirmModal from "../common/ConfirmModal";

function linesToText(lines) {
  return (Array.isArray(lines) ? lines : []).join("\n");
}

function textToLines(text) {
  return String(text ?? "")
    .split("\n")
    .map((s) => s.trimEnd())
    .filter((s) => s.length > 0);
}

export default function SenderProfileForm() {
  const activeSenderId = useSenderProfilesStore((s) => s.activeSenderId);
  const sendersById = useSenderProfilesStore((s) => s.sendersById);
  const senderIds = useSenderProfilesStore((s) => s.senderIds);
  const setActiveSenderId = useSenderProfilesStore((s) => s.setActiveSenderId);
  const upsertSender = useSenderProfilesStore((s) => s.upsertSender);

  const active = activeSenderId ? sendersById[activeSenderId] : null;
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [draft, setDraft] = useState(null);

  const options = useMemo(
    () =>
      senderIds
        .map((id) => sendersById[id])
        .filter(Boolean)
        .map((p) => ({ id: p.id, label: p.displayName || p.name || "Sender" })),
    [senderIds, sendersById]
  );

  useEffect(() => {
    // If active profile changes while not editing, keep draft in sync.
    if (!isEditing) setDraft(active);
  }, [activeSenderId, isEditing]); // eslint-disable-line react-hooks/exhaustive-deps

  function updateDraft(patch) {
    setDraft((prev) => ({ ...(prev ?? active ?? {}), ...patch }));
  }

  function createNew() {
    const id = newId("sender");
    upsertSender({
      id,
      displayName: "New sender",
      name: "",
      addressLines: [],
      pan: "",
      bankAccount: "",
      ifsc: "",
      upiId: "",
    });
    setActiveSenderId(id);
    setIsEditing(true);
  }

  return (
    <Section
      title="Your details"
      right={
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setDraft(active);
                  setIsEditing(false);
                }}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmSave(true)}
                className="rounded-md bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setDraft(active);
                  setIsEditing(true);
                }}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={createNew}
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
              >
                New profile
              </button>
            </>
          )}
        </div>
      }
    >
      <ConfirmModal
        open={showConfirmSave}
        title="Save your details?"
        description="This will overwrite the selected profile and persist it to this browser."
        confirmText="Yes, save"
        cancelText="No"
        onCancel={() => setShowConfirmSave(false)}
        onConfirm={() => {
          setShowConfirmSave(false);
          if (!draft) return;
          upsertSender(draft);
          setIsEditing(false);
        }}
      />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Profile">
          <Select
            value={activeSenderId ?? ""}
            onChange={(e) => setActiveSenderId(e.target.value)}
            disabled={isEditing}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Profile label">
          <TextInput
            value={(isEditing ? draft?.displayName : active?.displayName) ?? ""}
            onChange={(e) => updateDraft({ displayName: e.target.value })}
            placeholder="e.g. Personal / Business"
            readOnly={!isEditing}
          />
        </Field>

        <Field label="Name">
          <TextInput
            value={(isEditing ? draft?.name : active?.name) ?? ""}
            onChange={(e) => updateDraft({ name: e.target.value })}
            readOnly={!isEditing}
          />
        </Field>

        <Field label="PAN">
          <TextInput
            value={(isEditing ? draft?.pan : active?.pan) ?? ""}
            onChange={(e) => updateDraft({ pan: e.target.value })}
            readOnly={!isEditing}
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Address (one line per row)">
            <TextArea
              rows={4}
              value={linesToText((isEditing ? draft?.addressLines : active?.addressLines) ?? [])}
              onChange={(e) => updateDraft({ addressLines: textToLines(e.target.value) })}
              readOnly={!isEditing}
            />
          </Field>
        </div>

        <Field label="Bank account">
          <TextInput
            value={(isEditing ? draft?.bankAccount : active?.bankAccount) ?? ""}
            onChange={(e) => updateDraft({ bankAccount: e.target.value })}
            readOnly={!isEditing}
          />
        </Field>

        <Field label="IFSC">
          <TextInput
            value={(isEditing ? draft?.ifsc : active?.ifsc) ?? ""}
            onChange={(e) => updateDraft({ ifsc: e.target.value })}
            readOnly={!isEditing}
          />
        </Field>

        <Field label="UPI ID">
          <TextInput
            value={(isEditing ? draft?.upiId : active?.upiId) ?? ""}
            onChange={(e) => updateDraft({ upiId: e.target.value })}
            readOnly={!isEditing}
          />
        </Field>
      </div>
    </Section>
  );
}

