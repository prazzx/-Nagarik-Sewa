import { FileText, MapPin, Home, Car, GraduationCap, Heart, Briefcase, Users } from "lucide-react";

export interface Service {
  id: string;
  title: string;
  titleNepali: string;
  description: string;
  icon: typeof FileText;
  category: string;
  available: boolean;
}

export const services: Service[] = [
  {
    id: "citizenship",
    title: "Citizenship Certificate",
    titleNepali: "नागरिकता प्रमाणपत्र",
    description: "Apply for citizenship by descent, birth, or naturalization",
    icon: FileText,
    category: "Identity",
    available: true,
  },
  {
    id: "passport",
    title: "Passport",
    titleNepali: "राहदानी",
    description: "Apply for new passport or renewal",
    icon: MapPin,
    category: "Identity",
    available: true,
  },
  {
    id: "land",
    title: "Land Registration",
    titleNepali: "जग्गा दर्ता",
    description: "Register land ownership and transfers",
    icon: Home,
    category: "Property",
    available: true,
  },
  {
    id: "driving",
    title: "Driving License",
    titleNepali: "सवारी चालक अनुमतिपत्र",
    description: "Apply for new license or renewal",
    icon: Car,
    category: "Transport",
    available: true,
  },
  {
    id: "education",
    title: "Education Certificates",
    titleNepali: "शैक्षिक प्रमाणपत्र",
    description: "Equivalency and verification services",
    icon: GraduationCap,
    category: "Education",
    available: true,
  },
  {
    id: "marriage",
    title: "Marriage Registration",
    titleNepali: "विवाह दर्ता",
    description: "Register your marriage officially",
    icon: Heart,
    category: "Civil",
    available: true,
  },
  {
    id: "business",
    title: "Business Registration",
    titleNepali: "व्यापार दर्ता",
    description: "Register your business or company",
    icon: Briefcase,
    category: "Business",
    available: false,
  },
  {
    id: "birth",
    title: "Birth Certificate",
    titleNepali: "जन्म दर्ता",
    description: "Register birth and get certificate",
    icon: Users,
    category: "Civil",
    available: false,
  },
];

export interface EligibilityQuestion {
  id: string;
  question: string;
  questionNepali: string;
  options: {
    value: string;
    label: string;
    labelNepali: string;
    nextQuestion?: string;
    eligible?: boolean;
    reason?: string;
  }[];
}

// ===== CITIZENSHIP =====
export const citizenshipEligibility: EligibilityQuestion[] = [
  {
    id: "type",
    question: "What type of citizenship are you applying for?",
    questionNepali: "तपाईं कुन प्रकारको नागरिकता लिन चाहनुहुन्छ?",
    options: [
      { value: "descent", label: "By Descent (वंशज)", labelNepali: "वंशजको आधारमा", nextQuestion: "parent_citizen" },
      { value: "birth", label: "By Birth (जन्मसिद्ध)", labelNepali: "जन्मसिद्ध", nextQuestion: "birth_place" },
      { value: "naturalization", label: "By Naturalization", labelNepali: "अंगीकृत", nextQuestion: "residence_years" },
    ],
  },
  {
    id: "parent_citizen",
    question: "Is your father or mother a citizen of Nepal?",
    questionNepali: "के तपाईंको बाबु वा आमा नेपालको नागरिक हुनुहुन्छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "age_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "To obtain citizenship by descent, at least one parent must be a Nepali citizen." },
    ],
  },
  {
    id: "birth_place",
    question: "Were you born in Nepal?",
    questionNepali: "के तपाईं नेपालमा जन्मनुभएको हो?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "parent_identity" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Birth citizenship requires being born within Nepal's territory." },
    ],
  },
  {
    id: "parent_identity",
    question: "Is the identity of both your parents known?",
    questionNepali: "के तपाईंको दुवै अभिभावकको पहिचान थाहा छ?",
    options: [
      { value: "yes", label: "Yes, both known", labelNepali: "हो, दुवैको थाहा छ", nextQuestion: "age_check" },
      { value: "no", label: "No, identity unknown", labelNepali: "होइन, पहिचान अज्ञात", nextQuestion: "age_check" },
    ],
  },
  {
    id: "residence_years",
    question: "Have you resided in Nepal for at least 15 years?",
    questionNepali: "के तपाईं कम्तिमा १५ वर्ष नेपालमा बस्नुभएको छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "age_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Naturalized citizenship requires minimum 15 years of continuous residence in Nepal." },
    ],
  },
  {
    id: "age_check",
    question: "Are you 16 years of age or older?",
    questionNepali: "के तपाईंको उमेर १६ वर्ष वा माथि छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", eligible: true, reason: "You appear to be eligible for citizenship. Please proceed with the required documents." },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "You must be at least 16 years old to apply for citizenship in Nepal." },
    ],
  },
];

// ===== PASSPORT =====
export const passportEligibility: EligibilityQuestion[] = [
  {
    id: "type",
    question: "What type of passport application is this?",
    questionNepali: "यो कुन प्रकारको राहदानी आवेदन हो?",
    options: [
      { value: "new", label: "New Passport", labelNepali: "नयाँ राहदानी", nextQuestion: "citizenship_status" },
      { value: "renewal", label: "Renewal", labelNepali: "नवीकरण", nextQuestion: "old_passport" },
      { value: "lost", label: "Lost/Damaged Replacement", labelNepali: "हराएको/बिग्रेको प्रतिस्थापन", nextQuestion: "police_report" },
    ],
  },
  {
    id: "citizenship_status",
    question: "Do you have a valid Nepali citizenship certificate?",
    questionNepali: "के तपाईंसँग नेपाली नागरिकता प्रमाणपत्र छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "minor_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "You must have a valid Nepali citizenship certificate to apply for a passport. Please obtain citizenship first." },
    ],
  },
  {
    id: "old_passport",
    question: "Do you have your old passport?",
    questionNepali: "के तपाईंसँग पुरानो राहदानी छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "minor_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "For renewal, you need to submit your old passport. If lost, please apply for replacement instead." },
    ],
  },
  {
    id: "police_report",
    question: "Have you filed a police report for the lost passport?",
    questionNepali: "के तपाईंले हराएको राहदानीको लागि प्रहरी रिपोर्ट दर्ता गर्नुभएको छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "minor_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "You must file a police report before applying for a replacement passport." },
    ],
  },
  {
    id: "minor_check",
    question: "Is the applicant under 16 years of age?",
    questionNepali: "के आवेदक १६ वर्षभन्दा कम उमेरको छ?",
    options: [
      { value: "yes", label: "Yes (Minor)", labelNepali: "हो (नाबालक)", eligible: true, reason: "You are eligible for a minor passport (5-year validity). Both parents' consent is required." },
      { value: "no", label: "No (Adult)", labelNepali: "होइन (बालिग)", eligible: true, reason: "You are eligible for an adult passport (10-year validity). Please proceed with document collection." },
    ],
  },
];

