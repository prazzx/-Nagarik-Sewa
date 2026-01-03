const mongoose = require('mongoose');
require('dotenv').config();

const Service = require('./models/Service');
const ServiceInfo = require('./models/ServiceInfo');
const EligibilityQuestion = require('./models/EligibilityQuestion');
const RequiredDocument = require('./models/RequiredDocument');
const ProcedureStep = require('./models/ProcedureStep');
const ServiceCost = require('./models/ServiceCost');
const DownloadableForm = require('./models/DownloadableForm');
const District = require('./models/District');
const Municipality = require('./models/Municipality');
const Office = require('./models/Office');

// ============= SERVICES DATA =============
const services = [
  { _id: 'citizenship', title: 'Citizenship Certificate', titleNepali: 'नागरिकता प्रमाणपत्र', description: 'Apply for citizenship by descent, birth, or naturalization', icon: 'FileText', category: 'Identity', available: true },
  { _id: 'passport', title: 'Passport', titleNepali: 'राहदानी', description: 'Apply for new passport or renewal', icon: 'MapPin', category: 'Identity', available: true },
  { _id: 'land', title: 'Land Registration', titleNepali: 'जग्गा दर्ता', description: 'Register land ownership and transfers', icon: 'Home', category: 'Property', available: true },
  { _id: 'driving', title: 'Driving License', titleNepali: 'सवारी चालक अनुमतिपत्र', description: 'Apply for new license or renewal', icon: 'Car', category: 'Transport', available: true },
  { _id: 'education', title: 'Education Certificates', titleNepali: 'शैक्षिक प्रमाणपत्र', description: 'Equivalency and verification services', icon: 'GraduationCap', category: 'Education', available: true },
  { _id: 'marriage', title: 'Marriage Registration', titleNepali: 'विवाह दर्ता', description: 'Register your marriage officially', icon: 'Heart', category: 'Civil', available: true },
  { _id: 'business', title: 'Business Registration', titleNepali: 'व्यापार दर्ता', description: 'Register your business or company', icon: 'Briefcase', category: 'Business', available: false },
  { _id: 'birth', title: 'Birth Certificate', titleNepali: 'जन्म दर्ता', description: 'Register birth and get certificate', icon: 'Users', category: 'Civil', available: false },
];

const serviceInfos = [
  { serviceId: 'citizenship', longDescription: 'Complete guide to obtaining your Nepali citizenship certificate. Check your eligibility, gather required documents, find your nearest office, and follow our step-by-step procedure.' },
  { serviceId: 'passport', longDescription: 'Get your Nepali ePassport through the online application system. Apply for new passport, renewal, or replacement for lost/damaged passport.' },
  { serviceId: 'driving', longDescription: 'Obtain your smart digital driving license in Nepal. Apply for two-wheeler, light vehicle, or heavy vehicle categories through the online system.' },
  { serviceId: 'land', longDescription: 'Complete guide to land registration, ownership transfer, inheritance, and gift deeds. Learn about the process, fees, and required documents.' },
  { serviceId: 'marriage', longDescription: 'Register your marriage at the local ward office or through court marriage. Get your official marriage certificate for legal recognition.' },
  { serviceId: 'education', longDescription: 'Get equivalency certificates for foreign educational qualifications, verification letters, and transcript requests from Nepali institutions.' },
];

// ============= SERVICE COSTS =============
const serviceCosts = [
  { serviceId: 'citizenship', fee: 'NRs. 10 (Ten Rupees only)', feeNepali: 'रु. १० (दश रुपैया मात्र)', processingTime: '1-7 working days', processingTimeNepali: '१-७ कार्य दिन', notes: ['No additional fees for first-time applicants', 'Urgent processing may be available', 'Processing time may vary during peak seasons'] },
  { serviceId: 'passport', fee: 'Regular: NRs. 5,000 | Fast Track: NRs. 10,000', feeNepali: 'सामान्य: रु. ५,००० | द्रुत सेवा: रु. १०,०००', processingTime: 'Regular: 7 days | Fast Track: 2-3 days', processingTimeNepali: 'सामान्य: ७ दिन | द्रुत सेवा: २-३ दिन', notes: ['10-year validity for adults (18+)', '5-year validity for minors (under 18)', 'Additional pages: NRs. 2,000'] },
  { serviceId: 'driving', fee: 'Category A: NRs. 1,200 | Category B: NRs. 2,000', feeNepali: 'श्रेणी क: रु. १,२०० | श्रेणी ख: रु. २,०००', processingTime: '3-4 weeks (exam + processing)', processingTimeNepali: '३-४ हप्ता (परीक्षा + प्रक्रिया)', notes: ['Written exam fee included', 'Medical certificate: NRs. 300-500 extra', 'License valid for 5 years'] },
  { serviceId: 'land', fee: '4% (Agricultural) - 6% (Residential) of land value', feeNepali: '४% (कृषि) - ६% (आवासीय) जग्गा मूल्यको', processingTime: '1-3 working days', processingTimeNepali: '१-३ कार्य दिन', notes: ['Registration based on government valuation', 'Gift within family: Reduced rates apply'] },
  { serviceId: 'marriage', fee: 'NRs. 100-500 (Ward) | NRs. 1,000-2,000 (Court)', feeNepali: 'रु. १००-५०० (वडा) | रु. १,०००-२,००० (अदालत)', processingTime: 'Same day to 35 days', processingTimeNepali: 'उही दिन देखि ३५ दिनसम्म', notes: ['35-day notice period may be required', 'Court marriage usually faster'] },
  { serviceId: 'education', fee: 'NRs. 2,000-5,000 (varies by level)', feeNepali: 'रु. २,०००-५,००० (तहअनुसार फरक)', processingTime: '7-30 days', processingTimeNepali: '७-३० दिन', notes: ['School level (NEB): NRs. 2,000', 'University level: NRs. 3,000-5,000'] },
];

