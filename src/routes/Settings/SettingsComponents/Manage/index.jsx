import React from "react";
import { CreateUpdateWallet } from "./CreateUpdateWalletComponent";

function Manage() {
  return (
    <>
      <CreateUpdateWallet update={true} />
      <section className='mt-10'>
        <h1 className='structure--title mt-0'>Export BananoVault Wallet</h1>
        <div className='p-3 pt-0 '>
          <p className='text-white text-xs'>
            Use this export tool to simplify wallet transfer to other devices.
            Your data will be encrypted by your password, and then imported into
            BananoVault on your new device! The export does not contain your
            address book.
          </p>
          <div className='flex flex-col items-center sm:flex-row'>
            <button className='button--main'>Export as File</button>
            <button className='button--main mt-4 sm:mt-0 sm:ml-4'>
              Export QR Code
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Manage;
