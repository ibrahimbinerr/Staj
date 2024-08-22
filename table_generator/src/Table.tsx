import React from 'react';
import { TableData } from './types';

interface TableProps {
    table: TableData;
    onAddRow: () => void;
    onDeleteRow: (rowIndex: number) => void;
    onClearTable: () => void;
    onDeleteTable: () => void;
}

const Table: React.FC<TableProps> = ({ table, onAddRow, onDeleteRow, onClearTable, onDeleteTable }) => {
    return (
        <div className="border border-gray-600 p-4 rounded">
            <div className="flex justify-between mb-2">
                <button onClick={onDeleteTable} className="bg-red-500 hover:bg-red-600 px-2 py-1 rounded">Tabloyu Sil</button>
                <button onClick={onClearTable} className="bg-yellow-500 hover:bg-yellow-600 px-2 py-1 rounded">Temizle</button>
                <button onClick={onAddRow} className="bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded">Ekle</button>
            </div>
            <table className="w-full">
                <thead>
                    <tr>
                        {table.columns.map((column, index) => (
                            <th key={index} className="border border-gray-600 px-2 py-1">{column}</th>
                        ))}
                        <th className="border border-gray-600 px-2 py-1">aksiyonlar</th>
                    </tr>
                </thead>
                <tbody>
                    {table.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="border border-gray-600 px-2 py-1">{cell}</td>
                            ))}
                            <td className="border border-gray-600 px-2 py-1 flex justify-center">
                                <button
                                    onClick={() => onDeleteRow(rowIndex)}
                                    className="bg-red-500 hover:bg-red-600 px-2 py-1  rounded"
                                >
                                    Satırı Sil
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;