// ============= ELIGIBILITY QUESTIONS =============
const eligibilityQuestions = [
  // Citizenship
  { serviceId: 'citizenship', questionId: 'type', question: 'What type of citizenship are you applying for?', questionNepali: 'तपाईं कुन प्रकारको नागरिकता लिन चाहनुहुन्छ?', sortOrder: 1, options: [
    { value: 'descent', label: 'By Descent (वंशज)', labelNepali: 'वंशजको आधारमा', nextQuestion: 'parent_citizen' },
    { value: 'birth', label: 'By Birth (जन्मसिद्ध)', labelNepali: 'जन्मसिद्ध', nextQuestion: 'birth_place' },
    { value: 'naturalization', label: 'By Naturalization', labelNepali: 'अंगीकृत', nextQuestion: 'residence_years' },
  ]},
  { serviceId: 'citizenship', questionId: 'parent_citizen', question: 'Is your father or mother a citizen of Nepal?', questionNepali: 'के तपाईंको बाबु वा आमा नेपालको नागरिक हुनुहुन्छ?', sortOrder: 2, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', nextQuestion: 'age_check' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'To obtain citizenship by descent, at least one parent must be a Nepali citizen.' },
  ]},
  { serviceId: 'citizenship', questionId: 'age_check', question: 'Are you 16 years of age or older?', questionNepali: 'के तपाईंको उमेर १६ वर्ष वा माथि छ?', sortOrder: 3, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You appear to be eligible for citizenship. Please proceed with the required documents.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You must be at least 16 years old to apply for citizenship in Nepal.' },
  ]},
  { serviceId: 'citizenship', questionId: 'birth_place', question: 'Were you born in Nepal?', questionNepali: 'के तपाईं नेपालमा जन्मनुभएको हो?', sortOrder: 4, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', nextQuestion: 'age_check' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Birth citizenship requires being born in Nepal.' },
  ]},
  { serviceId: 'citizenship', questionId: 'residence_years', question: 'Have you lived in Nepal for at least 15 years?', questionNepali: 'के तपाईं कम्तीमा १५ वर्ष नेपालमा बसोबास गर्नुभएको छ?', sortOrder: 5, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', nextQuestion: 'age_check' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Naturalized citizenship requires at least 15 years of residence in Nepal.' },
  ]},
  
  // Passport
  { serviceId: 'passport', questionId: 'has_citizenship', question: 'Do you have a valid Nepali citizenship certificate?', questionNepali: 'के तपाईंसँग वैध नेपाली नागरिकता प्रमाणपत्र छ?', sortOrder: 1, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', nextQuestion: 'passport_type' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You need a valid Nepali citizenship certificate to apply for a passport.' },
  ]},
  { serviceId: 'passport', questionId: 'passport_type', question: 'What type of passport application?', questionNepali: 'कुन प्रकारको राहदानी आवेदन?', sortOrder: 2, options: [
    { value: 'new', label: 'New Passport', labelNepali: 'नयाँ राहदानी', nextQuestion: 'passport_age' },
    { value: 'renewal', label: 'Renewal', labelNepali: 'नवीकरण', nextQuestion: 'old_passport' },
    { value: 'lost', label: 'Lost/Damaged', labelNepali: 'हराएको/बिग्रेको', nextQuestion: 'police_report' },
  ]},
  { serviceId: 'passport', questionId: 'passport_age', question: 'Are you 16 years or older?', questionNepali: 'के तपाईं १६ वर्ष वा माथि हुनुहुन्छ?', sortOrder: 3, options: [
    { value: 'yes', label: 'Yes (10-year passport)', labelNepali: 'हो (१० वर्षे राहदानी)', eligible: true, reason: 'You are eligible for a 10-year adult passport.' },
    { value: 'no', label: 'No (5-year passport)', labelNepali: 'होइन (५ वर्षे राहदानी)', eligible: true, reason: 'You are eligible for a 5-year minor passport. A guardian must apply on your behalf.' },
  ]},
  { serviceId: 'passport', questionId: 'old_passport', question: 'Do you have your old passport?', questionNepali: 'के तपाईंसँग पुरानो राहदानी छ?', sortOrder: 4, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can apply for passport renewal. Bring your old passport to the office.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', nextQuestion: 'police_report' },
  ]},
  { serviceId: 'passport', questionId: 'police_report', question: 'Do you have a police report for the lost/damaged passport?', questionNepali: 'के तपाईंसँग हराएको/बिग्रेको राहदानीको प्रहरी प्रतिवेदन छ?', sortOrder: 5, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can apply for a replacement passport with the police report.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You need a police report for lost or damaged passport replacement.' },
  ]},

  // Driving License
  { serviceId: 'driving', questionId: 'license_type', question: 'What type of license do you need?', questionNepali: 'तपाईंलाई कुन प्रकारको लाइसेन्स चाहिन्छ?', sortOrder: 1, options: [
    { value: 'new', label: 'New License', labelNepali: 'नयाँ लाइसेन्स', nextQuestion: 'vehicle_category' },
    { value: 'renewal', label: 'Renewal', labelNepali: 'नवीकरण', nextQuestion: 'has_old_license' },
    { value: 'add_category', label: 'Add Category', labelNepali: 'श्रेणी थप', nextQuestion: 'has_old_license' },
  ]},
  { serviceId: 'driving', questionId: 'vehicle_category', question: 'Which vehicle category?', questionNepali: 'कुन गाडी श्रेणी?', sortOrder: 2, options: [
    { value: 'a', label: 'Category A (Two-wheeler)', labelNepali: 'श्रेणी क (दुई पाङ्ग्रे)', nextQuestion: 'driving_age_a' },
    { value: 'b', label: 'Category B (Light Vehicle)', labelNepali: 'श्रेणी ख (हलुका गाडी)', nextQuestion: 'driving_age_b' },
    { value: 'c', label: 'Category C+ (Heavy Vehicle)', labelNepali: 'श्रेणी ग+ (भारी गाडी)', nextQuestion: 'driving_age_c' },
  ]},
  { serviceId: 'driving', questionId: 'driving_age_a', question: 'Are you at least 16 years old?', questionNepali: 'के तपाईं कम्तीमा १६ वर्षको हुनुहुन्छ?', sortOrder: 3, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You are eligible to apply for a Category A driving license.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You must be at least 16 years old for a two-wheeler license.' },
  ]},
  { serviceId: 'driving', questionId: 'driving_age_b', question: 'Are you at least 18 years old?', questionNepali: 'के तपाईं कम्तीमा १८ वर्षको हुनुहुन्छ?', sortOrder: 4, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You are eligible to apply for a Category B driving license.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You must be at least 18 years old for a light vehicle license.' },
  ]},
  { serviceId: 'driving', questionId: 'driving_age_c', question: 'Are you at least 21 years old?', questionNepali: 'के तपाईं कम्तीमा २१ वर्षको हुनुहुन्छ?', sortOrder: 5, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You are eligible to apply for a Category C+ driving license.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You must be at least 21 years old for a heavy vehicle license.' },
  ]},
  { serviceId: 'driving', questionId: 'has_old_license', question: 'Do you have your current license?', questionNepali: 'के तपाईंसँग हालको लाइसेन्स छ?', sortOrder: 6, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can proceed with your renewal or category addition.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'You need your current license for renewal or adding categories.' },
  ]},

  // Land Registration
  { serviceId: 'land', questionId: 'transaction_type', question: 'What type of land transaction?', questionNepali: 'कुन प्रकारको जग्गा कारोबार?', sortOrder: 1, options: [
    { value: 'sale', label: 'Sale/Purchase', labelNepali: 'किनबेच', nextQuestion: 'land_ownership' },
    { value: 'gift', label: 'Gift Deed', labelNepali: 'दान पत्र', nextQuestion: 'gift_relation' },
    { value: 'inheritance', label: 'Inheritance', labelNepali: 'अंशबण्डा', nextQuestion: 'death_certificate' },
  ]},
  { serviceId: 'land', questionId: 'land_ownership', question: 'Does the seller have clear ownership documents?', questionNepali: 'के बिक्रेतासँग स्पष्ट स्वामित्व कागजात छ?', sortOrder: 2, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can proceed with the sale/purchase registration.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Clear ownership documents are required for land registration.' },
  ]},
  { serviceId: 'land', questionId: 'gift_relation', question: 'Is the gift within immediate family?', questionNepali: 'के दान तत्काल परिवार भित्र हो?', sortOrder: 3, options: [
    { value: 'yes', label: 'Yes (Reduced fees apply)', labelNepali: 'हो (कम शुल्क लाग्छ)', eligible: true, reason: 'You qualify for reduced registration fees for family gift deeds.' },
    { value: 'no', label: 'No (Standard fees)', labelNepali: 'होइन (मानक शुल्क)', eligible: true, reason: 'Standard registration fees will apply.' },
  ]},
  { serviceId: 'land', questionId: 'death_certificate', question: 'Do you have the death certificate of the previous owner?', questionNepali: 'के तपाईंसँग अघिल्लो मालिकको मृत्यु प्रमाणपत्र छ?', sortOrder: 4, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can proceed with inheritance registration.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Death certificate is required for inheritance registration.' },
  ]},

  // Marriage Registration
  { serviceId: 'marriage', questionId: 'marriage_type', question: 'What type of marriage registration?', questionNepali: 'कुन प्रकारको विवाह दर्ता?', sortOrder: 1, options: [
    { value: 'ward', label: 'Ward Office Registration', labelNepali: 'वडा कार्यालय दर्ता', nextQuestion: 'both_consent' },
    { value: 'court', label: 'Court Marriage', labelNepali: 'अदालत विवाह', nextQuestion: 'both_consent' },
  ]},
  { serviceId: 'marriage', questionId: 'both_consent', question: 'Do both parties consent to the marriage?', questionNepali: 'के दुवै पक्षको विवाहमा सहमति छ?', sortOrder: 2, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', nextQuestion: 'marriage_age' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Both parties must consent to marriage registration.' },
  ]},
  { serviceId: 'marriage', questionId: 'marriage_age', question: 'Are both parties at least 20 years old?', questionNepali: 'के दुवै पक्ष कम्तीमा २० वर्षका छन्?', sortOrder: 3, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You are eligible to register your marriage.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Both parties must be at least 20 years old for marriage registration in Nepal.' },
  ]},

  // Education
  { serviceId: 'education', questionId: 'cert_type', question: 'What type of certificate service?', questionNepali: 'कुन प्रकारको प्रमाणपत्र सेवा?', sortOrder: 1, options: [
    { value: 'equivalency', label: 'Equivalency Certificate', labelNepali: 'समकक्षता प्रमाणपत्र', nextQuestion: 'foreign_degree' },
    { value: 'verification', label: 'Verification Letter', labelNepali: 'प्रमाणीकरण पत्र', nextQuestion: 'original_docs' },
    { value: 'transcript', label: 'Transcript Request', labelNepali: 'ट्रान्सक्रिप्ट अनुरोध', nextQuestion: 'original_docs' },
  ]},
  { serviceId: 'education', questionId: 'foreign_degree', question: 'Is your degree from a recognized institution?', questionNepali: 'के तपाईंको डिग्री मान्यता प्राप्त संस्थाबाट हो?', sortOrder: 2, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can apply for an equivalency certificate.' },
    { value: 'no', label: 'No/Unsure', labelNepali: 'होइन/थाहा छैन', eligible: false, reason: 'Equivalency is only available for degrees from recognized institutions.' },
  ]},
  { serviceId: 'education', questionId: 'original_docs', question: 'Do you have original certificates/marksheets?', questionNepali: 'के तपाईंसँग मौलिक प्रमाणपत्र/मार्कशीट छ?', sortOrder: 3, options: [
    { value: 'yes', label: 'Yes', labelNepali: 'हो', eligible: true, reason: 'You can proceed with your request.' },
    { value: 'no', label: 'No', labelNepali: 'होइन', eligible: false, reason: 'Original documents are required for verification and transcript services.' },
  ]},
];

