
import React from 'react';
import { DitoApplication } from '../types';
import CrudBase from './CrudBase';
import { SALES_PERSONNEL } from '../constants';

interface DitoProps {
  applications: DitoApplication[];
  setApplications: React.Dispatch<React.SetStateAction<DitoApplication[]>>;
}

const FormInputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; type?: string; required?: boolean }> = ({ label, name, value, onChange, type = 'text', required = true }) => (
    <div className="col-span-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            type={type}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-base-100 border border-base-300 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-primary focus:border-primary"
        />
    </div>
);

const FormSelectField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[]; required?: boolean }> = ({ label, name, value, onChange, options, required = true }) => (
    <div className="col-span-1">
        <label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            required={required}
            className="w-full bg-base-100 border border-base-300 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-primary focus:border-primary"
        >
            <option value="">Select {label}</option>
            {options.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
    </div>
);


const Dito: React.FC<DitoProps> = ({ applications, setApplications }) => {
  const initialFormState: DitoApplication = {
    id: '',
    fullName: '',
    address: '',
    applicationNo: '',
    mobileNo: '',
    processedBy: '',
    status: 'Pending',
    dateAdded: '',
  };
  
  const formFields = (item: Partial<DitoApplication>, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) => (
    <>
      <FormInputField label="Full Name" name="fullName" value={item.fullName || ''} onChange={handleChange as any} />
      <FormInputField label="Address" name="address" value={item.address || ''} onChange={handleChange as any} />
      <FormInputField label="Application No." name="applicationNo" value={item.applicationNo || ''} onChange={handleChange as any} />
      <FormInputField label="Mobile No." name="mobileNo" value={item.mobileNo || ''} onChange={handleChange as any} />
      <FormSelectField label="Process By" name="processedBy" value={item.processedBy || ''} onChange={handleChange} options={SALES_PERSONNEL} />
      <FormSelectField label="Status" name="status" value={item.status || 'Pending'} onChange={handleChange} options={['Pending', 'Approved']} />
    </>
  );

  const headers = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'applicationNo', label: 'Application No.' },
    { key: 'mobileNo', label: 'Mobile' },
    { key: 'processedBy', label: 'Processed By' },
    { key: 'status', label: 'Status' },
    { key: 'dateAdded', label: 'Date Added' },
  ] as { key: keyof DitoApplication; label: string }[];
  
  return (
    <CrudBase<DitoApplication>
      title="DITO Applications"
      data={applications}
      setData={setApplications}
      formFields={formFields}
      initialFormState={initialFormState}
      headers={headers}
      itemTypeLabel="Application"
    />
  );
};

export default Dito;
