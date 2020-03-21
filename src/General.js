import React, { useState } from "react";

import AgencySelect from "./AgencySelect";
import BankDetails from "./BankDetails";
import Card from "./Card";
import TextInput from "./TextInput";
import Title3 from "./Title3";

const defaultCompany = {
  name: "",
  bankName: "",
  iban: "",
  bic: "",
  email: ""
};

function General({ onStateChange }) {
  const [company, setCompany] = useState(defaultCompany);

  return (
    <Card>
      <Title3>Jobcenter</Title3>

      <div className="mb-6">
        <AgencySelect
          value={company.agency}
          onChange={agency =>
            setCompany({
              ...company,

              agency
            })
          }
        />
      </div>

      <Title3>Firmendaten</Title3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-6">
            <TextInput
              label="Firmenname"
              value={company.name}
              onComplete={name => onStateChange({ ...company, name })}
            />
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-3/4">
              <div className="mr-4">
                <TextInput
                  label="Straße"
                  value={company.streetName}
                  onComplete={streetName =>
                    onStateChange({ ...company, streetName })
                  }
                />
              </div>
            </div>

            <div className="w-1/4">
              <TextInput
                label="Nr."
                value={company.streetNumber}
                onComplete={streetNumber =>
                  onStateChange({ ...company, streetNumber })
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
                  onComplete={zipCode => onStateChange({ ...company, zipCode })}
                />
              </div>
            </div>

            <div className="w-3/5">
              <TextInput
                label="Stadt"
                value={company.city}
                onComplete={city => onStateChange({ ...company, city })}
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
                  onComplete={phone => onStateChange({ ...company, phone })}
                />
              </div>
            </div>

            <div className="w-1/2">
              <TextInput
                label="Telefax"
                value={company.fax}
                onComplete={fax => onStateChange({ ...company, fax })}
              />
            </div>
          </div>

          <div className="mb-6">
            <TextInput
              label="Email"
              value={company.email}
              onComplete={email => onStateChange({ ...company, email })}
            />
          </div>
        </div>
      </div>

      <Title3>Bankverbindung</Title3>

      <div className="w-1/2">
        <BankDetails
          onChange={bankDetails =>
            onStateChange({ ...company, ...bankDetails })
          }
          // TODO
        />
      </div>
    </Card>
  );
}

export default General;
