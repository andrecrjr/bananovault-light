import React from "react";
import Layout from "../Layout";

function Accounts() {
  return (
    <Layout>
      <div className="shadow-xl p-6 flex flex-col text-white pb-2 pt-2 justify-center sm:justify-evenly sm:w-full sm:flex-row">
        <div className="flex flex-col sm:flex-row">
          <span className="lg:w-56">
            <img
              src="https://monkey.banano.cc/api/v1/monkey/ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke?svc=bananovault"
              className=" w-full h-full"
            />
          </span>
          <h1 className="flex sm:w-4/12 sm:text-xs md:text-sm align-center text-gray-400 text-xs items-center break-all">
            ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
          </h1>
        </div>
        <div className="flex flex-row justify-evenly sm:flex-col items-end ">
          <div className="flex flex-col font-thin align-end">
            <p> Balance:</p>
            <p className="w-auto align-end">1 BAN</p>
          </div>
          <h2>Pending:1</h2>
        </div>
      </div>
    </Layout>
  );
}

export default Accounts;
