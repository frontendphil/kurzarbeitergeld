import AfterTaxTable from "./after-tax-values";

// "new state" -> "neue Bundesländer" :-O
export function calculateValueAfterTax(
  beforeTax,
  hasChildren,
  taxClass,
  isNewState
) {
  // For employees in the new parts of Germany, we only check the table up to a maximum
  // value. For everywhere else, check all entries.
  let maxValue = isNewState ? 6449.99 : Infinity;
  let beforeTaxValue = parseFloat(beforeTax);
  beforeTaxValue = Math.min(beforeTaxValue, maxValue);
  let entry = AfterTaxTable.find(
    entry =>
      entry.min <= beforeTaxValue && (!entry.max || beforeTaxValue <= entry.max)
  );

  if (entry == null) {
    return "";
  }

  let key = hasChildren ? "leistungssatz_1" : "leistungssatz_2";
  return entry[key][taxClass - 1];
}
