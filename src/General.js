import React from "react";

import AgencySelect from "./AgencySelect";
import { updateGeneralField, useDispatch, useGeneralData } from "./AppContext";
import BankDetails from "./BankDetails";
import Card from "./Card";
import TextInput from "./TextInput";
import Title3 from "./Title3";

function General({ onStateChange }) {
  const {
    agency,
    name,
    streetName,
    streetNumber,
    zipCode,
    city,
    phone,
    fax,
    email
  } = useGeneralData();

  const dispatch = useDispatch();

  return (
    <Card>
      <Title3>Jobcenter</Title3>

      <div className="mb-6">
        <AgencySelect
          value={agency}
          onChange={agency => dispatch(updateGeneralField("agency", agency))}
        />
      </div>

      <Title3>Firmendaten</Title3>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="mb-6">
            <TextInput
              label="Firmenname"
              value={name}
              onComplete={name => dispatch(updateGeneralField("name", name))}
            />
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-3/4">
              <div className="mr-4">
                <TextInput
                  label="Straße"
                  value={streetName}
                  onComplete={streetName =>
                    dispatch(updateGeneralField("streetName", streetName))
                  }
                />
              </div>
            </div>

            <div className="w-1/4">
              <TextInput
                label="Nr."
                value={streetNumber}
                onComplete={streetNumber =>
                  dispatch(updateGeneralField("streetNumber", streetNumber))
                }
              />
            </div>
          </div>

          <div className="flex flex-wrap mb-6">
            <div className="w-2/5">
              <div className="mr-4">
                <TextInput
                  label="Postleitzahl"
                  value={zipCode}
                  onComplete={zipCode =>
                    dispatch(updateGeneralField("zipCode", zipCode))
                  }
                />
              </div>
            </div>

            <div className="w-3/5">
              <TextInput
                label="Stadt"
                value={city}
                onComplete={city => dispatch(updateGeneralField("city", city))}
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
                  value={phone}
                  onComplete={phone =>
                    dispatch(updateGeneralField("phone", phone))
                  }
                />
              </div>
            </div>

            <div className="w-1/2">
              <TextInput
                label="Telefax"
                value={fax}
                onComplete={fax => dispatch(updateGeneralField("fax", fax))}
              />
            </div>
          </div>

          <div className="mb-6">
            <TextInput
              label="Email"
              value={email}
              onComplete={email => dispatch(updateGeneralField("email", email))}
            />
          </div>
        </div>
      </div>

      <Title3>Bankverbindung</Title3>

      <div className="w-1/2">
        <BankDetails />
      </div>
    </Card>
  );
}

export default General;
