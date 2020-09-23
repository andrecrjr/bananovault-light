import React from "react";
import Layout from "../Layout";

function Send() {
  return (
    <Layout>
      <h1 className="structure--title">Send Bananos</h1>
      <div className="structure pt-2">
        <div className="flex flex-col">
          <label className="text-white text-center ">From account:</label>
          <select
            name="banano-address"
            className="w-5/12 h-8 mx-auto rounded-sm  mt-2"
            id="banano"
          >
            <option className="text-center">ban_1eroshi...66e3ke</option>
          </select>
          <label className="pt-3 text-white text-center" for="to-account">
            To account:
          </label>
          <input
            type="text"
            id="to-account"
            placeholder="Account to send to"
            className="w-5/12 p-2 mx-auto rounded-sm mt-2"
          />
        </div>
        <label className="pt-3 text-white text-center">Amount</label>
        <div className="relative text-xs w-6/12 mx-auto mt-2">
          <input
            type="number"
            placeholder="Amount of Banano"
            className="w-full mx-auto p-2 pl-2 h-8 text-md rounded-sm  "
          />
          <span className="absolute top-0 right-0 h-full flex items-center cursor-pointer bg-white pr-1 font-bold my-auto ">
            Max
          </span>
        </div>
        <button className="button--main text-sm mx-auto mt-4 sm:w-4/12 mb-5">
          Send Banano!
        </button>
      </div>
    </Layout>
  );
}

export default Send;
