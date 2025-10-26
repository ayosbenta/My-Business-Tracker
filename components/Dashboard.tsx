import React, { useMemo } from 'react';
import { DitoApplication, EAccessSystem, Expense } from '../types';
import { DITO_PRICE, EACCESS_PRICE, SALES_PERSONNEL } from '../constants';

interface DashboardProps {
  ditoData: DitoApplication[];
  eAccessData: EAccessSystem[];
  expensesData: Expense[];
}

// Fix: Changed JSX.Element to React.ReactElement to resolve namespace issue.
const StatCard: React.FC<{ title: string, value: string | number, icon: React.ReactElement, color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-base-200 p-6 rounded-2xl shadow-lg flex items-center">
        <div className={`p-4 rounded-full ${color}`}>
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ ditoData, eAccessData, expensesData }) => {
    const ditoStats = useMemo(() => {
        const approved = ditoData.filter(app => app.status === 'Approved');
        const pending = ditoData.filter(app => app.status === 'Pending');
        return {
            totalSales: (approved.length * DITO_PRICE).toLocaleString('en-US', { style: 'currency', currency: 'PHP' }),
            totalApplications: ditoData.length,
            totalApproved: approved.length,
            totalPending: pending.length,
        };
    }, [ditoData]);

    const eAccessStats = useMemo(() => {
        const totalSales = (eAccessData.length * EACCESS_PRICE);
        const salesByPerson = SALES_PERSONNEL.reduce((acc, person) => {
            acc[person] = eAccessData.filter(sys => sys.processedBy === person).length * EACCESS_PRICE;
            return acc;
        }, {} as Record<string, number>);

        return {
            totalSales: totalSales.toLocaleString('en-US', { style: 'currency', currency: 'PHP' }),
            salesByPerson,
        };
    }, [eAccessData]);

    const totalExpenses = useMemo(() => {
        return expensesData.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString('en-US', { style: 'currency', currency: 'PHP' });
    }, [expensesData]);

    const CurrencyIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" />
        </svg>
    );

    return (
        <div>
            <h1 className="text-4xl font-bold text-white mb-8">Dashboard</h1>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">DITO Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Sales" value={ditoStats.totalSales} icon={<CurrencyIcon />} color="bg-success" />
                    <StatCard title="Total Applications" value={ditoStats.totalApplications} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>} color="bg-info" />
                    <StatCard title="Total Approved" value={ditoStats.totalApproved} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="bg-accent" />
                    <StatCard title="Pending" value={ditoStats.totalPending} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} color="bg-warning" />
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">eAccess Travel Summary</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Sales" value={eAccessStats.totalSales} icon={<CurrencyIcon />} color="bg-success" />
                    {SALES_PERSONNEL.map(person => (
                        <StatCard key={person} title={`${person}'s Sales`} value={eAccessStats.salesByPerson[person].toLocaleString('en-US', { style: 'currency', currency: 'PHP' })} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>} color="bg-primary" />
                    ))}
                </div>
            </section>
            
            <section>
                <h2 className="text-2xl font-semibold text-gray-300 mb-4">Financial Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Total Expenses" value={totalExpenses} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>} color="bg-error" />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;