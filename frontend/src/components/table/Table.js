import React from "react";

function Table({titleRow, rows}) {
    const titleRowElement = titleRow.map((el) => {
        return <th scope="col" class="px-6 py-3">
            {el}
        </th>
    });

    const rowsElement = rows.map((row) => {
        const tdElements = row.map((el) => {
            return <td className='px-6 py-4'>{el}</td>
        });

        return <tr class="border-b bg-third dark:border-gray-700">
            {tdElements}
        </tr>
    }); 

    return (
        <div class="relative overflow-x-auto rounded-lg">
            <table class="w-full text-left text-gray-500 dark:text-gray-400">
                <thead class="text-white font-semibold bg-second">
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