// ===== DRIVING LICENSE =====
export const drivingEligibility: EligibilityQuestion[] = [
  {
    id: "type",
    question: "What type of license application is this?",
    questionNepali: "यो कुन प्रकारको लाइसेन्स आवेदन हो?",
    options: [
      { value: "new", label: "New License", labelNepali: "नयाँ लाइसेन्स", nextQuestion: "age_check" },
      { value: "renewal", label: "Renewal", labelNepali: "नवीकरण", nextQuestion: "old_license" },
      { value: "category_add", label: "Add Category", labelNepali: "श्रेणी थप", nextQuestion: "existing_license" },
    ],
  },
  {
    id: "age_check",
    question: "What is your age?",
    questionNepali: "तपाईंको उमेर कति हो?",
    options: [
      { value: "below_16", label: "Below 16 years", labelNepali: "१६ वर्षभन्दा कम", eligible: false, reason: "You must be at least 16 years old for a scooter/motorcycle license and 18 years for other vehicles." },
      { value: "16_18", label: "16-18 years", labelNepali: "१६-१८ वर्ष", nextQuestion: "vehicle_type_minor" },
      { value: "18_plus", label: "18 years or above", labelNepali: "१८ वर्ष वा माथि", nextQuestion: "vehicle_type" },
    ],
  },
  {
    id: "vehicle_type_minor",
    question: "What category of license do you want?",
    questionNepali: "तपाईंलाई कुन श्रेणीको लाइसेन्स चाहिन्छ?",
    options: [
      { value: "scooter", label: "Scooter (A)", labelNepali: "स्कुटर (क)", nextQuestion: "citizenship_check" },
      { value: "motorcycle", label: "Motorcycle (A)", labelNepali: "मोटरसाइकल (क)", nextQuestion: "citizenship_check" },
      { value: "other", label: "Car/Jeep/Other", labelNepali: "कार/जीप/अन्य", eligible: false, reason: "You must be 18 years or older to apply for a car, jeep, or heavy vehicle license." },
    ],
  },
  {
    id: "vehicle_type",
    question: "What category of license do you want?",
    questionNepali: "तपाईंलाई कुन श्रेणीको लाइसेन्स चाहिन्छ?",
    options: [
      { value: "a", label: "Category A (Two-wheeler)", labelNepali: "श्रेणी क (दुईपाङ्ग्रे)", nextQuestion: "citizenship_check" },
      { value: "b", label: "Category B (Light Vehicle)", labelNepali: "श्रेणी ख (हल्का सवारी)", nextQuestion: "citizenship_check" },
      { value: "c", label: "Category C/D/E (Heavy)", labelNepali: "श्रेणी ग/घ/ङ (भारी)", nextQuestion: "age_21_check" },
    ],
  },
  {
    id: "age_21_check",
    question: "Are you 21 years or older?",
    questionNepali: "के तपाईं २१ वर्ष वा माथि हुनुहुन्छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "citizenship_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "You must be at least 21 years old to apply for heavy vehicle license (Category C, D, or E)." },
    ],
  },
  {
    id: "old_license",
    question: "Do you have your old/expired license?",
    questionNepali: "के तपाईंसँग पुरानो/म्याद सकिएको लाइसेन्स छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "citizenship_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "You need your old license for renewal. If lost, you must first apply for a duplicate." },
    ],
  },
  {
    id: "existing_license",
    question: "Do you have a valid existing license?",
    questionNepali: "के तपाईंसँग अहिलेको लाइसेन्स छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "citizenship_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "You need a valid existing license to add a new category." },
    ],
  },
  {
    id: "citizenship_check",
    question: "Do you have a valid Nepali citizenship?",
    questionNepali: "के तपाईंसँग नेपाली नागरिकता छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", eligible: true, reason: "You are eligible to apply for a driving license. Please proceed with document collection and online registration." },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Valid Nepali citizenship is required to obtain a driving license in Nepal." },
    ],
  },
];

// ===== LAND REGISTRATION =====
export const landEligibility: EligibilityQuestion[] = [
  {
    id: "type",
    question: "What type of land transaction is this?",
    questionNepali: "यो कुन प्रकारको जग्गा कारोबार हो?",
    options: [
      { value: "purchase", label: "Purchase/Sale (रजिष्ट्रेशन)", labelNepali: "खरीद/बिक्री", nextQuestion: "citizen_check" },
      { value: "inheritance", label: "Inheritance (अंशबण्डा)", labelNepali: "अंशबण्डा", nextQuestion: "legal_heir" },
      { value: "gift", label: "Gift (दान)", labelNepali: "दान/उपहार", nextQuestion: "relationship" },
    ],
  },
  {
    id: "citizen_check",
    question: "Are both buyer and seller Nepali citizens?",
    questionNepali: "के किन्ने र बेच्ने दुवै नेपाली नागरिक हुनुहुन्छ?",
    options: [
      { value: "yes", label: "Yes, both are citizens", labelNepali: "हो, दुवै नागरिक हुन्", nextQuestion: "lalpurja_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Land transactions in Nepal require both parties to be Nepali citizens. Foreigners cannot own land in Nepal." },
    ],
  },
  {
    id: "lalpurja_check",
    question: "Does the seller have valid land ownership certificate (लालपुर्जा)?",
    questionNepali: "के बेच्नेसँग मान्य लालपुर्जा छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "encumbrance" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Valid land ownership certificate (Lalpurja) is required for any land transaction." },
    ],
  },
  {
    id: "encumbrance",
    question: "Is the land free from any legal disputes or bank liens?",
    questionNepali: "के जग्गा कुनै कानूनी विवाद वा बैंक दाबीबाट मुक्त छ?",
    options: [
      { value: "yes", label: "Yes, it's clear", labelNepali: "हो, स्वच्छ छ", eligible: true, reason: "You can proceed with the land registration. Please gather all required documents and visit the Land Revenue Office." },
      { value: "no", label: "No, there are issues", labelNepali: "होइन, समस्या छ", eligible: false, reason: "Clear any legal disputes or bank liens before proceeding with the land transaction." },
    ],
  },
  {
    id: "legal_heir",
    question: "Are you a legal heir of the deceased property owner?",
    questionNepali: "के तपाईं मृत सम्पत्ति मालिकको कानूनी हकदार हुनुहुन्छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", eligible: true, reason: "You are eligible to inherit the property. You'll need death certificate and family relation documents." },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Only legal heirs can inherit property through Anshbanda (inheritance partition)." },
    ],
  },
  {
    id: "relationship",
    question: "What is your relationship with the donor?",
    questionNepali: "दाताससँग तपाईंको सम्बन्ध के हो?",
    options: [
      { value: "immediate_family", label: "Immediate Family", labelNepali: "नजिकको परिवार", eligible: true, reason: "Gift deeds within immediate family have reduced registration fees. Proceed with required documents." },
      { value: "other", label: "Other Relative/Friend", labelNepali: "अन्य नातेदार/साथी", eligible: true, reason: "You can proceed with the gift deed registration. Standard registration fees apply." },
    ],
  },
];

// ===== MARRIAGE REGISTRATION =====
export const marriageEligibility: EligibilityQuestion[] = [
  {
    id: "type",
    question: "Where do you want to register your marriage?",
    questionNepali: "तपाईं विवाह कहाँ दर्ता गर्न चाहनुहुन्छ?",
    options: [
      { value: "ward", label: "Local Ward Office", labelNepali: "स्थानीय वडा कार्यालय", nextQuestion: "both_nepali" },
      { value: "court", label: "Court Marriage", labelNepali: "अदालत विवाह", nextQuestion: "court_reason" },
    ],
  },
  {
    id: "court_reason",
    question: "Why are you opting for court marriage?",
    questionNepali: "तपाईं अदालत विवाह किन रोज्दै हुनुहुन्छ?",
    options: [
      { value: "foreign_spouse", label: "One spouse is foreigner", labelNepali: "एक जोडी विदेशी हो", nextQuestion: "age_check" },
      { value: "different_address", label: "Different permanent addresses", labelNepali: "फरक स्थायी ठेगाना", nextQuestion: "age_check" },
      { value: "preference", label: "Personal preference", labelNepali: "व्यक्तिगत रोजाइ", nextQuestion: "age_check" },
    ],
  },
  {
    id: "both_nepali",
    question: "Are both bride and groom Nepali citizens?",
    questionNepali: "के दुलही र दुलहा दुवै नेपाली नागरिक हुनुहुन्छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "same_ward" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "If one spouse is a foreigner, you must register through court marriage at the District Court." },
    ],
  },
  {
    id: "same_ward",
    question: "Do bride or groom have permanent address in the same ward?",
    questionNepali: "के दुलही वा दुलहाको स्थायी ठेगाना उही वडामा छ?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", nextQuestion: "age_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "For ward registration, at least one spouse must have permanent address in that ward. Otherwise, opt for court marriage." },
    ],
  },
  {
    id: "age_check",
    question: "Is the bride at least 20 years and groom at least 20 years old?",
    questionNepali: "के दुलही र दुलहा दुवै कम्तिमा २० वर्षका छन्?",
    options: [
      { value: "yes", label: "Yes, both are 20+", labelNepali: "हो, दुवै २०+ छन्", nextQuestion: "consent_check" },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Legal marriage age in Nepal is 20 years for both bride and groom as per Muluki Civil Code 2074." },
    ],
  },
  {
    id: "consent_check",
    question: "Is the marriage by mutual consent of both parties?",
    questionNepali: "के विवाह दुवै पक्षको आपसी सहमतिमा हो?",
    options: [
      { value: "yes", label: "Yes", labelNepali: "हो", eligible: true, reason: "You are eligible for marriage registration. Please proceed with required documents." },
      { value: "no", label: "No", labelNepali: "होइन", eligible: false, reason: "Marriage must be by mutual consent of both parties as per Nepal law." },
    ],
  },
];

