import { useMemo } from "react";
import Section from "./Section";
import { Field, Select, TextArea, TextInput } from "./Field";
import { useClientProfilesStore } from "../../stores/useClientProfilesStore";
import { newId } from "../../lib/id";

function linesToText(lines) {
  return (Array.isArray(lines) ? lines : []).join("\n");
}

function textToLines(text) {
  return String(text ?? "")
    .split("\n")
    .map((s) => s.trimEnd())
    .filter((s) => s.length > 0);
}

export default function ClientProfileForm() {
  const activeClientId = useClientProfilesStore((s) => s.activeClientId);
  const clientsById = useClientProfilesStore((s) => s.clientsById);
  const clientIds = useClientProfilesStore((s) => s.clientIds);
  const setActiveClientId = useClientProfilesStore((s) => s.setActiveClientId);
  const upsertClient = useClientProfilesStore((s) => s.upsertClient);

  const active = activeClientId ? clientsById[activeClientId] : null;

  const options = useMemo(
    () =>
      clientIds
        .map((id) => clientsById[id])
        .filter(Boolean)
        .map((p) => ({ id: p.id, label: p.displayName || p.companyName || "Client" })),
    [clientIds, clientsById]
  );

  function update(patch) {
    if (!active) return;
    upsertClient({ ...active, ...patch });
  }

  function createNew() {
    const id = newId("client");
    upsertClient({
      id,
      displayName: "New client",
      companyName: "",
      addressLines: [],
      gstin: "",
    });
    setActiveClientId(id);
  }

  return (
    <Section
      title="Client / company"
      right={
        <button
          type="button"
          onClick={createNew}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50"
        >
          New client
        </button>
      }
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Client">
          <Select
            value={activeClientId ?? ""}
            onChange={(e) => setActiveClientId(e.target.value)}
          >
            {options.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Client label">
          <TextInput
            value={active?.displayName ?? ""}
            onChange={(e) => update({ displayName: e.target.value })}
            placeholder="e.g. Acme Corp"
          />
        </Field>

        <Field label="Company name">
          <TextInput
            value={active?.companyName ?? ""}
            onChange={(e) => update({ companyName: e.target.value })}
          />
        </Field>

        <Field label="GSTIN (optional)">
          <TextInput value={active?.gstin ?? ""} onChange={(e) => update({ gstin: e.target.value })} />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Address (one line per row)">
            <TextArea
              rows={4}
              value={linesToText(active?.addressLines)}
              onChange={(e) => update({ addressLines: textToLines(e.target.value) })}
            />
          </Field>
        </div>
      </div>
    </Section>
  );
}

