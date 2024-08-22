import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import InputForm from './InputForm';
import Table from './Table';
import { TableData } from './types';

const App: React.FC = () => {
    const [tables, setTables] = useState<TableData[]>([]);
    const [inputValues, setInputValues] = useState<string[]>(['', '', '']);

    const handleInputChange = (index: number, value: string) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const createTable = () => {
        const newTable: TableData = {
            id: uuidv4(),
            columns: ['ad', 'soyad', 'numara'],
            rows: [inputValues],
        };
        setTables([...tables, newTable]);
        setInputValues(['', '', '']);
    };

    const addRowToTable = (tableId: string) => {
        setTables(tables.map(table =>
            table.id === tableId
                ? { ...table, rows: [...table.rows, inputValues] }
                : table
        ));
        setInputValues(['', '', '']);
    };

    const deleteRowFromTable = (tableId: string, rowIndex: number) => {
        setTables(tables.map(table =>
            table.id === tableId
                ? { ...table, rows: table.rows.filter((_, index) => index !== rowIndex) }
                : table
        ));
    };

    const clearTable = (tableId: string) => {
        setTables(tables.map(table =>
            table.id === tableId ? { ...table, rows: [] } : table
        ));
    };

    const deleteTable = (tableId: string) => {
        setTables(tables.filter(table => table.id !== tableId));
    };

    const deleteAllTables = () => {
        setTables([]);
    };

    return (
        <div className="p-4 bg-gray-800 text-white min-h-screen">
            <h1 className="text-2xl mb-4">liste</h1>
            <InputForm
                inputValues={inputValues}
                onInputChange={handleInputChange}
                onCreateTable={createTable}
            />
            <div className="mt-4 flex justify-between">
                <button
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
                    onClick={deleteAllTables}
                >
                    Tüm Tabloları Sil
                </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
                {tables.map(table => (
                    <Table
                        key={table.id}
                        table={table}
                        onAddRow={() => addRowToTable(table.id)}
                        onDeleteRow={(rowIndex:any) => deleteRowFromTable(table.id, rowIndex)}
                        onClearTable={() => clearTable(table.id)}
                        onDeleteTable={() => deleteTable(table.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default App;