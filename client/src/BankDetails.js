import React, { Fragment, useState } from "react";

import TextInput from "./TextInput";

const defaultBankData = { iban: "", bankName: "", bic: "" };

function BankDetails({ onChange }) {
  const [bankData, setBankData] = useState({ iban: "", bankName: "", bic: "" });

  return (
    <Fragment>
      <div className=" mb-6">
        <TextInput
          label="IBAN"
          value={bankData.iban}
          onChange={iban => setBankData({ ...bankData, iban })}
          onBlur={() => {
            if (bankData.iban) {
              fetch(
                `https://openiban.com/validate/${bankData.iban}?getBIC=true`
              ).then(async response => {
                const json = await response.json();

                if (json.valid) {
                  const newBankData = {
                    ...bankData,
                    bankName: json.bankData.name,
                    bic: json.bankData.bic
                  };

                  setBankData(newBankData);
                  onChange(newBankData);
                } else {
                  setBankData(defaultBankData);
                  onChange(defaultBankData);
                }
              });
            }
          }}
        />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput disabled label="BIC" value={bankData.bic} />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <TextInput
            disabled
            label="Kreditinstitut"
            value={bankData.bankName}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default BankDetails;
