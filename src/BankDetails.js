import React, { Fragment } from "react";

import {
  resetBankData,
  updateBankDetails,
  useDispatch,
  useGeneralData,
  useGeneralErrors
} from "./AppContext";
import TextInput from "./TextInput";

function BankDetails({ onChange }) {
  const dispatch = useDispatch();
  const { iban, bic, bankName } = useGeneralData();
  const errors = useGeneralErrors();

  return (
    <Fragment>
      <div className=" mb-6">
        <TextInput
          label="IBAN"
          value={iban}
          error={errors.iban}
          onComplete={iban => {
            if (iban) {
              fetch(`https://openiban.com/validate/${iban}?getBIC=true`).then(
                async response => {
                  const json = await response.json();

                  if (json.valid) {
                    const newBankData = {
                      iban,
                      bankName: json.bankData.name,
                      bic: json.bankData.bic
                    };

                    dispatch(updateBankDetails(newBankData));
                  } else {
                    dispatch(resetBankData());
                  }
                }
              );
            }
          }}
        />
      </div>

      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <TextInput
            disabled
            label="BIC"
            hint="Wird automatisch gesetzt"
            value={bic}
          />
        </div>

        <div className="w-full md:w-1/2 px-3">
          <TextInput
            disabled
            label="Kreditinstitut"
            hint="Wird automatisch gesetzt"
            value={bankName}
          />
        </div>
      </div>
    </Fragment>
  );
}

export default BankDetails;
