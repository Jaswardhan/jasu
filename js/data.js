// Metro360 - Initial Seed Data & Mock Database System

const METRO_SEED_DATA = {
  currentUser: null,

  users: [
    { id: 'usr-owner', username: 'trader1', name: 'Rajesh Traders Pvt Ltd', role: 'owner', email: 'rajesh@traders.com', gstin: '07AAAAA0000A1Z5', phone: '9876543210', district: 'New Delhi' },
    { id: 'usr-lmo', username: 'lmo_officer', name: 'Officer V. K. Sharma', role: 'lmo', email: 'lmo.sharma@gov.in', officerId: 'LMO-DL-402', district: 'New Delhi', designation: 'Senior Legal Metrology Officer' },
    { id: 'usr-gatc', username: 'gatc_lab', name: 'Apex Calibration Services (GATC)', role: 'gatc', email: 'lab@apexcal.com', gatcId: 'GATC-2026-09', district: 'New Delhi', accreditation: 'NABL & DCA Approved' },
    { id: 'usr-mfr', username: 'mfr_essae', name: 'Essae-Teraoka Electronics Ltd', role: 'manufacturer', email: 'reg@essae.com', licenseNo: 'MFR-LM-2024-88', district: 'Bengaluru' },
    { id: 'usr-admin', username: 'dir_admin', name: 'Directorate Metrology Admin', role: 'directorate', email: 'admin@metrology.gov.in', district: 'Central Headquarter' },
    { id: 'usr-consumer', username: 'consumer', name: 'Public Consumer / Visitor', role: 'consumer', email: 'public@citizen.org' }
  ],

  instruments: [
    {
      idi: 'IDI-2026-WM-8841',
      serialNo: 'DS-2025-9982',
      category: 'Electronic Weighing Scale (Class III)',
      brandModel: 'Essae DS-215 (Max 30kg, e=5g)',
      ownerName: 'Rajesh Traders Pvt Ltd',
      gstin: '07AAAAA0000A1Z5',
      address: 'Shop 42, Khan Market, New Delhi',
      district: 'New Delhi',
      status: 'Verified',
      verificationDate: '2026-01-15',
      expiryDate: '2027-01-14',
      certificateNo: 'CERT-LM-2026-00481',
      lmoName: 'Officer V. K. Sharma',
      lmoId: 'LMO-DL-402',
      stampDetails: 'Government Seal #DL-402-2026-A',
      maxCapacity: '30 kg',
      minCapacity: '100 g',
      verificationFee: 500,
      qrPayload: 'https://metro360.gov.in/verify?idi=IDI-2026-WM-8841'
    },
    {
      idi: 'IDI-2026-WM-9902',
      serialNo: 'FP-2024-7711',
      category: 'Fuel Dispensing Pump (Multi-Nozzle Petrol/Diesel)',
      brandModel: 'Midco Spectrum 2000',
      ownerName: 'Bharat Petroleum Station',
      gstin: '07BBBBA1111B2Z8',
      address: 'Plot 12, Ring Road, South Ext, New Delhi',
      district: 'New Delhi',
      status: 'Expiring Soon',
      verificationDate: '2025-10-05',
      expiryDate: '2026-10-04',
      certificateNo: 'CERT-LM-2025-88102',
      lmoName: 'Officer V. K. Sharma',
      lmoId: 'LMO-DL-402',
      stampDetails: 'Government Seal #DL-402-2025-B',
      maxCapacity: '50 L/min',
      minCapacity: '5 L',
      verificationFee: 2500,
      qrPayload: 'https://metro360.gov.in/verify?idi=IDI-2026-WM-9902'
    },
    {
      idi: 'IDI-2026-WM-1045',
      serialNo: 'WB-2023-3390',
      category: 'Pitless Heavy Weighbridge (50 Tonnes)',
      brandModel: 'Avery India Weighbridge 50T',
      ownerName: 'Apex Cement Warehouse',
      gstin: '07CCCCA2222C3Z1',
      address: 'Okhla Industrial Area Ph-III, New Delhi',
      district: 'South Delhi',
      status: 'Expired',
      verificationDate: '2025-02-10',
      expiryDate: '2026-02-09',
      certificateNo: 'CERT-LM-2025-11029',
      lmoName: 'Officer R. P. Singh',
      lmoId: 'LMO-DL-109',
      stampDetails: 'Government Seal #DL-109-2025-Z',
      maxCapacity: '50,000 kg',
      minCapacity: '200 kg',
      verificationFee: 7500,
      qrPayload: 'https://metro360.gov.in/verify?idi=IDI-2026-WM-1045'
    },
    {
      idi: 'IDI-2026-WM-3310',
      serialNo: 'FLM-2026-0044',
      category: 'Industrial Liquid Flow Meter',
      brandModel: 'Endress+Hauser Promass 80F',
      ownerName: 'Deluxe Dairy & Beverage Corp',
      gstin: '07DDDDD3333D4Z2',
      address: 'Mayapuri Industrial Area Phase II, New Delhi',
      district: 'West Delhi',
      status: 'Pending Inspection',
      verificationDate: '-',
      expiryDate: '-',
      certificateNo: 'Pending',
      lmoName: 'Assigned to Officer V. K. Sharma',
      lmoId: 'LMO-DL-402',
      stampDetails: 'Awaiting Physical Verification',
      maxCapacity: '1000 L/min',
      minCapacity: '10 L/min',
      verificationFee: 3500,
      qrPayload: 'https://metro360.gov.in/verify?idi=IDI-2026-WM-3310'
    }
  ],

  applications: [
    {
      appId: 'APP-2026-8801',
      idi: 'IDI-2026-WM-3310',
      ownerName: 'Deluxe Dairy & Beverage Corp',
      category: 'Industrial Liquid Flow Meter',
      submittedDate: '2026-09-20',
      preferredDate: '2026-09-30',
      status: 'Scheduled',
      assignedOfficer: 'Officer V. K. Sharma',
      feePaid: 3500,
      paymentRef: 'PAY-UPI-992018821',
      readinessCheck: 'Passed (Self-Check 100% OK)'
    },
    {
      appId: 'APP-2026-9904',
      idi: 'IDI-2026-WM-9902',
      ownerName: 'Bharat Petroleum Station',
      category: 'Fuel Dispensing Pump',
      submittedDate: '2026-09-25',
      preferredDate: '2026-10-02',
      status: 'Scrutiny Passed',
      assignedOfficer: 'Officer V. K. Sharma',
      feePaid: 2500,
      paymentRef: 'PAY-NB-88192033',
      readinessCheck: 'Passed'
    }
  ],

  inspections: [
    {
      inspectionId: 'INSP-2026-441',
      idi: 'IDI-2026-WM-8841',
      lmoName: 'Officer V. K. Sharma',
      date: '2026-01-15',
      nominalValue: '10,000 g (10 kg)',
      observedReading: '10,002 g',
      errorVal: '+2 g',
      mpeAllowed: '± 5 g',
      result: 'PASS - COMPLIANT',
      stampedSealNo: 'DL-402-2026-A',
      remarks: 'Instrument verified according to Legal Metrology General Rules 2011 Schedule VI.'
    }
  ],

  modelApprovals: [
    {
      modelId: 'MA-2026-091',
      mfrName: 'Essae-Teraoka Electronics Ltd',
      modelName: 'Essae DS-250 High Precision Scale',
      category: 'Class II High Precision Balance',
      submittedDate: '2026-08-10',
      status: 'Approved',
      certificateNo: 'IND-MA-2026-409',
      approvalDate: '2026-08-25',
      documents: ['Technical Drawing.pdf', 'Accuracy Test Report.pdf', 'Pattern Approval Certificate.pdf']
    },
    {
      modelId: 'MA-2026-114',
      mfrName: 'Essae-Teraoka Electronics Ltd',
      modelName: 'Essae Smart Weighbridge Controller WBC-500',
      category: 'Weighbridge Digital Indicator',
      submittedDate: '2026-09-18',
      status: 'Under Scrutiny',
      certificateNo: 'In Process',
      approvalDate: '-',
      documents: ['Spec Sheet.pdf', 'Circuit Diagram.pdf']
    }
  ],

  gatcTestReports: [
    {
      reportId: 'GATC-REP-2026-88',
      idi: 'IDI-2026-WM-3310',
      gatcName: 'Apex Calibration Services (GATC)',
      testerName: 'Er. Ankit Verma',
      testDate: '2026-09-24',
      parametersTested: 'Flow rate accuracy, pressure drop, pulse output linearity',
      measuredAccuracy: '99.94%',
      status: 'PASSED & SENT TO LMO',
      rawReadings: 'Run 1: 100.1L/min, Run 2: 100.0L/min, Run 3: 99.9L/min'
    }
  ],

  complaints: [
    {
      ticketId: 'CMP-2026-0091',
      idi: 'IDI-2026-WM-9902',
      serialNo: 'FP-2024-7711',
      complainantName: 'Amit Saxena',
      phone: '9811223344',
      category: 'Short Delivery / Inaccurate Quantity',
      description: 'Filled 10 Liters of petrol at nozzle #2, but fuel tank level indicator showed noticeably less. Suspect short delivery.',
      submittedDate: '2026-09-22',
      status: 'Action Taken',
      officerAssigned: 'Officer V. K. Sharma',
      findings: 'LMO dispatched notice for re-verification test on 2026-09-24.'
    },
    {
      ticketId: 'CMP-2026-0104',
      idi: 'IDI-2026-WM-1045',
      serialNo: 'WB-2023-3390',
      complainantName: 'Sunil Kumar Logistics',
      phone: '9711009988',
      category: 'Expired Verification Seal / Unstamped Equipment',
      description: 'Weighbridge at Okhla has an expired verification certificate dated Feb 2026. Still operating commercially.',
      submittedDate: '2026-09-26',
      status: 'Under Investigation',
      officerAssigned: 'Officer R. P. Singh',
      findings: 'Notice issued to Apex Cement Warehouse to cease commercial weighment until re-verified.'
    }
  ],

  auditLogs: [
    { id: 'log-1', timestamp: '2026-09-28 09:30:12', user: 'System Auto-Alert', action: 'Expiry Alert Sent', details: 'Notification generated for IDI-2026-WM-9902 (Expiring in 6 days).' },
    { id: 'log-2', timestamp: '2026-09-26 14:15:00', user: 'Officer V. K. Sharma', action: 'Inspection Scheduled', details: 'Assigned appointment APP-2026-8801 to field inspection slot.' },
    { id: 'log-3', timestamp: '2026-09-24 16:45:20', user: 'Apex Calibration Services', action: 'GATC Test Upload', details: 'Uploaded standardized digital test report GATC-REP-2026-88 for IDI-2026-WM-3310.' }
  ]
};

// LocalStorage Persistence Helper
function getDB() {
  const data = localStorage.getItem('metro360_db');
  if (!data) {
    localStorage.setItem('metro360_db', JSON.stringify(METRO_SEED_DATA));
    return METRO_SEED_DATA;
  }
  try {
    return JSON.parse(data);
  } catch(e) {
    localStorage.setItem('metro360_db', JSON.stringify(METRO_SEED_DATA));
    return METRO_SEED_DATA;
  }
}

function saveDB(db) {
  localStorage.setItem('metro360_db', JSON.stringify(db));
}

function getCurrentUser() {
  const db = getDB();
  return db.currentUser;
}

function setCurrentUser(user) {
  const db = getDB();
  db.currentUser = user;
  saveDB(db);
}
