import BillTable from "./components/BillTable";

function App() {
  const data = [{ hours: 94.85, rate: 400 }];
  return (
    <>
      <div className="py-[30px] px-[20px]  flex justify-between">
        <div>
          <address>
            <span className=" text-[20px] font-medium text-amber-800">
              Vinu Cyril
            </span>
            <br></br>
            No:60, 4th cross<br></br>
            Brindavan Layout<br></br>
            Horamavu Kalkere main road<br></br>
            Bangalore 560043
          </address>
          <div className=" mt-8">
            <h3>
              <span className="text-[20px] font-medium text-amber-800">
                PAN:{" "}
              </span>{" "}
              BVOPC1207M
            </h3>
            <h3>
              <span className="text-[20px] font-medium text-amber-800">
                Bank Acc:{" "}
              </span>{" "}
              50100255641330
            </h3>
            <h3>
              <span className="text-[20px] font-medium text-amber-800">
                IFSC code:{" "}
              </span>
              HDFC0004075
            </h3>
            <h3>
              <span className="text-[20px] font-medium text-amber-800">
                UPI ID:{" "}
              </span>
              7560824678@ybl
            </h3>
          </div>
          <div className=" mt-8">
            <h2 className=" text-amber-800 font-extrabol text-lg">To:</h2>
            <h1 className=" text-[30px] text-amber-800 font-bold">
              Pentagon Studio
            </h1>
            <div>
              <address>
                4/108<br></br> Kadakkarapally PO<br></br> Cherthala,<br></br>{" "}
                Alappuzha, 688529<br></br>
                GSTIN: 32CWCPA6689R1ZX
              </address>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" text-[30px] text-amber-800 font-bold underline">
            Invoice
          </h1>
          <p className="flex items-center">
            <span className="">Date:</span> 1 Oct 2024
          </p>
        </div>
      </div>

      <BillTable data={data} />
    </>
  );
}

export default App;