// ============= REQUIRED DOCUMENTS =============
const requiredDocuments = [
  // Citizenship
  { serviceId: 'citizenship', docId: 'birth_cert', name: 'Birth Certificate', nameNepali: 'जन्म दर्ता प्रमाणपत्र', description: 'Original birth registration certificate from local municipality', required: true, forTypes: ['descent', 'birth', 'naturalization'], sortOrder: 1 },
  { serviceId: 'citizenship', docId: 'parent_citizenship', name: "Parent's Citizenship Certificate", nameNepali: 'अभिभावकको नागरिकता', description: "Photocopy of father's or mother's citizenship certificate", required: true, forTypes: ['descent'], sortOrder: 2 },
  { serviceId: 'citizenship', docId: 'photos', name: 'Passport Size Photos', nameNepali: 'पासपोर्ट साइज फोटो', description: '2 recent passport size photographs', required: true, forTypes: ['descent', 'birth', 'naturalization'], sortOrder: 3 },
  { serviceId: 'citizenship', docId: 'recommendation', name: 'Ward Recommendation', nameNepali: 'वडा सिफारिस', description: 'Recommendation letter from your ward office', required: true, forTypes: ['descent', 'birth', 'naturalization'], sortOrder: 4 },
  { serviceId: 'citizenship', docId: 'marriage_cert', name: 'Marriage Certificate', nameNepali: 'विवाह दर्ता प्रमाणपत्र', description: 'For married women applying through spouse', required: false, forTypes: ['descent'], sortOrder: 5 },

  // Passport
  { serviceId: 'passport', docId: 'citizenship', name: 'Citizenship Certificate', nameNepali: 'नागरिकता प्रमाणपत्र', description: 'Original and photocopy of citizenship certificate', required: true, forTypes: ['new', 'renewal', 'lost'], sortOrder: 1 },
  { serviceId: 'passport', docId: 'old_passport', name: 'Old Passport', nameNepali: 'पुरानो राहदानी', description: 'Your previous passport (for renewal)', required: true, forTypes: ['renewal'], sortOrder: 2 },
  { serviceId: 'passport', docId: 'police_report', name: 'Police Report', nameNepali: 'प्रहरी प्रतिवेदन', description: 'FIR for lost or damaged passport', required: true, forTypes: ['lost'], sortOrder: 3 },
  { serviceId: 'passport', docId: 'online_form', name: 'Online Application Form', nameNepali: 'अनलाइन आवेदन फारम', description: 'Printed application from nepalpassport.gov.np', required: true, forTypes: ['new', 'renewal', 'lost'], sortOrder: 4 },
  { serviceId: 'passport', docId: 'payment', name: 'Payment Receipt', nameNepali: 'भुक्तानी रसिद', description: 'Bank deposit voucher for passport fee', required: true, forTypes: ['new', 'renewal', 'lost'], sortOrder: 5 },

  // Driving License
  { serviceId: 'driving', docId: 'citizenship_dl', name: 'Citizenship Certificate', nameNepali: 'नागरिकता प्रमाणपत्र', description: 'Original and 2 photocopies', required: true, forTypes: ['new', 'renewal', 'add_category'], sortOrder: 1 },
  { serviceId: 'driving', docId: 'medical', name: 'Medical Certificate', nameNepali: 'मेडिकल प्रमाणपत्र', description: 'From government hospital or recognized clinic', required: true, forTypes: ['new', 'renewal', 'add_category'], sortOrder: 2 },
  { serviceId: 'driving', docId: 'photos_dl', name: 'Passport Size Photos', nameNepali: 'पासपोर्ट साइज फोटो', description: '4 recent passport size photographs', required: true, forTypes: ['new', 'renewal', 'add_category'], sortOrder: 3 },
  { serviceId: 'driving', docId: 'old_license', name: 'Current License', nameNepali: 'हालको लाइसेन्स', description: 'Your current driving license', required: true, forTypes: ['renewal', 'add_category'], sortOrder: 4 },
  { serviceId: 'driving', docId: 'training_cert', name: 'Training Certificate', nameNepali: 'तालिम प्रमाणपत्र', description: 'From recognized driving training center (for heavy vehicles)', required: false, forTypes: ['new'], sortOrder: 5 },

  // Land Registration
  { serviceId: 'land', docId: 'lalpurja', name: 'Land Ownership Certificate (Lalpurja)', nameNepali: 'जग्गाधनी प्रमाणपत्र (लालपुर्जा)', description: 'Original land ownership certificate', required: true, forTypes: ['sale', 'gift', 'inheritance'], sortOrder: 1 },
  { serviceId: 'land', docId: 'citizenship_land', name: 'Citizenship of Both Parties', nameNepali: 'दुवै पक्षको नागरिकता', description: 'Citizenship certificates of buyer and seller', required: true, forTypes: ['sale', 'gift'], sortOrder: 2 },
  { serviceId: 'land', docId: 'tax_clearance', name: 'Tax Clearance Certificate', nameNepali: 'कर चुक्ता प्रमाणपत्र', description: 'Land tax payment receipts', required: true, forTypes: ['sale', 'gift', 'inheritance'], sortOrder: 3 },
  { serviceId: 'land', docId: 'death_cert', name: 'Death Certificate', nameNepali: 'मृत्यु प्रमाणपत्र', description: 'For inheritance cases', required: true, forTypes: ['inheritance'], sortOrder: 4 },
  { serviceId: 'land', docId: 'relation_proof', name: 'Relationship Proof', nameNepali: 'नाता प्रमाणित', description: 'For family gift deeds or inheritance', required: true, forTypes: ['gift', 'inheritance'], sortOrder: 5 },

  // Marriage
  { serviceId: 'marriage', docId: 'citizenship_both', name: 'Citizenship of Both Parties', nameNepali: 'दुवै पक्षको नागरिकता', description: 'Original citizenship certificates of bride and groom', required: true, forTypes: ['ward', 'court'], sortOrder: 1 },
  { serviceId: 'marriage', docId: 'photos_marriage', name: 'Passport Size Photos', nameNepali: 'पासपोर्ट साइज फोटो', description: '4 passport size photos of each party', required: true, forTypes: ['ward', 'court'], sortOrder: 2 },
  { serviceId: 'marriage', docId: 'witnesses', name: 'Witness Details', nameNepali: 'साक्षी विवरण', description: '2 witnesses with their citizenship photocopies', required: true, forTypes: ['ward', 'court'], sortOrder: 3 },
  { serviceId: 'marriage', docId: 'unmarried_cert', name: 'Unmarried Certificate', nameNepali: 'अविवाहित प्रमाणपत्र', description: 'Certificate stating you are unmarried', required: false, forTypes: ['ward', 'court'], sortOrder: 4 },

  // Education
  { serviceId: 'education', docId: 'original_cert', name: 'Original Certificates', nameNepali: 'मौलिक प्रमाणपत्रहरू', description: 'Original educational certificates and marksheets', required: true, forTypes: ['equivalency', 'verification', 'transcript'], sortOrder: 1 },
  { serviceId: 'education', docId: 'citizenship_edu', name: 'Citizenship Certificate', nameNepali: 'नागरिकता प्रमाणपत्र', description: 'Photocopy of citizenship', required: true, forTypes: ['equivalency', 'verification', 'transcript'], sortOrder: 2 },
  { serviceId: 'education', docId: 'application_form', name: 'Application Form', nameNepali: 'आवेदन फारम', description: 'Filled application form from the respective board', required: true, forTypes: ['equivalency', 'verification', 'transcript'], sortOrder: 3 },
  { serviceId: 'education', docId: 'syllabus', name: 'Course Syllabus', nameNepali: 'पाठ्यक्रम', description: 'Syllabus or course outline (for equivalency)', required: true, forTypes: ['equivalency'], sortOrder: 4 },
];

