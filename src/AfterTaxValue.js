import React from "react";

import TextInput from "./TextInput";
import AfterTaxTable from "./after-tax-values";

function AfterTaxValue({ beforeTax, hasChildren, taxClass }) {
  let afterTaxValue = calculateValueAfterTax(beforeTax, hasChildren, taxClass);
  return (
    <TextInput
      disabled
      label="Netto"
      value={afterTaxValue ? `${afterTaxValue} €` : ""}
    />
  );
}

function calculateValueAfterTax(beforeTax, hasChildren, taxClass) {
  let beforeTaxValue = parseFloat(beforeTax);
  let entry = AfterTaxTable.find(
    entry => entry.min <= beforeTaxValue && beforeTaxValue <= entry.max
  );

  if (entry == null) {
    return "";
  }

  let key = hasChildren ? "leistungssatz_1" : "leistungssatz_2";
  return entry[key][taxClass - 1];
}

export default AfterTaxValue;