// ===== EDUCATION CERTIFICATE =====
export const educationEligibility: EligibilityQuestion[] = [
  {
    id: "type",
    question: "What service do you need?",
    questionNepali: "तपाईंलाई कुन सेवा चाहिन्छ?",
    options: [
      { value: "equivalence", label: "Equivalency Certificate", labelNepali: "समकक्षता प्रमाणपत्र", nextQuestion: "education_level" },
      { value: "verification", label: "Certificate Verification", labelNepali: "प्रमाणपत्र प्रमाणीकरण", nextQuestion: "verification_purpose" },
      { value: "transcript", label: "Transcript Request", labelNepali: "ट्रान्सक्रिप्ट अनुरोध", nextQuestion: "institution_type" },
    ],
  },
  {
    id: "education_level",
    question: "What level of education needs equivalency?",
    questionNepali: "कुन स्तरको शिक्षाको समकक्षता चाहिन्छ?",
    options: [
      { value: "school", label: "School Level (SEE/SLC)", labelNepali: "विद्यालय तह (SEE/SLC)", nextQuestion: "foreign_board" },
      { value: "higher_secondary", label: "Higher Secondary (+2)", labelNepali: "उच्च माध्यमिक (+२)", nextQuestion: "foreign_board" },
      { value: "bachelor", label: "Bachelor's Degree", labelNepali: "स्नातक तह", nextQuestion: "university_recognition" },
      { value: "master", label: "Master's/PhD", labelNepali: "स्नातकोत्तर/पीएचडी", nextQuestion: "university_recognition" },
    ],
  },
  {
    id: "foreign_board",
    question: "Is your certificate from a foreign board?",
    questionNepali: "के तपाईंको प्रमाणपत्र विदेशी बोर्डबाट हो?",
    options: [
      { value: "foreign", label: "Yes, foreign board (CBSE, A-Level, IB, etc.)", labelNepali: "हो, विदेशी बोर्ड", eligible: true, reason: "You need equivalency from NEB for school level or CDC/respective university for higher levels." },
      { value: "nepali", label: "No, Nepali board", labelNepali: "होइन, नेपाली बोर्ड", eligible: true, reason: "Nepali board certificates usually don't need equivalency unless for specific purposes." },
    ],
  },
  {
    id: "university_recognition",
    question: "Is the university recognized by Nepal's UGC?",
    questionNepali: "के विश्वविद्यालय नेपालको UGC द्वारा मान्यता प्राप्त छ?",
    options: [
      { value: "yes", label: "Yes, recognized", labelNepali: "हो, मान्यता प्राप्त", eligible: true, reason: "You can apply for equivalency at Tribhuvan University or the respective university's equivalency office." },
      { value: "no", label: "No/Not sure", labelNepali: "होइन/थाहा छैन", eligible: true, reason: "Please check with UGC Nepal first. Unrecognized universities' degrees may not be accepted." },
    ],
  },
  {
    id: "verification_purpose",
    question: "What is the verification for?",
    questionNepali: "प्रमाणीकरण किसका लागि हो?",
    options: [
      { value: "foreign_education", label: "Foreign Education", labelNepali: "विदेश अध्ययन", eligible: true, reason: "Contact your issuing institution for verification letter and apostille if required." },
      { value: "employment", label: "Employment", labelNepali: "रोजगारी", eligible: true, reason: "You can request verification from the issuing institution or relevant education ministry." },
      { value: "government", label: "Government Purpose", labelNepali: "सरकारी प्रयोजन", eligible: true, reason: "Apply to the Ministry of Education for official verification." },
    ],
  },
  {
    id: "institution_type",
    question: "From which institution do you need transcript?",
    questionNepali: "कुन संस्थाबाट ट्रान्सक्रिप्ट चाहिन्छ?",
    options: [
      { value: "tu", label: "Tribhuvan University", labelNepali: "त्रिभुवन विश्वविद्यालय", eligible: true, reason: "Apply at TU Controller of Examinations office, Balkhu. Processing takes 7-15 days." },
      { value: "ku", label: "Kathmandu University", labelNepali: "काठमाडौं विश्वविद्यालय", eligible: true, reason: "Apply at KU Registrar office, Dhulikhel. Online request also available." },
      { value: "pu", label: "Pokhara/Purbanchal/Other", labelNepali: "पोखरा/पूर्वाञ्चल/अन्य", eligible: true, reason: "Contact the respective university's examination office for transcript requests." },
    ],
  },
];

// ===== SERVICE ELIGIBILITY MAP =====
export const serviceEligibility: Record<string, EligibilityQuestion[]> = {
  citizenship: citizenshipEligibility,
  passport: passportEligibility,
  driving: drivingEligibility,
  land: landEligibility,
  marriage: marriageEligibility,
  education: educationEligibility,
};

// ===== REQUIRED DOCUMENTS =====
export interface RequiredDocument {
  id: string;
  name: string;
  nameNepali: string;
  description: string;
  required: boolean;
  forTypes: string[];
}

export const citizenshipDocuments: RequiredDocument[] = [
  {
    id: "birth_cert",
    name: "Birth Certificate",
    nameNepali: "जन्म दर्ता प्रमाणपत्र",
    description: "Original birth registration certificate from local municipality",
    required: true,
    forTypes: ["descent", "birth", "naturalization"],
  },
  {
    id: "parent_citizenship",
    name: "Parent's Citizenship Certificate",
    nameNepali: "अभिभावकको नागरिकता",
    description: "Photocopy of father's or mother's citizenship certificate",
    required: true,
    forTypes: ["descent"],
  },
  {
    id: "relationship_cert",
    name: "Relationship Certificate",
    nameNepali: "नाता प्रमाणित",
    description: "Certificate proving relationship with the parent",
    required: true,
    forTypes: ["descent"],
  },
  {
    id: "photos",
    name: "Passport Size Photos",
    nameNepali: "पासपोर्ट साइज फोटो",
    description: "2 recent passport size photographs",
    required: true,
    forTypes: ["descent", "birth", "naturalization"],
  },
  {
    id: "recommendation",
    name: "Ward Recommendation",
    nameNepali: "वडा सिफारिस",
    description: "Recommendation letter from your ward office",
    required: true,
    forTypes: ["descent", "birth", "naturalization"],
  },
  {
    id: "residence_proof",
    name: "Residence Proof",
    nameNepali: "बसोबास प्रमाण",
    description: "Proof of continuous residence for 15 years",
    required: true,
    forTypes: ["naturalization"],
  },
  {
    id: "renunciation",
    name: "Renunciation of Previous Citizenship",
    nameNepali: "पूर्व नागरिकता त्याग",
    description: "Document proving renunciation of any previous citizenship",
    required: true,
    forTypes: ["naturalization"],
  },
];

export const passportDocuments: RequiredDocument[] = [
  {
    id: "citizenship",
    name: "Citizenship Certificate (Original + Copy)",
    nameNepali: "नागरिकता प्रमाणपत्र (सक्कल + प्रतिलिपि)",
    description: "Original and one photocopy of citizenship certificate",
    required: true,
    forTypes: ["new", "renewal", "lost"],
  },
  {
    id: "old_passport",
    name: "Old Passport",
    nameNepali: "पुरानो राहदानी",
    description: "Submit old passport for renewal (will be cancelled and returned)",
    required: true,
    forTypes: ["renewal"],
  },
  {
    id: "police_report",
    name: "Police Report",
    nameNepali: "प्रहरी रिपोर्ट",
    description: "FIR copy from local police station for lost passport",
    required: true,
    forTypes: ["lost"],
  },
  {
    id: "application_form",
    name: "Completed Application Form",
    nameNepali: "भरिएको आवेदन फारम",
    description: "Filled online at emrtds.nepalpassport.gov.np",
    required: true,
    forTypes: ["new", "renewal", "lost"],
  },
  {
    id: "minor_docs",
    name: "Minor Documentation",
    nameNepali: "नाबालक कागजात",
    description: "Birth certificate and parents' citizenship for applicants under 16",
    required: true,
    forTypes: ["minor"],
  },
  {
    id: "payment_receipt",
    name: "Payment Receipt",
    nameNepali: "भुक्तानी रसिद",
    description: "Online payment receipt from passport portal",
    required: true,
    forTypes: ["new", "renewal", "lost"],
  },
];