// ============= PROCEDURE STEPS =============
const procedureSteps = [
  // Citizenship
  { serviceId: 'citizenship', stepId: 'step1', title: 'Gather Required Documents', titleNepali: 'आवश्यक कागजातहरू जम्मा गर्नुहोस्', description: 'Collect all required documents including birth certificate, parent citizenship, photos, and ward recommendation.', isOnline: false, tips: ['Make photocopies of all original documents', 'Get documents attested if required'], sortOrder: 1 },
  { serviceId: 'citizenship', stepId: 'step2', title: 'Get Ward Recommendation', titleNepali: 'वडा सिफारिस लिनुहोस्', description: 'Visit your ward office to get the recommendation letter for citizenship application.', isOnline: false, tips: ['Bring proof of residence', 'Ward chairperson signature required'], sortOrder: 2 },
  { serviceId: 'citizenship', stepId: 'step3', title: 'Visit District Administration Office', titleNepali: 'जिल्ला प्रशासन कार्यालय जानुहोस्', description: 'Submit your application at the District Administration Office (DAO) with all documents.', isOnline: false, tips: ['Arrive early to avoid queues', 'Office hours: 10 AM - 5 PM'], sortOrder: 3 },
  { serviceId: 'citizenship', stepId: 'step4', title: 'Biometric Registration', titleNepali: 'बायोमेट्रिक दर्ता', description: 'Complete fingerprint and photo capture for the smart citizenship card.', isOnline: false, tips: ['Keep fingers clean for biometric capture'], sortOrder: 4 },
  { serviceId: 'citizenship', stepId: 'step5', title: 'Collect Citizenship Certificate', titleNepali: 'नागरिकता प्रमाणपत्र लिनुहोस्', description: 'Collect your citizenship certificate on the scheduled date with your receipt.', isOnline: false, tips: ['Bring original receipt', 'Processing takes 1-7 days'], sortOrder: 5 },

  // Passport
  { serviceId: 'passport', stepId: 'step1', title: 'Online Application', titleNepali: 'अनलाइन आवेदन', description: 'Fill out the passport application form online at nepalpassport.gov.np', isOnline: true, link: 'https://nepalpassport.gov.np', tips: ['Use recent passport-size photo', 'Keep citizenship number ready'], sortOrder: 1 },
  { serviceId: 'passport', stepId: 'step2', title: 'Pay Fees at Bank', titleNepali: 'बैंकमा शुल्क तिर्नुहोस्', description: 'Deposit the passport fee at designated banks using the generated payment slip.', isOnline: false, tips: ['Keep multiple copies of bank voucher', 'Regular: NRs. 5,000, Fast track: NRs. 10,000'], sortOrder: 2 },
  { serviceId: 'passport', stepId: 'step3', title: 'Book Appointment', titleNepali: 'अपोइन्टमेन्ट बुक गर्नुहोस्', description: 'Schedule your appointment date and time through the online system.', isOnline: true, link: 'https://nepalpassport.gov.np', tips: ['Book early morning slots', 'Print appointment slip'], sortOrder: 3 },
  { serviceId: 'passport', stepId: 'step4', title: 'Visit Passport Office', titleNepali: 'राहदानी कार्यालय जानुहोस्', description: 'Visit the passport office on your appointment date with all documents.', isOnline: false, tips: ['Arrive 30 minutes early', 'Bring all original documents'], sortOrder: 4 },
  { serviceId: 'passport', stepId: 'step5', title: 'Biometric Enrollment', titleNepali: 'बायोमेट्रिक नामांकन', description: 'Complete fingerprint scanning and photo capture at the office.', isOnline: false, tips: ['Remove glasses for photo', 'Keep fingers clean'], sortOrder: 5 },
  { serviceId: 'passport', stepId: 'step6', title: 'Collect Passport', titleNepali: 'राहदानी संकलन', description: 'Collect your passport on the scheduled date or track status online.', isOnline: false, tips: ['Bring receipt and citizenship copy', 'Can be collected by authorized person'], sortOrder: 6 },

  // Driving License
  { serviceId: 'driving', stepId: 'step1', title: 'Online Form Submission', titleNepali: 'अनलाइन फारम पेश', description: 'Fill out the license application form at dotm.gov.np', isOnline: true, link: 'https://dotm.gov.np', tips: ['Keep citizenship number ready', 'Choose nearest office'], sortOrder: 1 },
  { serviceId: 'driving', stepId: 'step2', title: 'Get Medical Certificate', titleNepali: 'मेडिकल प्रमाणपत्र लिनुहोस्', description: 'Get a medical fitness certificate from a government hospital or approved clinic.', isOnline: false, tips: ['Eye test required', 'Blood group confirmation'], sortOrder: 2 },
  { serviceId: 'driving', stepId: 'step3', title: 'Pay Fees', titleNepali: 'शुल्क तिर्नुहोस्', description: 'Pay the required fees at the Transport Office or through bank deposit.', isOnline: false, tips: ['Category A: NRs. 1,200', 'Category B: NRs. 2,000'], sortOrder: 3 },
  { serviceId: 'driving', stepId: 'step4', title: 'Written Examination', titleNepali: 'लिखित परीक्षा', description: 'Take the computer-based written test on traffic rules and regulations.', isOnline: false, tips: ['Study traffic rules booklet', 'Need 60% to pass'], sortOrder: 4 },
  { serviceId: 'driving', stepId: 'step5', title: 'Trial (Practical) Examination', titleNepali: 'प्रयोगात्मक परीक्षा', description: 'Complete the practical driving test at the trial ground.', isOnline: false, tips: ['Practice at trial ground beforehand', 'Different tests for different categories'], sortOrder: 5 },
  { serviceId: 'driving', stepId: 'step6', title: 'Collect Smart License', titleNepali: 'स्मार्ट लाइसेन्स संकलन', description: 'Collect your smart driving license card after passing all tests.', isOnline: false, tips: ['Usually ready in 2-3 weeks', 'Bring receipt and ID'], sortOrder: 6 },

  // Land Registration
  { serviceId: 'land', stepId: 'step1', title: 'Agreement Between Parties', titleNepali: 'पक्षहरू बीच सम्झौता', description: 'Buyer and seller agree on terms, price, and conditions of the land transfer.', isOnline: false, tips: ['Get lawyer assistance if needed', 'Verify land ownership first'], sortOrder: 1 },
  { serviceId: 'land', stepId: 'step2', title: 'Land Valuation', titleNepali: 'जग्गा मूल्यांकन', description: 'Get the land valued according to government rates from the Land Revenue Office.', isOnline: false, tips: ['Government rate may differ from market rate', 'Required for fee calculation'], sortOrder: 2 },
  { serviceId: 'land', stepId: 'step3', title: 'Pay Registration Fee', titleNepali: 'दर्ता शुल्क तिर्नुहोस्', description: 'Pay the registration fee and capital gains tax at the designated bank.', isOnline: false, tips: ['4-6% of land value', 'Keep all receipts'], sortOrder: 3 },
  { serviceId: 'land', stepId: 'step4', title: 'Submit Documents at Land Revenue Office', titleNepali: 'मालपोत कार्यालयमा कागजात पेश गर्नुहोस्', description: 'Submit all documents including Lalpurja, citizenship, and payment receipts.', isOnline: false, tips: ['Both parties must be present', 'Witnesses required'], sortOrder: 4 },
  { serviceId: 'land', stepId: 'step5', title: 'Verification and Registration', titleNepali: 'प्रमाणीकरण र दर्ता', description: 'Officials verify documents and complete the registration process.', isOnline: false, tips: ['May take 1-3 days', 'Get registered deed copy'], sortOrder: 5 },

  // Marriage Registration
  { serviceId: 'marriage', stepId: 'step1', title: 'Notice of Intended Marriage', titleNepali: 'विवाह गर्ने सूचना', description: 'Submit notice of intended marriage at the ward office (35 days before for ward registration).', isOnline: false, tips: ['May be waived in some cases', 'Court marriage is faster'], sortOrder: 1 },
  { serviceId: 'marriage', stepId: 'step2', title: 'Gather Documents', titleNepali: 'कागजातहरू जम्मा गर्नुहोस्', description: 'Collect citizenship certificates, photos, and witness details.', isOnline: false, tips: ['Need 2 witnesses', 'Get unmarried certificates if required'], sortOrder: 2 },
  { serviceId: 'marriage', stepId: 'step3', title: 'Submit Application', titleNepali: 'आवेदन पेश गर्नुहोस्', description: 'Submit the marriage registration application with all documents.', isOnline: false, tips: ['Both parties must be present', 'Pay registration fee'], sortOrder: 3 },
  { serviceId: 'marriage', stepId: 'step4', title: 'Registration Ceremony', titleNepali: 'दर्ता समारोह', description: 'Both parties and witnesses sign the marriage register.', isOnline: false, tips: ['Bring original citizenship', 'Witnesses sign as well'], sortOrder: 4 },
  { serviceId: 'marriage', stepId: 'step5', title: 'Collect Marriage Certificate', titleNepali: 'विवाह प्रमाणपत्र लिनुहोस्', description: 'Collect the official marriage certificate.', isOnline: false, tips: ['Usually same day', 'Get multiple copies'], sortOrder: 5 },

  // Education
  { serviceId: 'education', stepId: 'step1', title: 'Identify Correct Authority', titleNepali: 'सही निकाय पहिचान गर्नुहोस्', description: 'Determine which board or university handles your certificate (NEB, TU, KU, etc.).', isOnline: false, tips: ['School level: NEB', 'University level: Respective university'], sortOrder: 1 },
  { serviceId: 'education', stepId: 'step2', title: 'Get Application Form', titleNepali: 'आवेदन फारम लिनुहोस्', description: 'Obtain the application form from the respective board or download online.', isOnline: true, tips: ['Some forms available online', 'Fill completely'], sortOrder: 2 },
  { serviceId: 'education', stepId: 'step3', title: 'Pay Required Fees', titleNepali: 'आवश्यक शुल्क तिर्नुहोस्', description: 'Pay the processing fee at designated banks.', isOnline: false, tips: ['Fees vary by service type', 'Keep bank voucher'], sortOrder: 3 },
  { serviceId: 'education', stepId: 'step4', title: 'Submit Documents', titleNepali: 'कागजात पेश गर्नुहोस्', description: 'Submit application with original certificates, marksheets, and photocopies.', isOnline: false, tips: ['Bring originals for verification', 'Attested copies may be required'], sortOrder: 4 },
  { serviceId: 'education', stepId: 'step5', title: 'Collect Certificate/Letter', titleNepali: 'प्रमाणपत्र/पत्र संकलन', description: 'Collect your equivalency certificate, verification letter, or transcript.', isOnline: false, tips: ['Processing: 7-30 days', 'Check status online if available'], sortOrder: 5 },
];

