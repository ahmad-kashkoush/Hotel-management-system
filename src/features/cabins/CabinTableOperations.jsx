import { Filter, TableOperations } from "@/ui";

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
    </TableOperations>
  );
}
export default CabinTableOperations;
