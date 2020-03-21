import React from "react";

import TextInput from "./TextInput";
import AfterTaxTable from './after-tax-values';

function AfterTaxValue({ beforeTax, category, taxClass }) {
  let afterTaxValue = calculateValueAfterTax(beforeTax, category, taxClass);
  return <TextInput disabled value={afterTaxValue} />;
}

function calculateValueAfterTax(beforeTax, category, taxClass) {
  let beforeTaxValue = parseFloat(beforeTax);
  let entry = AfterTaxTable.find((entry) => entry.min <= beforeTaxValue && beforeTaxValue <= entry.max)

  if (entry == null) { return ""; }

  let key = `leistungssatz_${category}`
  return entry[key][taxClass - 1];
}

export default AfterTaxValue;
