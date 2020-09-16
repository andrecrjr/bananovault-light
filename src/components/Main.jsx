import React from "react";
import Layout from "./Layout";
function Main() {
  return (
    <Layout>
      <section className="structure md:mx-auto lg:w-8/12">
        <div className="flex flex-col items-center sm:flex-row">
          <button className="button--main">Criar Wallet</button>
          <button className="button--main mt-5 sm:mt-0 sm:ml-2">
            Importar Wallet
          </button>
        </div>
        <div className="text-white p-2 mt-4">
          <h1 className="pb-2">Why Use BanVault?</h1>
          <h2 className=" font-bold  text-sm">SECURITY FOCUSED</h2>
          <p className="pb-3 text-sm">
            All sensitive operations happen in your browser only - your seed and
            private keys are never sent across your network, or stored on any
            server in any format. (So there is no need for server-based
            authentication measures such as 2FA)
          </p>
          <h2 className="font-bold text-sm">"NO STRINGS ATTACHED" WALLET</h2>
          <p className="pb-3  text-sm">
            Because no information is ever stored on a server, there is no
            account to login to or email address required. Create as many
            wallets as you want and switch between them easily.
          </p>
          <h2 className="font-bold text-sm">ANY DEVICE, ANYWHERE</h2>
          <p className="pb-3  text-sm">
            Send and receive Banano from any device using the web wallet, or
            download the desktop wallet available for Windows/Mac/Linux.
          </p>
          <h2 className="font-bold text-sm">HELPFUL FEATURES</h2>
          <p className="pb-3  text-sm">
            Store labels for your friends and your own accounts in the address
            book, track your balances in your local currency, and more!
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default Main;