// ============= DOWNLOADABLE FORMS =============
const downloadableForms = [
  // Citizenship
  { serviceId: 'citizenship', formId: 'cit_form', name: 'Citizenship Application Form', nameNepali: 'नागरिकता आवेदन फारम', description: 'Main application form for citizenship', url: 'https://daobhaktapur.moha.gov.np/post/citizenship-record-extraction-form', fileType: 'pdf', isExternal: true, sortOrder: 1 },
  { serviceId: 'citizenship', formId: 'cit_ward', name: 'Ward Recommendation Request', nameNepali: 'वडा सिफारिस अनुरोध', description: 'Form to request ward recommendation', url: 'https://daobhaktapur.moha.gov.np/en/page/forms-8', fileType: 'pdf', isExternal: true, sortOrder: 2 },

  // Passport
  { serviceId: 'passport', formId: 'pp_online', name: 'Online Application Portal', nameNepali: 'अनलाइन आवेदन पोर्टल', description: 'Official passport application portal', url: 'https://verification1.nepalpassport.gov.np/uploads/g_Q6z_W_Hj_Ic_DQM_Oqn_Guq_G_Tz_Npa_ZXJYNC_meta_Zm9yb_T_It_NG_12_Mi0x_Ln_Bk_Zg_0cffb4c683.pdf', fileType: 'online', isExternal: true, sortOrder: 1 },
  { serviceId: 'passport', formId: 'pp_minor', name: 'Minor Passport Consent Form', nameNepali: 'नाबालक राहदानी सहमति फारम', description: 'Parental consent for minor passport', url: 'https://nepalpassport.gov.np/forms/minor', fileType: 'pdf', isExternal: true, sortOrder: 2 },

  // Driving License
  { serviceId: 'driving', formId: 'dl_online', name: 'Online Application Portal', nameNepali: 'अनलाइन आवेदन पोर्टल', description: 'Department of Transport Management portal', url: 'https://onlineedlreg.dotm.gov.np/Nepal_DLReg/homepage_', fileType: 'online', isExternal: true, sortOrder: 1 },
  { serviceId: 'driving', formId: 'dl_medical', name: 'Medical Form Template', nameNepali: 'मेडिकल फारम ढाँचा', description: 'Medical certificate format for driving license', url: 'https://dotm.gov.np/forms/medical', fileType: 'pdf', isExternal: true, sortOrder: 2 },

  // Land
  { serviceId: 'land', formId: 'land_transfer', name: 'Land Transfer Deed Form', nameNepali: 'जग्गा हस्तान्तरण लिखत फारम', description: 'Form for registering land transfer', url: 'https://dolma.gov.np/forms/transfer', fileType: 'pdf', isExternal: true, sortOrder: 1 },
  { serviceId: 'land', formId: 'land_gift', name: 'Gift Deed Form', nameNepali: 'दान पत्र फारम', description: 'Form for gift deed registration', url: 'https://dolma.gov.np/forms/gift', fileType: 'pdf', isExternal: true, sortOrder: 2 },

  // Marriage
  { serviceId: 'marriage', formId: 'mar_app', name: 'Marriage Registration Form', nameNepali: 'विवाह दर्ता फारम', description: 'Application form for marriage registration', url: 'https://moha.gov.np/forms/marriage', fileType: 'pdf', isExternal: true, sortOrder: 1 },
  { serviceId: 'marriage', formId: 'mar_notice', name: 'Notice of Marriage Form', nameNepali: 'विवाह सूचना फारम', description: '35-day notice form', url: 'https://moha.gov.np/forms/marriage-notice', fileType: 'pdf', isExternal: true, sortOrder: 2 },

  // Education
  { serviceId: 'education', formId: 'edu_equiv', name: 'Equivalency Application', nameNepali: 'समकक्षता आवेदन', description: 'Form for foreign degree equivalency', url: 'https://neb.gov.np/forms/equivalency', fileType: 'pdf', isExternal: true, sortOrder: 1 },
  { serviceId: 'education', formId: 'edu_verify', name: 'Verification Request Form', nameNepali: 'प्रमाणीकरण अनुरोध फारम', description: 'Form for certificate verification', url: 'https://neb.gov.np/forms/verification', fileType: 'pdf', isExternal: true, sortOrder: 2 },
];

