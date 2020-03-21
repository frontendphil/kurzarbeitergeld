import React, { useState } from "react";

import BankDetails from "./BankDetails";
import TextInput from "./TextInput";

const defaultCompany = {
  name: "",
  bankName: "",
  iban: "",
  bic: "",
  email: ""
};

function General() {
  const [company, setCompany] = useState(defaultCompany);

  return (
    <form>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className=" mb-6">
            <TextInput
              label="Firmenname"
              value={company.name}
              onChange={name => setCompany({ ...company, name })}
            />
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-3/4">
              <div className="mr-4">
                <TextInput
                  label="Straße"
                  value={company.streetName}
                  onChange={streetName =>
                    setCompany({ ...company, streetName })
                  }
                />
              </div>
            </div>

            <div className="w-1/4">
              <TextInput
                label="Nr."
                value={company.streetNumber}
                onChange={streetNumber =>
                  setCompany({ ...company, streetNumber })
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-2/5">
              <div className="mr-4">
                <TextInput
                  label="Postleitzahl"
                  value={company.zipCode}
                  onChange={zipCode => setCompany({ ...company, zipCode })}
                />
              </div>
            </div>

            <div className="w-3/5">
              <TextInput
                label="Stadt"
                value={company.city}
                onChange={city => setCompany({ ...company, city })}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-wrap  mb-6">
            <div className="w-1/2">
              <div className="mr-4">
                <TextInput
                  label="Telefon"
                  value={company.phone}
                  onChange={phone => setCompany({ ...company, phone })}
                />
              </div>
            </div>

            <div className="w-1/2">
              <TextInput
                label="Telefax"
                value={company.fax}
                onChange={fax => setCompany({ ...company, fax })}
              />
            </div>
          </div>

          <div className="mb-6">
            <TextInput
              label="Email"
              value={company.email}
              onChange={email => setCompany({ ...company, email })}
            />
          </div>
        </div>
      </div>

      <h3 className="mb-2 text-3xl">Bankverbindung</h3>

      <div className="w-1/2">
        <BankDetails
          onChange={bankDetails => setCompany({ ...company, ...bankDetails })}
        />
      </div>
    </form>
  );
}

export default General;
