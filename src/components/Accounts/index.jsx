import React from "react";
import Layout from "../Layout";

function Accounts() {
  return (
    <Layout>
      <div className="structure md:w-10/12 sm:grid sm:grid-cols-3 text-white pt-2">
        
        <div className="flex flex-col sm:flex-row col-span-3">
          <span className="lg:w-56">
            <img
              src="https://monkey.banano.cc/api/v1/monkey/ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke?format=png&size=250"
              className="mx-auto"
            />
          </span>
          <h1 className="flex sm:w-4/12 text-xs md:text-sm align-center mb-4 sm:mb-0 text-gray-400 items-center break-all">
            ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
          </h1>
        </div>
        <div className="flex flex-row justify-evenly sm:flex-col items-end ">
          <div className="flex flex-col font-thin">
            <p> Balance:</p>
            <p className="w-auto align-end">1 BAN</p>
          </div>
          <h2>Pending:1</h2>
        </div>
        <p className="w-auto break-all text-gray-700 text-sm col-span-4">Representative: ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke</p>
      </div>
    </Layout>
  );
}

export default Accounts;
