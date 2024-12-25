import { Filter, SortBy, TableOperations } from "@/ui";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField={"discount"}
        filterOptions={[
          { value: "all", label: "All" },
          { value: "with_discount", label: "With discount" },
          { value: "without_discount", label: "Without discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularprice-asc", label: "Sort by price (Low first)" },
          { value: "regularprice-desc", label: "Sort by price (High first)" },
          { value: "maxcapacity-asc", label: "Sort by capacity (Low first)" },
          { value: "maxcapacity-desc", label: "Sort by capacity (High first)" },
        ]}
      />
    </TableOperations>
  );
}
export default CabinTableOperations;
