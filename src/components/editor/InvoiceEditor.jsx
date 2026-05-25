import SenderProfileForm from "./SenderProfileForm";
import ClientProfileForm from "./ClientProfileForm";
import InvoiceMetaForm from "./InvoiceMetaForm";
import LineItemsEditor from "./LineItemsEditor";
import TaxCoverageCalculator from "./TaxCoverageCalculator";

export default function InvoiceEditor() {
  return (
    <div className="space-y-4 print:hidden">
      <InvoiceMetaForm />
      <TaxCoverageCalculator />
      <SenderProfileForm />
      <ClientProfileForm />
      <LineItemsEditor />
    </div>
  );
}