// ============= DISTRICTS =============
const districts = [
  { _id: 'kathmandu', name: 'Kathmandu', nameNepali: 'काठमाडौं', province: 3 },
  { _id: 'lalitpur', name: 'Lalitpur', nameNepali: 'ललितपुर', province: 3 },
  { _id: 'bhaktapur', name: 'Bhaktapur', nameNepali: 'भक्तपुर', province: 3 },
  { _id: 'pokhara', name: 'Kaski', nameNepali: 'कास्की', province: 4 },
  { _id: 'chitwan', name: 'Chitwan', nameNepali: 'चितवन', province: 3 },
];

// ============= MUNICIPALITIES =============
const municipalities = [
  { _id: 'kmc', districtId: 'kathmandu', name: 'Kathmandu Metropolitan City', nameNepali: 'काठमाडौं महानगरपालिका', type: 'metropolitan' },
  { _id: 'budhanilkantha', districtId: 'kathmandu', name: 'Budhanilkantha Municipality', nameNepali: 'बूढानिलकण्ठ नगरपालिका', type: 'municipality' },
  { _id: 'tokha', districtId: 'kathmandu', name: 'Tokha Municipality', nameNepali: 'टोखा नगरपालिका', type: 'municipality' },
  { _id: 'lmc', districtId: 'lalitpur', name: 'Lalitpur Metropolitan City', nameNepali: 'ललितपुर महानगरपालिका', type: 'metropolitan' },
  { _id: 'godawari', districtId: 'lalitpur', name: 'Godawari Municipality', nameNepali: 'गोदावरी नगरपालिका', type: 'municipality' },
  { _id: 'bmc', districtId: 'bhaktapur', name: 'Bhaktapur Municipality', nameNepali: 'भक्तपुर नगरपालिका', type: 'municipality' },
  { _id: 'madhyapur', districtId: 'bhaktapur', name: 'Madhyapur Thimi Municipality', nameNepali: 'मध्यपुर थिमी नगरपालिका', type: 'municipality' },
  { _id: 'pmc', districtId: 'pokhara', name: 'Pokhara Metropolitan City', nameNepali: 'पोखरा महानगरपालिका', type: 'metropolitan' },
  { _id: 'bharatpur', districtId: 'chitwan', name: 'Bharatpur Metropolitan City', nameNepali: 'भरतपुर महानगरपालिका', type: 'metropolitan' },
  { _id: 'ratnanagar', districtId: 'chitwan', name: 'Ratnanagar Municipality', nameNepali: 'रत्ननगर नगरपालिका', type: 'municipality' },
];

