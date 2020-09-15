import React from "react";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <section className="flex flex-col">
      <div className="flex flex-col items-center sm:flex-row">
        <button className="p-2 w-3/4 bg-green-600 shadow-sm rounded-sm">Criar Wallet</button>
        <button className="p-2 w-3/4 bg-green-600 mt-5 sm:mt-0 sm:ml-2 shadow-sm rounded-sm">Importar Wallet</button>
      </div>  
      <div className="text-white p-2 mt-4">
        <h1 className="pb-2">Why Use BanVault?</h1>
        <h2 className=" font-bold">SECURITY FOCUSED</h2>
        <p className="pb-3">
          All sensitive operations happen in your browser only - your seed and
            private keys are never sent across your network, or stored on any
            server in any format. (So there is no need for server-based
             authentication measures such as 2FA)
        
        </p>
        <h2 className="font-bold">"NO STRINGS ATTACHED" WALLET</h2>
        <p className="pb-3">
          Because no information is ever stored on a server, there is no account
          to login to or email address required. Create as many wallets as you
                want and switch between them easily.
        </p>
        <h2 className="font-bold">ANY DEVICE, ANYWHERE</h2>
        <p className="pb-3">
          Send and receive Banano from any device using the web wallet, or download the desktop wallet available for Windows/Mac/Linux.
        </p>
        <h2 className="font-bold">HELPFUL FEATURES</h2>
        <p className="pb-3">
          Store labels for your friends and your own accounts in the address 
          book, track your balances in your local currency, and more!
        </p>
      </div>
      </section>
    </Layout>
  );
}

export default App;