export const drivingDocuments: RequiredDocument[] = [
  {
    id: "citizenship",
    name: "Citizenship Certificate",
    nameNepali: "नागरिकता प्रमाणपत्र",
    description: "Original and photocopy of citizenship",
    required: true,
    forTypes: ["new", "renewal", "category_add"],
  },
  {
    id: "medical",
    name: "Medical Certificate",
    nameNepali: "मेडिकल प्रमाणपत्र",
    description: "Health certificate from government hospital or recognized clinic",
    required: true,
    forTypes: ["new", "category_add"],
  },
  {
    id: "photos",
    name: "Passport Size Photos",
    nameNepali: "पासपोर्ट साइज फोटो",
    description: "4 recent photos with white background",
    required: true,
    forTypes: ["new", "renewal", "category_add"],
  },
  {
    id: "blood_group",
    name: "Blood Group Report",
    nameNepali: "रक्त समूह रिपोर्ट",
    description: "Blood group certificate from recognized lab",
    required: true,
    forTypes: ["new"],
  },
  {
    id: "old_license",
    name: "Old/Expired License",
    nameNepali: "पुरानो/म्याद सकिएको लाइसेन्स",
    description: "Original old license for renewal",
    required: true,
    forTypes: ["renewal", "category_add"],
  },
  {
    id: "online_form",
    name: "Online Application Form",
    nameNepali: "अनलाइन आवेदन फारम",
    description: "Register and fill form at nagarikapp.gov.np or transport office",
    required: true,
    forTypes: ["new", "renewal", "category_add"],
  },
];

export const landDocuments: RequiredDocument[] = [
  {
    id: "lalpurja",
    name: "Land Ownership Certificate (लालपुर्जा)",
    nameNepali: "जग्गाधनी प्रमाणपत्र",
    description: "Original land ownership certificate of seller",
    required: true,
    forTypes: ["purchase", "gift"],
  },
  {
    id: "citizenship_both",
    name: "Citizenship of Both Parties",
    nameNepali: "दुवै पक्षको नागरिकता",
    description: "Original citizenship of buyer and seller",
    required: true,
    forTypes: ["purchase", "gift"],
  },
  {
    id: "tax_clearance",
    name: "Tax Clearance Certificate",
    nameNepali: "कर चुक्ता प्रमाणपत्र",
    description: "Land tax clearance from municipality",
    required: true,
    forTypes: ["purchase", "gift", "inheritance"],
  },
  {
    id: "photos",
    name: "Passport Size Photos",
    nameNepali: "पासपोर्ट साइज फोटो",
    description: "Recent photos of both parties",
    required: true,
    forTypes: ["purchase", "gift", "inheritance"],
  },
  {
    id: "death_cert",
    name: "Death Certificate",
    nameNepali: "मृत्यु प्रमाणपत्र",
    description: "Death certificate of deceased land owner",
    required: true,
    forTypes: ["inheritance"],
  },
  {
    id: "relationship_proof",
    name: "Relationship Proof",
    nameNepali: "नाता प्रमाण",
    description: "Document proving heir relationship",
    required: true,
    forTypes: ["inheritance"],
  },
  {
    id: "valuation",
    name: "Land Valuation Certificate",
    nameNepali: "जग्गा मूल्यांकन प्रमाणपत्र",
    description: "From Land Revenue Office for tax calculation",
    required: true,
    forTypes: ["purchase", "gift"],
  },
];

export const marriageDocuments: RequiredDocument[] = [
  {
    id: "citizenship_both",
    name: "Citizenship of Bride and Groom",
    nameNepali: "दुलही र दुलहाको नागरिकता",
    description: "Original citizenship certificates of both parties",
    required: true,
    forTypes: ["ward", "court"],
  },
  {
    id: "photos",
    name: "Passport Size Photos",
    nameNepali: "पासपोर्ट साइज फोटो",
    description: "Recent photos of bride and groom (2 each)",
    required: true,
    forTypes: ["ward", "court"],
  },
  {
    id: "witnesses",
    name: "Witness Citizenship",
    nameNepali: "साक्षीको नागरिकता",
    description: "Citizenship of 2 witnesses from each side",
    required: true,
    forTypes: ["ward", "court"],
  },
  {
    id: "application_form",
    name: "Marriage Registration Form",
    nameNepali: "विवाह दर्ता फारम",
    description: "Filled marriage registration application form",
    required: true,
    forTypes: ["ward", "court"],
  },
  {
    id: "consent_letter",
    name: "Consent Letter (if applicable)",
    nameNepali: "मञ्जुरीनामा (लागू भएमा)",
    description: "Written consent from guardians if below 21",
    required: false,
    forTypes: ["ward", "court"],
  },
  {
    id: "foreign_docs",
    name: "Foreigner's Documents",
    nameNepali: "विदेशीको कागजातहरू",
    description: "Passport, visa, no objection certificate from embassy",
    required: true,
    forTypes: ["court_foreign"],
  },
];

export const educationDocuments: RequiredDocument[] = [
  {
    id: "original_cert",
    name: "Original Certificate/Marksheet",
    nameNepali: "सक्कल प्रमाणपत्र/अंकपत्र",
    description: "Original certificate that needs equivalency/verification",
    required: true,
    forTypes: ["equivalence", "verification"],
  },
  {
    id: "citizenship",
    name: "Citizenship Certificate",
    nameNepali: "नागरिकता प्रमाणपत्र",
    description: "Copy of Nepali citizenship",
    required: true,
    forTypes: ["equivalence", "verification", "transcript"],
  },
  {
    id: "photos",
    name: "Passport Size Photos",
    nameNepali: "पासपोर्ट साइज फोटो",
    description: "2 recent passport size photos",
    required: true,
    forTypes: ["equivalence", "verification", "transcript"],
  },
  {
    id: "application_form",
    name: "Equivalency Application Form",
    nameNepali: "समकक्षता आवेदन फारम",
    description: "Filled application form from respective office",
    required: true,
    forTypes: ["equivalence"],
  },
  {
    id: "transcript",
    name: "Academic Transcript",
    nameNepali: "शैक्षिक प्रतिलिपि",
    description: "Official transcript from issuing institution",
    required: true,
    forTypes: ["equivalence"],
  },
  {
    id: "migration",
    name: "Migration Certificate (if applicable)",
    nameNepali: "माइग्रेसन प्रमाणपत्र",
    description: "Required for board transfers",
    required: false,
    forTypes: ["equivalence"],
  },
];

// ===== SERVICE DOCUMENTS MAP =====
export const serviceDocuments: Record<string, RequiredDocument[]> = {
  citizenship: citizenshipDocuments,
  passport: passportDocuments,
  driving: drivingDocuments,
  land: landDocuments,
  marriage: marriageDocuments,
  education: educationDocuments,
};

// ===== DISTRICTS AND OFFICES =====
export interface District {
  id: string;
  name: string;
  nameNepali: string;
  province: number;
  municipalities: Municipality[];
}

export interface Municipality {
  id: string;
  name: string;
  nameNepali: string;
  type: "metropolitan" | "sub-metropolitan" | "municipality" | "rural";
}

export interface Office {
  id: string;
  name: string;
  nameNepali: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  services: string[];
}