// ============= OFFICES =============
const offices = [
  { _id: 'dao-kathmandu', name: 'District Administration Office, Kathmandu', nameNepali: 'जिल्ला प्रशासन कार्यालय, काठमाडौं', districtId: 'kathmandu', address: 'Hanumandhoka, Kathmandu', phone: '01-4211470', email: 'dao.kathmandu@moha.gov.np', hours: '10:00 AM - 5:00 PM (Sun-Fri)', services: ['citizenship', 'passport'] },
  { _id: 'dotm-kathmandu', name: 'Transport Management Office, Ekantakuna', nameNepali: 'यातायात व्यवस्था कार्यालय, एकान्तकुना', districtId: 'kathmandu', address: 'Ekantakuna, Lalitpur', phone: '01-5529169', email: 'dotm@dotm.gov.np', hours: '10:00 AM - 5:00 PM (Sun-Fri)', services: ['driving'] },
  { _id: 'lro-kathmandu', name: 'Land Revenue Office, Kathmandu', nameNepali: 'मालपोत कार्यालय, काठमाडौं', districtId: 'kathmandu', address: 'Babarmahal, Kathmandu', phone: '01-4227401', email: 'lro.kathmandu@dolma.gov.np', hours: '10:00 AM - 4:00 PM (Sun-Fri)', services: ['land'] },
  { _id: 'dao-lalitpur', name: 'District Administration Office, Lalitpur', nameNepali: 'जिल्ला प्रशासन कार्यालय, ललितपुर', districtId: 'lalitpur', address: 'Pulchowk, Lalitpur', phone: '01-5521654', email: 'dao.lalitpur@moha.gov.np', hours: '10:00 AM - 5:00 PM (Sun-Fri)', services: ['citizenship', 'passport', 'marriage'] },
  { _id: 'dao-bhaktapur', name: 'District Administration Office, Bhaktapur', nameNepali: 'जिल्ला प्रशासन कार्यालय, भक्तपुर', districtId: 'bhaktapur', address: 'Dudhpati, Bhaktapur', phone: '01-6610175', email: 'dao.bhaktapur@moha.gov.np', hours: '10:00 AM - 5:00 PM (Sun-Fri)', services: ['citizenship', 'passport', 'marriage'] },
  { _id: 'dao-kaski', name: 'District Administration Office, Kaski', nameNepali: 'जिल्ला प्रशासन कार्यालय, कास्की', districtId: 'pokhara', address: 'Bagar, Pokhara', phone: '061-520126', email: 'dao.kaski@moha.gov.np', hours: '10:00 AM - 5:00 PM (Sun-Fri)', services: ['citizenship', 'passport', 'marriage'] },
  { _id: 'dao-chitwan', name: 'District Administration Office, Chitwan', nameNepali: 'जिल्ला प्रशासन कार्यालय, चितवन', districtId: 'chitwan', address: 'Bharatpur, Chitwan', phone: '056-520127', email: 'dao.chitwan@moha.gov.np', hours: '10:00 AM - 5:00 PM (Sun-Fri)', services: ['citizenship', 'passport', 'marriage'] },
];

