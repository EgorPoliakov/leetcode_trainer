import React from "react";

function Table({titleRow, rows}) {
    const titleRowElement = titleRow.map((el, idx) => {
        return <th key={idx} scope="col" className="px-6 py-3">
            {el}
        </th>
    });

    const rowsElement = rows.map((row, idx) => {
        const tdElements = row.map((el, idx) => {
            return <td key={idx} className='px-6 py-4'>{el}</td>
        });

        return <tr key={idx} className="border-b bg-third dark:border-gray-700">
            {tdElements}
        </tr>
    }); 

    return (
        <div className="relative overflow-x-auto rounded-lg">
            <table className="w-full text-left text-gray-500 dark:text-gray-400">
                <thead className="text-white font-semibold bg-second">
                    <tr>
                        {titleRowElement}
                    </tr>
                </thead>
                <tbody>
                    {rowsElement}
                </tbody>
            </table>
        </div>
    );
}

export default Table;