export const districts: District[] = [
  {
    id: "kathmandu",
    name: "Kathmandu",
    nameNepali: "काठमाडौं",
    province: 3,
    municipalities: [
      { id: "kmc", name: "Kathmandu Metropolitan City", nameNepali: "काठमाडौं महानगरपालिका", type: "metropolitan" },
      { id: "budhanilkantha", name: "Budhanilkantha Municipality", nameNepali: "बूढानिलकण्ठ नगरपालिका", type: "municipality" },
      { id: "tokha", name: "Tokha Municipality", nameNepali: "टोखा नगरपालिका", type: "municipality" },
    ],
  },
  {
    id: "lalitpur",
    name: "Lalitpur",
    nameNepali: "ललितपुर",
    province: 3,
    municipalities: [
      { id: "lmc", name: "Lalitpur Metropolitan City", nameNepali: "ललितपुर महानगरपालिका", type: "metropolitan" },
      { id: "godawari", name: "Godawari Municipality", nameNepali: "गोदावरी नगरपालिका", type: "municipality" },
    ],
  },
  {
    id: "bhaktapur",
    name: "Bhaktapur",
    nameNepali: "भक्तपुर",
    province: 3,
    municipalities: [
      { id: "bmc", name: "Bhaktapur Municipality", nameNepali: "भक्तपुर नगरपालिका", type: "municipality" },
      { id: "madhyapur", name: "Madhyapur Thimi Municipality", nameNepali: "मध्यपुर थिमी नगरपालिका", type: "municipality" },
    ],
  },
  {
    id: "pokhara",
    name: "Kaski",
    nameNepali: "कास्की",
    province: 4,
    municipalities: [
      { id: "pmc", name: "Pokhara Metropolitan City", nameNepali: "पोखरा महानगरपालिका", type: "metropolitan" },
    ],
  },
  {
    id: "chitwan",
    name: "Chitwan",
    nameNepali: "चितवन",
    province: 3,
    municipalities: [
      { id: "bharatpur", name: "Bharatpur Metropolitan City", nameNepali: "भरतपुर महानगरपालिका", type: "metropolitan" },
      { id: "ratnanagar", name: "Ratnanagar Municipality", nameNepali: "रत्ननगर नगरपालिका", type: "municipality" },
    ],
  },
];

export const offices: Office[] = [
  {
    id: "dao-kathmandu",
    name: "District Administration Office, Kathmandu",
    nameNepali: "जिल्ला प्रशासन कार्यालय, काठमाडौं",
    district: "kathmandu",
    address: "Hanumandhoka, Kathmandu",
    phone: "01-4211470",
    email: "dao.kathmandu@moha.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["citizenship", "passport"],
  },
  {
    id: "dotm-kathmandu",
    name: "Transport Management Office, Ekantakuna",
    nameNepali: "यातायात व्यवस्था कार्यालय, एकान्तकुना",
    district: "kathmandu",
    address: "Ekantakuna, Lalitpur",
    phone: "01-5529169",
    email: "dotm@dotm.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["driving"],
  },
  {
    id: "lro-kathmandu",
    name: "Land Revenue Office, Kathmandu",
    nameNepali: "मालपोत कार्यालय, काठमाडौं",
    district: "kathmandu",
    address: "Babarmahal, Kathmandu",
    phone: "01-4227401",
    email: "lro.kathmandu@dolma.gov.np",
    hours: "10:00 AM - 4:00 PM (Sun-Fri)",
    services: ["land"],
  },
  {
    id: "passport-dept",
    name: "Department of Passports",
    nameNepali: "राहदानी विभाग",
    district: "kathmandu",
    address: "Tripureshwor, Kathmandu",
    phone: "01-4261177",
    email: "info@nepalpassport.gov.np",
    hours: "10:00 AM - 4:00 PM (Sun-Fri)",
    services: ["passport"],
  },
  {
    id: "dao-lalitpur",
    name: "District Administration Office, Lalitpur",
    nameNepali: "जिल्ला प्रशासन कार्यालय, ललितपुर",
    district: "lalitpur",
    address: "Pulchowk, Lalitpur",
    phone: "01-5521654",
    email: "dao.lalitpur@moha.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["citizenship", "passport", "marriage"],
  },
  {
    id: "dao-bhaktapur",
    name: "District Administration Office, Bhaktapur",
    nameNepali: "जिल्ला प्रशासन कार्यालय, भक्तपुर",
    district: "bhaktapur",
    address: "Dudhpati, Bhaktapur",
    phone: "01-6610175",
    email: "dao.bhaktapur@moha.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["citizenship", "passport", "marriage"],
  },
  {
    id: "dotm-bhaktapur",
    name: "Transport Management Office, Jagati",
    nameNepali: "यातायात व्यवस्था कार्यालय, जगाती",
    district: "bhaktapur",
    address: "Jagati, Bhaktapur",
    phone: "01-6612626",
    email: "jagati@dotm.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["driving"],
  },
  {
    id: "dao-kaski",
    name: "District Administration Office, Kaski",
    nameNepali: "जिल्ला प्रशासन कार्यालय, कास्की",
    district: "pokhara",
    address: "Bagar, Pokhara",
    phone: "061-520126",
    email: "dao.kaski@moha.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["citizenship", "passport", "marriage"],
  },
  {
    id: "dao-chitwan",
    name: "District Administration Office, Chitwan",
    nameNepali: "जिल्ला प्रशासन कार्यालय, चितवन",
    district: "chitwan",
    address: "Bharatpur, Chitwan",
    phone: "056-520127",
    email: "dao.chitwan@moha.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    services: ["citizenship", "passport", "marriage"],
  },
];

// ===== PROCEDURE STEPS =====
export interface ProcedureStep {
  id: string;
  title: string;
  titleNepali: string;
  description: string;
  isOnline: boolean;
  link?: string;
  tips?: string[];
}

export const citizenshipProcedure: ProcedureStep[] = [
  {
    id: "step1",
    title: "Collect Required Documents",
    titleNepali: "आवश्यक कागजातहरू जम्मा गर्नुहोस्",
    description: "Gather all required documents including birth certificate, parent's citizenship, photos, and ward recommendation.",
    isOnline: false,
    tips: [
      "Get ward recommendation first as other documents may require it",
      "Make photocopies of all documents",
      "Ensure photos are recent and passport-sized",
    ],
  },
  {
    id: "step2",
    title: "Get Ward Recommendation",
    titleNepali: "वडा सिफारिस लिनुहोस्",
    description: "Visit your local ward office to get a recommendation letter. You'll need proof of residence and parent's citizenship.",
    isOnline: false,
    tips: [
      "Visit during morning hours for faster service",
      "Bring your parent or guardian if you're a first-time applicant",
    ],
  },
  {
    id: "step3",
    title: "Fill Application Form",
    titleNepali: "आवेदन फारम भर्नुहोस्",
    description: "Complete the citizenship application form. You can download it online or get it from the DAO office.",
    isOnline: true,
    link: "https://moha.gov.np/forms",
    tips: [
      "Fill the form in Nepali using a black pen",
      "Don't leave any required fields empty",
      "Double-check all information before submission",
    ],
  },
  {
    id: "step4",
    title: "Submit at District Administration Office",
    titleNepali: "जिल्ला प्रशासन कार्यालयमा बुझाउनुहोस्",
    description: "Visit your District Administration Office with all documents and completed application form.",
    isOnline: false,
    tips: [
      "Arrive early to avoid long queues",
      "Keep original documents and photocopies ready",
      "Token system is usually in place - collect your token first",
    ],
  },
  {
    id: "step5",
    title: "Biometric Registration",
    titleNepali: "बायोमेट्रिक दर्ता",
    description: "Your fingerprints and photograph will be taken digitally at the office.",
    isOnline: false,
    tips: [
      "This is done on the same day as document submission",
      "Ensure your fingers are clean and dry",
    ],
  },
  {
    id: "step6",
    title: "Collect Citizenship Certificate",
    titleNepali: "नागरिकता प्रमाणपत्र लिनुहोस्",
    description: "Return to the DAO office after the processing period to collect your citizenship certificate.",
    isOnline: false,
    tips: [
      "Bring your receipt/acknowledgment slip",
      "Processing usually takes 1-7 days depending on the district",
    ],
  },
];

