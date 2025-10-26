
import React from 'react';
import { Expense } from '../types';
import CrudBase from './CrudBase';

interface ExpensesProps {
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
}

const FormInputField: React.FC<{ label: string; name: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean; step?: string }> = ({ label, name, value, onChange, type = 'text', required = true, step }) => (
    <div className="col-span-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            step={step}
            className="w-full bg-base-100 border border-base-300 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-primary focus:border-primary"
        />
    </div>
);

const Expenses: React.FC<ExpensesProps> = ({ expenses, setExpenses }) => {
  const initialFormState: Expense = {
    id: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: 0,
  };
  
  const formFields = (item: Partial<Expense>, handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void) => (
    <>
      <FormInputField label="Date" name="date" type="date" value={item.date || new Date().toISOString().split('T')[0]} onChange={handleChange} />
      <FormInputField label="Description" name="description" value={item.description || ''} onChange={handleChange} />
      <FormInputField label="Amount" name="amount" type="number" step="0.01" value={item.amount || 0} onChange={handleChange} />
    </>
  );

  const headers = [
    { key: 'date', label: 'Date' },
    { key: 'description', label: 'Description' },
    { key: 'amount', label: 'Amount' },
  ] as { key: keyof Expense; label: string }[];

  return (
    <CrudBase<Expense>
      title="Expenses"
      data={expenses}
      setData={setExpenses}
      formFields={formFields}
      initialFormState={initialFormState}
      headers={headers}
      itemTypeLabel="Expense"
    />
  );
};

export default Expenses;
