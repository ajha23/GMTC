import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllTransactions } from "./store/transactions/action";
import { TableConfiguration } from "./commons/configuration/TableConfiguration";
import Table from "./commons/Table/Table";
import Create from "./components/Create/Create";
import Search from "./components/Search/Search";
import ContainerCards from "./commons/UI/Card/Card";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getAllTransactions());
  }, [dispatch]);

  return (
    <ContainerCards>
      <div style={{ height: 600, maxWidth: "750px", marginLeft: "22%" }}>
        <div className="header-container">
          <h2 className="header-name">Transactions</h2> <Create />
        </div>
        <Search />
        <Table data={transactions} columnsConfig={TableConfiguration.columns} />
      </div>
    </ContainerCards>
  );
};

export default App;
