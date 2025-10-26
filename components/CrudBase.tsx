import React, { useState, useCallback } from 'react';
import Modal from './Modal';

interface CrudBaseProps<T extends { id: string }> {
    title: string;
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    formFields: (item: Partial<T>, handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) => React.ReactNode;
    initialFormState: T;
    headers: { key: keyof T; label: string }[];
    itemTypeLabel: string;
}

const CrudBase = <T extends { id: string },>({
    title,
    data,
    setData,
    formFields,
    initialFormState,
    headers,
    itemTypeLabel
}: CrudBaseProps<T>) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState<Partial<T>>(initialFormState);
    const [isEditing, setIsEditing] = useState(false);

    const openModalForNew = useCallback(() => {
        setIsEditing(false);
        setCurrentItem(initialFormState);
        setIsModalOpen(true);
    }, [initialFormState]);
    
    const openModalForEdit = useCallback((item: T) => {
        setIsEditing(true);
        setCurrentItem(item);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) : value }));
    }, []);

    // Fix: Refactored handleSubmit to correctly handle new item creation.
    // This resolves the generic type conversion error by creating a full object from initialFormState.
    // It also fixes a logic bug by only adding `dateAdded` to types that support it.
    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            setData(prev => prev.map(item => (item.id === currentItem.id ? { ...item, ...currentItem } : item)));
        } else {
            const newItem = {
                ...initialFormState,
                ...currentItem,
                id: new Date().toISOString(),
            };

            if ('dateAdded' in initialFormState) {
                // The type assertion is needed because TypeScript can't infer that `dateAdded` exists on `newItem` from the generic constraint.
                (newItem as any).dateAdded = new Date().toISOString().split('T')[0];
            }
            setData(prev => [...prev, newItem as T]);
        }
        closeModal();
    }, [currentItem, isEditing, setData, closeModal, initialFormState]);
    
    const handleDelete = useCallback((id: string) => {
        if (window.confirm(`Are you sure you want to delete this ${itemTypeLabel}?`)) {
            setData(prev => prev.filter(item => item.id !== id));
        }
    }, [setData, itemTypeLabel]);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">{title}</h1>
                <button
                    onClick={openModalForNew}
                    className="px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-75 transition-colors duration-200"
                >
                    + Add {itemTypeLabel}
                </button>
            </div>

            <div className="bg-base-200 shadow-xl rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm text-left text-gray-300">
                        <thead className="bg-base-300 text-xs text-gray-400 uppercase tracking-wider">
                            <tr>
                                {headers.map(header => (
                                    <th key={String(header.key)} className="px-6 py-3">{header.label}</th>
                                ))}
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-base-300">
                            {data.map(item => (
                                <tr key={item.id} className="hover:bg-base-300/50 transition-colors duration-150">
                                    {headers.map(header => (
                                        <td key={`${item.id}-${String(header.key)}`} className="px-6 py-4 whitespace-nowrap">
                                            {
                                                header.key === 'status' ?
                                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item[header.key] === 'Approved' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
                                                        {String(item[header.key])}
                                                    </span> :
                                                    String(item[header.key])
                                            }
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button onClick={() => openModalForEdit(item)} className="text-accent hover:text-info mr-4">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="text-error hover:text-red-500">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal} title={`${isEditing ? 'Edit' : 'Add'} ${itemTypeLabel}`}>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formFields(currentItem, handleChange)}
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={closeModal} className="px-4 py-2 bg-base-300 text-white rounded-md hover:bg-gray-600 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition-colors">{isEditing ? 'Save Changes' : 'Add'}</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CrudBase;