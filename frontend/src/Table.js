// === Node Packages === 
import { useEffect } from "react";
import uuid from "react-uuid";

// === Components ===
import TableRow from "./TableRow.js";

// === Helper Functions ===
const dollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

// === Table Component ===
function Table({ statements, rows, setRows }) {
    useEffect(() => {
            for (const statement of statements) {
                let _rows = [];
                for (const tx of statement.data) {
                    console.log("Tx: ", tx);
                    const amount_formatted = dollar.format(parseFloat(tx.Amount.replace("$", "")));
                    const row = <TableRow 
                        key={uuid()}
                        date={tx.Date}
                        merchant={tx.Merchant}
                        amount={amount_formatted}
                    />;
                    _rows.push(row);
                }
                setRows(rows => [...rows, ..._rows]);
            }
    }, [statements, setRows]);

    return (
        <div className="table-container silver shadow border">
            <h2 className="section-heading">
                Transactions
            </h2>
            <table className="table">
                <tbody className="table-body">
                    <tr className="table-row">
                        <th className="date" scope="col">
                            Date
                        </th>
                        <th className="merchant" scope="col">
                            Merchant
                        </th>
                        <th className="amount" scope="col">
                            Amount
                        </th>
                    </tr>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

export default Table;

