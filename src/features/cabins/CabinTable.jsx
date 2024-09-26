import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();
  const [searchParams, setSearchParams] = useSearchParams();
  const discountFilter = searchParams.get("discount") || "all";
  const sortBy = (searchParams.get("sort") || "name-asc").split("-");

  let filteredCabins;
  if (discountFilter === "all") filteredCabins = cabins;
  if (discountFilter === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount <= 0);
  if (discountFilter === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
  if (sortBy.length === 2) {
    if (sortBy[1] === "asc") {
      filteredCabins?.sort((a, b) => a[sortBy[0]] - b[sortBy[0]]);
    } else if (sortBy[1] === "des") {
      filteredCabins?.sort((a, b) => b[sortBy[0]] - a[sortBy[0]]);
    }
  }
  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={filteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
