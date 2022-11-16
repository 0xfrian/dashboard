function TableRow({ date, merchant, amount }) {
    return (
        <tr className="table-row">
            <td className="date">{date}</td>
            <td className="merchant">{merchant}</td>
            <td className="amount">{amount}</td>
        </tr>
    );
}

export default TableRow;

