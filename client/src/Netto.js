import React from "react";

import TextInput from "./TextInput";
import NettoTable from './netto-values';

function Netto({ brutto, category, taxClass }) {
  let netto = calculateNetto(brutto, category, taxClass);
  return <TextInput disabled value={netto} />;
}

function calculateNetto(brutto, category, taxClass) {
  let bruttoValue = parseFloat(brutto);
  let entry = NettoTable.find((entry) => entry.min <= bruttoValue && bruttoValue <= entry.max)

  if (entry == null) { return ""; }

  let key = `leistungssatz_${category}`
  return entry[key][taxClass - 1];
}

export default Netto;
