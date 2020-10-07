import React from "react";

function Representative() {
  return (
    <>
      <section className="mx-auto px-2">
        <section className="w-full">
          <h1 className="structure--title mt-0">Representatives</h1>

          <h2 className="text-xs text-white">
            You have delegated voting weight to the following representatives
          </h2>
          <table className="text-xs w-full text-white">
            <thead>
              <tr className="font-bold">
                <td className="pb-4">Status</td>
                <td className="pb-4">Representatives</td>
                <td className="pb-4">Weight</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="pb-4">Unknown</td>
                <td className="pb-4">ban_3pyd7i...x6x</td>
                <td className="pb-4">0</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
      <section className="mt-5">
        <ChangeRepresentative />
      </section>
    </>
  );
}

export const ChangeRepresentative = () => {
  return (
    <>
      <h1 className="structure--title my-4 pb-0 mb-1 ">
        Change your representatives
      </h1>
      <section className="sm:w-10/12 mx-auto px-2 flex justify-center items-center flex-col">
        <h2 className="text-white">Account to change:</h2>
        <select name="representative-choice" className="w-full" id="">
          <option>ban_3pyd7if4ds...64as6dx6x</option>
        </select>
        <h2 className="text-white pt-4">New Representative:</h2>
        <input
          type="text"
          className="w-full"
          placeholder="new Representative address"
        />
        <button className="button--main  sm:w-6/12 mt-4">
          Change Representative
        </button>
      </section>
    </>
  );
};

export default Representative;
