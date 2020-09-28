import React from "react";
import Layout from "../Layout";
import { Link } from "react-router-dom";
function ListAccounts() {
  return (
    <>
      <Layout>
        <h1 className="structure--title">Your Accounts</h1>
        <section className="structure  pt-5">
          <button className="w-5/12 md:w-3/12 block ml-auto mr-3 mb-3 text-2xs button--main">
            Create New Account
          </button>
          <table class="table-auto rounded-lg">
            <thead>
              <tr>
                <td className="text-center text-white uppercase">Address</td>
                <td className="text-right pr-3 text-white py-4 uppercase">
                  Balance
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="table-child px-4 w-55% sm:w-8/12 text-xs md:text-sm text-white">
                  <Link
                    to={`/account/${`ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke`}`}
                  >
                    ban_1eroshi3kz1ye9o6c6nxqu5zzfhxmc9mqugg9uf8nfk1nw5nnx6q5r66e3ke
                  </Link>
                </td>
                <td className="table-child--left text-2xs md:text-sm pr-4 text-white text-right">
                  <span className="text-xs pl-2"> 2000 BAN</span>
                  <span className="text-2xs block pl-2"> $ 20.10</span>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </Layout>
    </>
  );
}

export default ListAccounts;
