
export interface DitoApplication {
  id: string;
  fullName: string;
  address: string;
  applicationNo: string;
  mobileNo: string;
  processedBy: string;
  status: 'Pending' | 'Approved';
  dateAdded: string;
}

export interface EAccessSystem {
  id: string;
  fullName: string;
  agencyName: string;
  mobile: string;
  processedBy: string;
  dateAdded: string;
}

export interface Expense {
  id: string;
  date: string;
  description: string;
  amount: number;
}