export const passportProcedure: ProcedureStep[] = [
  {
    id: "step1",
    title: "Create Online Account",
    titleNepali: "अनलाइन खाता बनाउनुहोस्",
    description: "Register at the Department of Passport's online portal (emrtds.nepalpassport.gov.np)",
    isOnline: true,
    link: "https://emrtds.nepalpassport.gov.np",
    tips: [
      "Use a valid email address you have access to",
      "Keep your login credentials safe",
      "You can also use Nagarik App for registration",
    ],
  },
  {
    id: "step2",
    title: "Fill Online Application",
    titleNepali: "अनलाइन आवेदन भर्नुहोस्",
    description: "Complete the passport application form online with accurate details matching your citizenship.",
    isOnline: true,
    link: "https://emrtds.nepalpassport.gov.np",
    tips: [
      "Double-check all details match your citizenship exactly",
      "Upload a photo meeting ICAO standards",
      "Save your application reference number",
    ],
  },
  {
    id: "step3",
    title: "Pay Fee Online",
    titleNepali: "अनलाइन शुल्क तिर्नुहोस्",
    description: "Pay the passport fee through online payment portal using eSewa, Khalti, or bank transfer.",
    isOnline: true,
    link: "https://payment.nepalpassport.gov.np:8443/start/",
    tips: [
      "Regular (7 days): NPR 5,000 | Fast Track (2-3 days): NPR 10,000",
      "Keep payment receipt/screenshot",
      "Payment is non-refundable",
    ],
  },
  {
    id: "step4",
    title: "Book Appointment",
    titleNepali: "अपोइन्टमेन्ट बुक गर्नुहोस्",
    description: "Select your preferred date and location for biometric enrollment.",
    isOnline: true,
    link: "https://emrtds.nepalpassport.gov.np",
    tips: [
      "Choose a date at least 3-4 days ahead",
      "Appointments fill up fast - book early",
      "You can visit Department of Passport (Tripureshwor) or District offices",
    ],
  },
  {
    id: "step5",
    title: "Visit for Biometric Enrollment",
    titleNepali: "बायोमेट्रिक दर्ताको लागि जानुहोस्",
    description: "Visit the selected office on your appointment date with all required documents.",
    isOnline: false,
    tips: [
      "Arrive 30 minutes before your appointment",
      "Bring original citizenship and copies",
      "Photo will be taken at the center",
    ],
  },
  {
    id: "step6",
    title: "Collect Passport",
    titleNepali: "राहदानी लिनुहोस्",
    description: "Collect your passport from the same location after processing.",
    isOnline: false,
    tips: [
      "Regular service: 7 working days",
      "Fast track: 2-3 working days",
      "Bring your receipt and ID",
    ],
  },
];

export const drivingProcedure: ProcedureStep[] = [
  {
    id: "step1",
    title: "Register Online",
    titleNepali: "अनलाइन दर्ता गर्नुहोस्",
    description: "Create an account and fill application at Nagarik App or Transport Office portal.",
    isOnline: true,
    link: "https://nagarikapp.gov.np",
    tips: [
      "Download Nagarik App from Play Store/App Store",
      "You can also register at TMO portal",
      "Keep your application number safe",
    ],
  },
  {
    id: "step2",
    title: "Get Medical Certificate",
    titleNepali: "मेडिकल प्रमाणपत्र लिनुहोस्",
    description: "Get medical fitness certificate from a government hospital or recognized clinic.",
    isOnline: false,
    tips: [
      "Cost: NPR 300-500 at government hospital",
      "Includes eye test and basic health check",
      "Valid for 3 months",
    ],
  },
  {
    id: "step3",
    title: "Book Written Exam",
    titleNepali: "लिखित परीक्षा बुक गर्नुहोस्",
    description: "Select date for written test through online portal.",
    isOnline: true,
    link: "https://nagarikapp.gov.np",
    tips: [
      "Study the traffic rules book available online",
      "Exam is computer-based with multiple choice questions",
      "Passing marks: 60%",
    ],
  },
  {
    id: "step4",
    title: "Pass Written Exam",
    titleNepali: "लिखित परीक्षा पास गर्नुहोस्",
    description: "Appear for written exam at Transport Management Office with required documents.",
    isOnline: false,
    tips: [
      "Bring citizenship, medical certificate, photos",
      "Arrive 30 minutes early",
      "Results announced same day",
    ],
  },
  {
    id: "step5",
    title: "Book Trial (Practical) Exam",
    titleNepali: "ट्रायल (प्रयोगात्मक) परीक्षा बुक गर्नुहोस्",
    description: "After passing written test, book trial test date.",
    isOnline: true,
    link: "https://nagarikapp.gov.np",
    tips: [
      "Practice at a recognized driving school",
      "Trial includes figure 8, slope, and road driving",
      "You get 3 attempts within 90 days",
    ],
  },
  {
    id: "step6",
    title: "Pass Trial Exam & Collect License",
    titleNepali: "ट्रायल परीक्षा पास गरी लाइसेन्स लिनुहोस्",
    description: "After passing trial, your smart driving license will be printed.",
    isOnline: false,
    tips: [
      "Smart card license issued same day or next day",
      "License valid for 5 years",
      "Can be shown digitally via Nagarik App",
    ],
  },
];

export const landProcedure: ProcedureStep[] = [
  {
    id: "step1",
    title: "Verify Land Details",
    titleNepali: "जग्गा विवरण प्रमाणित गर्नुहोस्",
    description: "Check land ownership, boundaries, and any existing loans/disputes at Land Revenue Office.",
    isOnline: false,
    tips: [
      "Get a Lalpurja photocopy from current owner",
      "Check the land map (नक्सा) at survey office",
      "Verify no bank mortgage exists",
    ],
  },
  {
    id: "step2",
    title: "Get Tax Clearance",
    titleNepali: "कर चुक्ता प्रमाणपत्र लिनुहोस्",
    description: "Seller must clear all pending land taxes and get clearance certificate from municipality.",
    isOnline: false,
    tips: [
      "Visit local municipality/VDC office",
      "Clear all dues including property tax",
      "Certificate valid for 35 days",
    ],
  },
  {
    id: "step3",
    title: "Land Valuation",
    titleNepali: "जग्गा मूल्यांकन",
    description: "Get official valuation from Land Revenue Office for calculating registration fee.",
    isOnline: false,
    tips: [
      "Government rate usually lower than market rate",
      "Registration fee based on government valuation",
      "Different rates for urban/rural areas",
    ],
  },
  {
    id: "step4",
    title: "Prepare Documents",
    titleNepali: "कागजातहरू तयार गर्नुहोस्",
    description: "Gather all required documents from both buyer and seller.",
    isOnline: false,
    tips: [
      "Both parties' citizenship (original + copy)",
      "Original Lalpurja of seller",
      "4 photos of each party",
      "Tax clearance certificate",
    ],
  },
  {
    id: "step5",
    title: "Visit Land Revenue Office",
    titleNepali: "मालपोत कार्यालय जानुहोस्",
    description: "Both buyer and seller must visit together with all documents and witnesses.",
    isOnline: false,
    tips: [
      "Bring 2 witnesses with citizenship",
      "Pay registration fee (4% for agricultural, 6% for residential)",
      "Biometric verification of both parties",
    ],
  },
  {
    id: "step6",
    title: "Receive New Lalpurja",
    titleNepali: "नयाँ लालपुर्जा प्राप्त गर्नुहोस्",
    description: "After verification, new ownership certificate is issued in buyer's name.",
    isOnline: false,
    tips: [
      "Processing takes 1-3 days",
      "Verify all details on new Lalpurja",
      "Keep copies of all transaction documents",
    ],
  },
];

