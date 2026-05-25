import InvoiceEditor from "./components/editor/InvoiceEditor";
import InvoicePreview from "./components/preview/InvoicePreview";

function App() {
  // App state is handled in zustand stores (editor + preview).

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <header className="border-b border-gray-200 bg-white print:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-gray-900">Invoice Generator</div>
              <div className="text-xs text-gray-600">Frontend-only • Saved locally in this browser</div>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700"
            >
              Print / Save PDF
            </button>
          </div>
        </header>

        <main className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-2 print:block print:max-w-none print:px-0 print:py-0">
          <div className="lg:order-1">
            <InvoiceEditor />
          </div>
          <div className="lg:order-2 print:order-1">
            <InvoicePreview />
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
