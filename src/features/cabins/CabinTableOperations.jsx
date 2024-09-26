import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No Discount",
          },
          {
            value: "with-discount",
            label: "With Discount",
          },
        ]}
      />
      <SortBy
        options={[
          {
            label: "Sort by name(A-Z)",
            value: "name-asc",
          },
          {
            label: "Sort by name(Z-A)",
            value: "name-des",
          },
          {
            label: "Sort by capacity(low-high)",
            value: "maxCapacity-asc",
          },
          {
            label: "Sort by capacity(high-low)",
            value: "maxCapacity-des",
          },
          {
            label: "Sort by price(low-high)",
            value: "regularPrice-asc",
          },
          {
            label: "Sort by price(high-low)",
            value: "regularPrice-des",
          },
          {
            label: "Sort by discount(low-high)",
            value: "discount-asc",
          },
          {
            label: "Sort by discount(high-low)",
            value: "discount-des",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