export const marriageProcedure: ProcedureStep[] = [
  {
    id: "step1",
    title: "Choose Registration Type",
    titleNepali: "दर्ता प्रकार छान्नुहोस्",
    description: "Decide between Ward Office registration or Court Marriage based on your situation.",
    isOnline: false,
    tips: [
      "Ward registration: Both should have address in same ward",
      "Court marriage: For different addresses or foreigner spouse",
      "Both require similar documents",
    ],
  },
  {
    id: "step2",
    title: "Collect Documents",
    titleNepali: "कागजातहरू जम्मा गर्नुहोस्",
    description: "Gather citizenship, photos, and arrange witnesses from both sides.",
    isOnline: false,
    tips: [
      "Citizenship of bride, groom, and 2 witnesses each",
      "Recent passport photos",
      "Witnesses should be adults with citizenship",
    ],
  },
  {
    id: "step3",
    title: "Get Application Form",
    titleNepali: "आवेदन फारम लिनुहोस्",
    description: "Obtain marriage registration form from Ward Office or District Court.",
    isOnline: false,
    tips: [
      "Form is free at ward offices",
      "Fill in Nepali language",
      "Both parties must sign",
    ],
  },
  {
    id: "step4",
    title: "Submit Application",
    titleNepali: "आवेदन बुझाउनुहोस्",
    description: "Submit completed form with all documents and witnesses present.",
    isOnline: false,
    tips: [
      "Both bride and groom must be present",
      "All 4 witnesses should be present",
      "Ward office may announce 35-day notice period",
    ],
  },
  {
    id: "step5",
    title: "Wait for Processing",
    titleNepali: "प्रक्रियाको लागि पर्खनुहोस्",
    description: "Ward office processes after 35-day public notice period (can be waived in some cases).",
    isOnline: false,
    tips: [
      "Court marriage may be faster",
      "Some wards process within 7 days",
      "Check with your specific ward office",
    ],
  },
  {
    id: "step6",
    title: "Collect Marriage Certificate",
    titleNepali: "विवाह प्रमाणपत्र लिनुहोस्",
    description: "Receive official marriage registration certificate.",
    isOnline: false,
    tips: [
      "Registration fee: NPR 100-500",
      "Get multiple copies for future use",
      "Required for spouse visa, joint accounts, etc.",
    ],
  },
];

export const educationProcedure: ProcedureStep[] = [
  {
    id: "step1",
    title: "Identify Required Office",
    titleNepali: "आवश्यक कार्यालय पहिचान गर्नुहोस्",
    description: "Determine which office handles your equivalency based on education level.",
    isOnline: false,
    tips: [
      "School level (SEE/O-Level): National Examination Board (NEB)",
      "+2/A-Level: Curriculum Development Centre (CDC)",
      "Bachelor/Master: Respective university or TU",
    ],
  },
  {
    id: "step2",
    title: "Get Document Verification",
    titleNepali: "कागजात प्रमाणीकरण गर्नुहोस्",
    description: "Get your original certificates verified by the issuing institution.",
    isOnline: false,
    tips: [
      "Foreign boards may require apostille",
      "Indian boards: Verified by respective board",
      "Request verification letter from school/university",
    ],
  },
  {
    id: "step3",
    title: "Fill Application Form",
    titleNepali: "आवेदन फारम भर्नुहोस्",
    description: "Complete the equivalency application form from the relevant office.",
    isOnline: true,
    link: "https://neb.gov.np",
    tips: [
      "NEB form available at Sanothimi office",
      "TU form at Registrar's office, Kirtipur",
      "Some universities accept online applications",
    ],
  },
  {
    id: "step4",
    title: "Submit Documents",
    titleNepali: "कागजातहरू बुझाउनुहोस्",
    description: "Submit application with all required documents and fee.",
    isOnline: false,
    tips: [
      "Original certificates + verified photocopies",
      "Transcript/marksheet",
      "Citizenship copy and photos",
    ],
  },
  {
    id: "step5",
    title: "Pay Fee",
    titleNepali: "शुल्क तिर्नुहोस्",
    description: "Pay the equivalency processing fee at the office or designated bank.",
    isOnline: false,
    tips: [
      "NEB equivalency: NPR 2,000-3,000",
      "University equivalency: NPR 3,000-5,000",
      "Urgent processing may cost extra",
    ],
  },
  {
    id: "step6",
    title: "Collect Equivalency Certificate",
    titleNepali: "समकक्षता प्रमाणपत्र लिनुहोस्",
    description: "Collect your equivalency certificate after processing period.",
    isOnline: false,
    tips: [
      "Processing time: 7-30 days",
      "May require committee meeting for higher degrees",
      "Certificate states Nepal equivalent grade/level",
    ],
  },
];

// ===== SERVICE PROCEDURE MAP =====
export const serviceProcedures: Record<string, ProcedureStep[]> = {
  citizenship: citizenshipProcedure,
  passport: passportProcedure,
  driving: drivingProcedure,
  land: landProcedure,
  marriage: marriageProcedure,
  education: educationProcedure,
};

// ===== COST AND TIME =====
export interface CostAndTimeInfo {
  fee: string;
  feeNepali: string;
  processingTime: string;
  processingTimeNepali: string;
  notes: string[];
}

export const citizenshipCostAndTime: CostAndTimeInfo = {
  fee: "NRs. 10 (Ten Rupees only)",
  feeNepali: "रु. १० (दश रुपैया मात्र)",
  processingTime: "1-7 working days",
  processingTimeNepali: "१-७ कार्य दिन",
  notes: [
    "No additional fees for first-time applicants",
    "Urgent processing may be available for an additional fee",
    "Processing time may vary during peak seasons",
  ],
};

export const passportCostAndTime: CostAndTimeInfo = {
  fee: "Regular: NRs. 5,000 | Fast Track: NRs. 10,000",
  feeNepali: "सामान्य: रु. ५,००० | द्रुत सेवा: रु. १०,०००",
  processingTime: "Regular: 7 days | Fast Track: 2-3 days",
  processingTimeNepali: "सामान्य: ७ दिन | द्रुत सेवा: २-३ दिन",
  notes: [
    "10-year validity for adults (18+)",
    "5-year validity for minors (under 18)",
    "Additional pages: NRs. 2,000",
    "Damaged/lost replacement: Same fee as new",
  ],
};

export const drivingCostAndTime: CostAndTimeInfo = {
  fee: "Category A: NRs. 1,200 | Category B: NRs. 2,000 | Heavy: NRs. 2,500+",
  feeNepali: "श्रेणी क: रु. १,२०० | श्रेणी ख: रु. २,००० | भारी: रु. २,५००+",
  processingTime: "3-4 weeks (exam + processing)",
  processingTimeNepali: "३-४ हप्ता (परीक्षा + प्रक्रिया)",
  notes: [
    "Written exam fee included in license fee",
    "Medical certificate: NRs. 300-500 extra",
    "Driving school recommended: NRs. 5,000-15,000",
    "License valid for 5 years",
    "Renewal: 50% of new license fee",
  ],
};

export const landCostAndTime: CostAndTimeInfo = {
  fee: "4% (Agricultural) - 6% (Residential) of land value",
  feeNepali: "४% (कृषि) - ६% (आवासीय) जग्गा मूल्यको",
  processingTime: "1-3 working days",
  processingTimeNepali: "१-३ कार्य दिन",
  notes: [
    "Registration based on government valuation rate",
    "Capital gains tax: 5% on profit (if sold within 5 years)",
    "Gift within family: Reduced rates apply",
    "Inheritance: Minimal fee (NRs. 500-1000)",
    "Additional survey fee may apply",
  ],
};

export const marriageCostAndTime: CostAndTimeInfo = {
  fee: "NRs. 100-500 (Ward) | NRs. 1,000-2,000 (Court)",
  feeNepali: "रु. १००-५०० (वडा) | रु. १,०००-२,००० (अदालत)",
  processingTime: "Same day to 35 days",
  processingTimeNepali: "उही दिन देखि ३५ दिनसम्म",
  notes: [
    "35-day notice period may be required",
    "Court marriage usually faster",
    "Foreign spouse: Additional embassy fees",
    "Marriage certificate valid for all legal purposes",
  ],
};

export const educationCostAndTime: CostAndTimeInfo = {
  fee: "NRs. 2,000-5,000 (varies by level)",
  feeNepali: "रु. २,०००-५,००० (तहअनुसार फरक)",
  processingTime: "7-30 days",
  processingTimeNepali: "७-३० दिन",
  notes: [
    "School level (NEB): NRs. 2,000",
    "+2 level (CDC): NRs. 2,500",
    "University level: NRs. 3,000-5,000",
    "Higher committee approval may take longer",
    "Apostille/attestation: Extra fees apply",
  ],
};

