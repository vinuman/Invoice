function App() {
  return (
    <>
      <div className="py-[30px] px-[20px]  flex justify-between">
        <div>
          <h1 className=" text-[40px] text-blue-600 font-bold">
            Pentagon Studio
          </h1>
          <div>
            <address>
              4/108<br></br> Kadakkarapally PO<br></br> Cherthala,<br></br>{" "}
              Alappuzha, 688529<br></br>
              GSTIN: 32CWCPA6689R1ZX
            </address>
          </div>
          <div className=" mt-8">
            <h2 className=" text-blue-600">To:</h2>
            <address>
              Vinu Cyril<br></br>
              No:60, 4th cross<br></br>
              Brindavan Layout<br></br>
              Horamavu Kalkere main road<br></br>
              Bangalore 560043
            </address>
            <div className=" mt-8">
              <h3>
                <span className="text-[20px]">Bank Acc: </span> 50100255641330
              </h3>
              <h3>
                <span className="text-[20px]">IFSC code: </span>
                HDFC0004075
              </h3>
              <h3>
                <span className="text-[20px]">UPI ID: </span>
                7560824678@ybl
              </h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h1 className=" text-[30px] text-blue-600 font-bold underline">
            Invoice
          </h1>
          <p className="flex items-center text-[20px]">
            <span className=" text-blue-600  font-bold">Date:</span> 1 Aug 2024
          </p>
          <div className=" flex gap-2">
            <h2 className=" text-blue-600">For:</h2>
            <p>Web Development</p>
          </div>
        </div>
      </div>
      <div className="py-[30px] px-[20px] flex gap-[100px]">
        <div className="flex flex-col">
          <h2 className=" text-[20px] text-blue-500 font-semibold">
            Description
          </h2>
          <p className=" font-bold">Web Development</p>
        </div>
        <div className="flex flex-col">
          <h2 className=" text-[20px] text-blue-500 font-semibold">Hours</h2>
          <p className=" font-bold">14.5</p>
        </div>
        <div className="flex flex-col">
          <h2 className=" text-[20px] text-blue-500 font-semibold">Rate</h2>
          <p className=" font-bold">300</p>
        </div>
        <div className="flex flex-col">
          <h2 className=" text-[20px] text-blue-500 font-semibold">
            Total Amount
          </h2>
          <p className=" font-bold">4,350</p>
        </div>
      </div>
    </>
  );
}

export default App;
