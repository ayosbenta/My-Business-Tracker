
import React from 'react';
import { EAccessSystem } from '../types';
import CrudBase from './CrudBase';
import { SALES_PERSONNEL } from '../constants';

interface EAccessProps {
  systems: EAccessSystem[];
  setSystems: React.Dispatch<React.SetStateAction<EAccessSystem[]>>;
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

const EAccess: React.FC<EAccessProps> = ({ systems, setSystems }) => {
  const initialFormState: EAccessSystem = {
    id: '',
    fullName: '',
    agencyName: '',
    mobile: '',
    processedBy: '',
    dateAdded: '',
  };
  
  const formFields = (item: Partial<EAccessSystem>, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) => (
    <>
      <FormInputField label="Full Name" name="fullName" value={item.fullName || ''} onChange={handleChange as any} />
      <FormInputField label="Travel Agency Name" name="agencyName" value={item.agencyName || ''} onChange={handleChange as any} />
      <FormInputField label="Mobile" name="mobile" value={item.mobile || ''} onChange={handleChange as any} />
      <FormSelectField label="Process By" name="processedBy" value={item.processedBy || ''} onChange={handleChange as any} options={SALES_PERSONNEL} />
    </>
  );

  const headers = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'agencyName', label: 'Agency Name' },
    { key: 'mobile', label: 'Mobile' },
    { key: 'processedBy', label: 'Processed By' },
    { key: 'dateAdded', label: 'Date Added' },
  ] as { key: keyof EAccessSystem; label: string }[];
  
  return (
    <CrudBase<EAccessSystem>
      title="eAccess Systems"
      data={systems}
      setData={setSystems}
      formFields={formFields}
      initialFormState={initialFormState}
      headers={headers}
      itemTypeLabel="System"
    />
  );
};

export default EAccess;