// ===== SERVICE COST MAP =====
export const serviceCosts: Record<string, CostAndTimeInfo> = {
  citizenship: citizenshipCostAndTime,
  passport: passportCostAndTime,
  driving: drivingCostAndTime,
  land: landCostAndTime,
  marriage: marriageCostAndTime,
  education: educationCostAndTime,
};

// ===== DOWNLOADABLE FORMS =====
export interface DownloadableForm {
  id: string;
  name: string;
  nameNepali: string;
  description: string;
  url: string;
  fileType: "pdf" | "doc" | "online";
  isExternal: boolean;
}

export const citizenshipForms: DownloadableForm[] = [
  {
    id: "citizenship_form",
    name: "Citizenship Application Form",
    nameNepali: "नागरिकता आवेदन फारम",
    description: "Main application form for citizenship by descent",
    url: "https://moha.gov.np/uploads/documentFiles/doc1.pdf",
    fileType: "pdf",
    isExternal: true,
  },
];

export const passportForms: DownloadableForm[] = [
  {
    id: "passport_online",
    name: "Online Passport Application",
    nameNepali: "अनलाइन राहदानी आवेदन",
    description: "Official online application portal for ePassport",
    url: "https://emrtds.nepalpassport.gov.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "mrp_offline",
    name: "MRP Offline Application Form",
    nameNepali: "MRP अफलाइन आवेदन फारम",
    description: "Offline application form for passport (PDF)",
    url: "https://nepalpassport.gov.np/storage/gQ6zWHjIcDQMOqnGuqGTzNpaZXJYNC-metaZm9ybTItNG12Mi0xLnBkZg==-.pdf",
    fileType: "pdf",
    isExternal: true,
  },
  {
    id: "district_verification",
    name: "District Verification Sample",
    nameNepali: "जिल्ला प्रमाणीकरण नमूना",
    description: "Sample format for district verification",
    url: "https://nepalpassport.gov.np/storage/ch7SrKBdny08IM4jKGkuNzqBUcjzhs-metaRGlzdHJpY3QtVmVyaWZpY2F0aW9uLVNhbXBsZS1OZXcucGRm-.pdf",
    fileType: "pdf",
    isExternal: true,
  },
  {
    id: "passport_payment",
    name: "Passport Fee Payment Portal",
    nameNepali: "राहदानी शुल्क भुक्तानी पोर्टल",
    description: "Online payment portal for passport fees",
    url: "https://payment.nepalpassport.gov.np:8443/start/",
    fileType: "online",
    isExternal: true,
  },
];

export const drivingForms: DownloadableForm[] = [
  {
    id: "nagarik_app",
    name: "Nagarik App - Online Application",
    nameNepali: "नागरिक एप - अनलाइन आवेदन",
    description: "Download Nagarik App for license application and digital license",
    url: "https://nagarikapp.gov.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "dotm_portal",
    name: "Transport Management Portal",
    nameNepali: "यातायात व्यवस्था पोर्टल",
    description: "Official DOTM portal for license services",
    url: "https://www.dotm.gov.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "traffic_rules",
    name: "Traffic Rules Book (Study Material)",
    nameNepali: "ट्राफिक नियम पुस्तक (अध्ययन सामग्री)",
    description: "Official traffic rules for written exam preparation",
    url: "https://www.dotm.gov.np/Files/NoticePDF/Traffic_Rules.pdf",
    fileType: "pdf",
    isExternal: true,
  },
];

export const landForms: DownloadableForm[] = [
  {
    id: "land_revenue_portal",
    name: "Land Revenue Department Portal",
    nameNepali: "मालपोत विभाग पोर्टल",
    description: "Official portal for land information and services",
    url: "https://www.dolma.gov.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "land_info_system",
    name: "Land Information System",
    nameNepali: "भूमि सूचना प्रणाली",
    description: "Check land records and ownership online",
    url: "https://mlis.dolma.gov.np",
    fileType: "online",
    isExternal: true,
  },
];

export const marriageForms: DownloadableForm[] = [
  {
    id: "marriage_form",
    name: "Marriage Registration Form",
    nameNepali: "विवाह दर्ता फारम",
    description: "Application form for marriage registration at ward office",
    url: "https://www.mofald.gov.np/forms/marriage",
    fileType: "pdf",
    isExternal: true,
  },
  {
    id: "court_marriage_info",
    name: "Court Marriage Information",
    nameNepali: "अदालत विवाह जानकारी",
    description: "Supreme Court of Nepal - Marriage registration info",
    url: "https://supremecourt.gov.np",
    fileType: "online",
    isExternal: true,
  },
];

export const educationForms: DownloadableForm[] = [
  {
    id: "neb_portal",
    name: "National Examination Board",
    nameNepali: "राष्ट्रिय परीक्षा बोर्ड",
    description: "NEB portal for school level equivalency",
    url: "https://neb.gov.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "cdc_portal",
    name: "Curriculum Development Centre",
    nameNepali: "पाठ्यक्रम विकास केन्द्र",
    description: "CDC for +2 level equivalency",
    url: "https://moecdc.gov.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "tu_equivalency",
    name: "TU Equivalency Office",
    nameNepali: "त्रि.वि. समकक्षता कार्यालय",
    description: "Tribhuvan University foreign degree equivalency",
    url: "https://tu.edu.np",
    fileType: "online",
    isExternal: true,
  },
  {
    id: "ugc_portal",
    name: "University Grants Commission",
    nameNepali: "विश्वविद्यालय अनुदान आयोग",
    description: "Check if foreign university is recognized in Nepal",
    url: "https://ugcnepal.edu.np",
    fileType: "online",
    isExternal: true,
  },
];

// ===== SERVICE FORMS MAP =====
export const serviceForms: Record<string, DownloadableForm[]> = {
  citizenship: citizenshipForms,
  passport: passportForms,
  driving: drivingForms,
  land: landForms,
  marriage: marriageForms,
  education: educationForms,
};

// ===== SERVICE INFO =====
export interface ServiceInfo {
  id: string;
  title: string;
  titleNepali: string;
  description: string;
  longDescription: string;
}

export const serviceInfo: Record<string, ServiceInfo> = {
  citizenship: {
    id: "citizenship",
    title: "Citizenship Certificate",
    titleNepali: "नागरिकता प्रमाणपत्र",
    description: "Apply for citizenship by descent, birth, or naturalization",
    longDescription: "Complete guide to obtaining your Nepali citizenship certificate. Check your eligibility, gather required documents, find your nearest office, and follow our step-by-step procedure.",
  },
  passport: {
    id: "passport",
    title: "Passport",
    titleNepali: "राहदानी",
    description: "Apply for new passport or renewal",
    longDescription: "Get your Nepali ePassport through the online application system. Apply for new passport, renewal, or replacement for lost/damaged passport.",
  },
  driving: {
    id: "driving",
    title: "Driving License",
    titleNepali: "सवारी चालक अनुमतिपत्र",
    description: "Apply for new license or renewal",
    longDescription: "Obtain your smart digital driving license in Nepal. Apply for two-wheeler, light vehicle, or heavy vehicle categories through the online system.",
  },
  land: {
    id: "land",
    title: "Land Registration",
    titleNepali: "जग्गा दर्ता",
    description: "Register land ownership and transfers",
    longDescription: "Complete guide to land registration, ownership transfer, inheritance, and gift deeds. Learn about the process, fees, and required documents.",
  },
  marriage: {
    id: "marriage",
    title: "Marriage Registration",
    titleNepali: "विवाह दर्ता",
    description: "Register your marriage officially",
    longDescription: "Register your marriage at the local ward office or through court marriage. Get your official marriage certificate for legal recognition.",
  },
  education: {
    id: "education",
    title: "Education Certificates",
    titleNepali: "शैक्षिक प्रमाणपत्र",
    description: "Equivalency and verification services",
    longDescription: "Get equivalency certificates for foreign educational qualifications, verification letters, and transcript requests from Nepali institutions.",
  },
};