// ============= SEED FUNCTION =============
async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nagarik_sewa');
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Service.deleteMany({}),
      ServiceInfo.deleteMany({}),
      EligibilityQuestion.deleteMany({}),
      RequiredDocument.deleteMany({}),
      ProcedureStep.deleteMany({}),
      ServiceCost.deleteMany({}),
      DownloadableForm.deleteMany({}),
      District.deleteMany({}),
      Municipality.deleteMany({}),
      Office.deleteMany({}),
    ]);

    // Insert data
    console.log('📝 Seeding data...');
    
    await Service.insertMany(services);
    console.log('  ✓ Services');
    
    await ServiceInfo.insertMany(serviceInfos);
    console.log('  ✓ Service Info');
    
    await ServiceCost.insertMany(serviceCosts);
    console.log('  ✓ Service Costs');
    
    await EligibilityQuestion.insertMany(eligibilityQuestions);
    console.log('  ✓ Eligibility Questions');
    
    await RequiredDocument.insertMany(requiredDocuments);
    console.log('  ✓ Required Documents');
    
    await ProcedureStep.insertMany(procedureSteps);
    console.log('  ✓ Procedure Steps');
    
    await DownloadableForm.insertMany(downloadableForms);
    console.log('  ✓ Downloadable Forms');
    
    await District.insertMany(districts);
    console.log('  ✓ Districts');
    
    await Municipality.insertMany(municipalities);
    console.log('  ✓ Municipalities');
    
    await Office.insertMany(offices);
    console.log('  ✓ Offices');

    console.log('\n🎉 Database seeded successfully!');
    console.log('\nData summary:');
    console.log(`  - ${services.length} services`);
    console.log(`  - ${eligibilityQuestions.length} eligibility questions`);
    console.log(`  - ${requiredDocuments.length} required documents`);
    console.log(`  - ${procedureSteps.length} procedure steps`);
    console.log(`  - ${downloadableForms.length} downloadable forms`);
    console.log(`  - ${districts.length} districts`);
    console.log(`  - ${municipalities.length} municipalities`);
    console.log(`  - ${offices.length} offices`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seed();
