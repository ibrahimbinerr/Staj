import React from 'react';

interface InputFormProps {
    inputValues: string[];
    onInputChange: (index: number, value: string) => void;
    onCreateTable: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ inputValues, onInputChange, onCreateTable }) => {
    return (
        <div className="flex space-x-2">
            {inputValues.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => onInputChange(index, e.target.value)}
                    className="bg-gray-700 px-2 py-1 rounded"
                />
            ))}
            <button
                onClick={onCreateTable}
                className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded"
            >
                Tablo Oluştur
            </button>
        </div>
    );
};

export default InputForm;