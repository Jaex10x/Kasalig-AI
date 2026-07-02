import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Upload,
  FileText,
  User,
  ClipboardList,
  Eye,
  CheckCircle2,
  Home,
  Search,
  X,
  Sparkles,
} from 'lucide-react';
import { serviceInfo } from '../components/ApplicationCard/ApplicationCard';
import Navbar from '../components/Navbar/Navbar';

/* Complete list of municipalities in the Province of Cebu */
const cebuMunicipalities = [
  'Alcantara', 'Alcoy', 'Alegria', 'Aloguinsan', 'Argao', 'Asturias',
  'Badian', 'Balamban', 'Bantayan', 'Barili', 'Bogo City', 'Boljoon',
  'Borbon', 'Carcar City', 'Carmen', 'Catmon', 'Cebu City', 'Compostela',
  'Consolacion', 'Cordova', 'Daanbantayan', 'Dalaguete', 'Danao City',
  'Dumanjug', 'Ginatilan', 'Lapu-Lapu City', 'Liloan', 'Madridejos',
  'Malabuyoc', 'Mandaue City', 'Medellin', 'Minglanilla', 'Moalboal',
  'Naga City', 'Oslob', 'Pilar', 'Pinamungajan', 'Poro', 'Ronda',
  'Samboan', 'San Fernando', 'San Francisco', 'San Remigio', 'Santa Fe',
  'Santander', 'Sibonga', 'Sogod', 'Tabogon', 'Tabuelan', 'Talisay City',
  'Toledo City', 'Tuburan', 'Tudela',
];

const STEPS = [
  { id: 1, label: 'Personal Info', icon: User },
  { id: 2, label: 'Application Details', icon: ClipboardList },
  { id: 3, label: 'Documents', icon: Upload },
  { id: 4, label: 'Review', icon: Eye },
];

/* ---------- service-specific fields ---------- */
const serviceFields = {
  'business-permit': [
    { name: 'businessName', label: 'Business Name', type: 'text', placeholder: 'Enter your proposed business name' },
    { name: 'businessType', label: 'Business Type', type: 'select', options: ['Sole Proprietorship', 'Partnership', 'Corporation', 'Cooperative'] },
    { name: 'businessActivity', label: 'Line of Business', type: 'text', placeholder: 'e.g. Retail, Food Services' },
    { name: 'municipality', label: 'Municipality', type: 'select', options: cebuMunicipalities },
    { name: 'businessAddress', label: 'Business Address', type: 'text', placeholder: 'Complete business address within the municipality' },
    { name: 'capitalAmount', label: 'Capitalization (₱)', type: 'text', placeholder: 'e.g. 50000' },
  ],
  'civil-registry-corrections': [
    { name: 'ownerName', label: 'Document Owner Full Name', type: 'text', placeholder: 'e.g. JUAN DE LA CRUZ JR.' },
    { name: 'relationship', label: 'My Relationship to the Owner', type: 'select', options: ['Myself', 'Mother', 'Father', 'Spouse', 'Child', 'Sibling', 'Authorized Representative'] },
    { name: 'documentType', label: 'Document Type', type: 'select', options: ['Birth Certificate', 'Marriage Certificate', 'Death Certificate'] },
    { name: 'correctionType', label: 'Correction Type', type: 'select', options: ['First Name Correction (RA 9048)', 'Spelling/Clerical Error (RA 9048)', 'Gender Correction (RA 10172)', 'Date of Birth Correction (RA 10172)'] },
    { name: 'municipality', label: 'Municipality Registered', type: 'select', options: cebuMunicipalities },
    { name: 'registrationNumber', label: 'Registry Number', type: 'text', placeholder: 'e.g. 2026-1234' },
    { name: 'yearOfRegistration', label: 'Year of Registration', type: 'text', placeholder: 'e.g. 1995' },
    { name: 'exactError', label: 'The Exact Error (Erroneous Entry)', type: 'text', placeholder: 'e.g. My birth month is erroneously listed as July' },
    { name: 'correctFact', label: 'The Correct Fact (Should Be)', type: 'text', placeholder: 'e.g. June' },
    { name: 'supportingDocs', label: 'Supporting Documents I Have', type: 'text', placeholder: 'e.g. Baptismal Certificate, Form 137, SSS records, NBI clearance' },
  ],
};

const requiredDocs = {
  'business-permit': [
    'Valid Government ID',
    'Barangay Clearance',
    'DTI/SEC Registration',
    'Community Tax Certificate (Cedula)',
    'Contract of Lease or Land Title',
  ],
  'civil-registry-corrections': [
    'PSA Copy of Erroneous Document',
    'Valid Government ID of Petitioner',
    'Barangay Clearance of Petitioner',
    'Community Tax Certificate (Cedula)',
    'At least 2 Supporting Documents (Baptismal Certificate, School Records, Voter Profile)',
  ],
};

const generateRefNumber = () => {
  const year = new Date().getFullYear();
  const num = String(Math.floor(10000 + Math.random() * 90000));
  return `KSL-${year}-${num}`;
};

const ApplicationForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');
  const [animating, setAnimating] = useState(false);
  const [activeDraftTab, setActiveDraftTab] = useState('loi');
  const [draftCopied, setDraftCopied] = useState(false);

  const service = serviceInfo[serviceId];
  const fields = serviceFields[serviceId] || [];
  const docs = requiredDocs[serviceId] || [];

  /* --- form state --- */
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    email: '',
    address: '',
  });

  const [serviceDetails, setServiceDetails] = useState(() => {
    const initial = {};
    fields.forEach((f) => (initial[f.name] = ''));
    return initial;
  });

  const [uploadedFiles, setUploadedFiles] = useState(() => {
    const initial = {};
    docs.forEach((_, i) => (initial[i] = null));
    return initial;
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  if (!service) {
    return (
      <div className="apply-page" id="apply-page">
        <Navbar />
        <div className="apply-not-found">
          <h2>Service not found</h2>
          <p>The requested service does not exist.</p>
          <button className="apply-btn apply-btn--primary" onClick={() => navigate('/')}>
            <Home size={16} /> Go Home
          </button>
        </div>
      </div>
    );
  }

  const Icon = service.icon;

  const goNext = () => {
    if (currentStep < 4) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep((s) => s + 1);
        setAnimating(false);
      }, 250);
    }
  };

  const goPrev = () => {
    if (currentStep > 1) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentStep((s) => s - 1);
        setAnimating(false);
      }, 250);
    }
  };

  const handlePersonalChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setServiceDetails({ ...serviceDetails, [e.target.name]: e.target.value });
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFiles({ ...uploadedFiles, [index]: file });
    }
  };

  const removeFile = (index) => {
    setUploadedFiles({ ...uploadedFiles, [index]: null });
  };

  const handleSubmit = () => {
    const ref = generateRefNumber();
    setRefNumber(ref);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isStep1Valid = personalInfo.fullName && personalInfo.dateOfBirth && personalInfo.gender && personalInfo.contactNumber && personalInfo.email && personalInfo.address;
  const isStep2Valid = fields.every((f) => serviceDetails[f.name]);
  const isStep4Valid = agreedToTerms;

  /* ============== SUCCESS SCREEN ============== */
  if (isSubmitted) {
    const today = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const petitionerName = personalInfo.fullName || '[Your Full Name]';
    const petitionerAddress = personalInfo.address || '[Your Complete Address]';
    const ownerName = serviceDetails.ownerName || '[Owner Full Name]';
    const relationship = serviceDetails.relationship || '[Relationship]';
    const docType = serviceDetails.documentType || 'Birth Certificate';
    const municipality = serviceDetails.municipality || 'Cebu City';
    const regNo = serviceDetails.registrationNumber || '[Registry Number]';
    const yearReg = serviceDetails.yearOfRegistration || '[Year of Registration]';
    const exactError = serviceDetails.exactError || '[Exact Error Description]';
    const correctFact = serviceDetails.correctFact || '[Correct Fact]';
    const proofsList = serviceDetails.supportingDocs 
      ? serviceDetails.supportingDocs.split(',').map((doc, idx) => `   ${idx + 1}. ${doc.trim()}`).join('\n') 
      : '   1. Baptismal Certificate\n   2. School Records (Form 137)\n   3. Government-issued IDs';

    const letterOfIntentText = `Date: ${today}

To:
The Local Civil Registrar
Municipality/City of ${municipality}, Cebu

Subject: Letter of Intent - Petition for Correction of Clerical Error under R.A. 9048 / 10172

Dear Local Civil Registrar,

I, ${petitionerName}, of legal age, residing at ${petitionerAddress}, write to formally manifest my intent to file a Petition for Correction of Clerical Error on the ${docType} of ${ownerName}.

My relationship to the owner of the record is "${relationship}".

The document, registered under Registry Number ${regNo} in the year ${yearReg} in the Local Civil Registry of ${municipality}, Cebu, contains the following exact error:

- Erroneous Entry: "${exactError}"
- Correct Fact: "${correctFact}"

In support of this petition, I submit the following proofs:
${proofsList}

Please advise on the next steps for evaluation and formal filing. Thank you very much.

Respectfully yours,

____________________________
${petitionerName}
Petitioner`;

    const petitionText = `REPUBLIC OF THE PHILIPPINES)
PROVINCE OF CEBU           ) S.S.
MUNICIPALITY OF ${municipality.toUpperCase()} )

PETITION FOR CORRECTION OF CLERICAL ERROR IN THE ${docType.toUpperCase()}

I, ${petitionerName}, of legal age, Filipino, and a resident of ${petitionerAddress}, after having been duly sworn in accordance with law, hereby depose and state:

1. That I am the petitioner in this case, and my relationship to the owner of the record is "${relationship}";
2. That the ${docType} of ${ownerName}, which was registered in the Local Civil Registry of ${municipality}, Cebu under Registry Number ${regNo} in the year ${yearReg}, contains a clerical error;
3. That the erroneous entry in the record is: "${exactError}";
4. That the correct entry should be: "${correctFact}";
5. That the error is clerical in nature and was committed due to pure inadvertence;
6. That in support of this petition, I submit the following documents as proof:
${proofsList}
7. That I am filing this petition under the provisions of Republic Act No. 9048 (or R.A. 10172 as applicable).

WHEREFORE, petitioner respectfully prays that the erroneous entry be corrected accordingly.

IN WITNESS WHEREOF, I have hereunto set my hand this _____ day of _______________, 20__ at ${municipality}, Cebu, Philippines.


____________________________
${petitionerName}
Affiant / Petitioner

SUBSCRIBED AND SWORN to before me this _____ day of _______________, 20__ at ${municipality}, Cebu, Philippines.`;

    const handleCopyDraft = (text) => {
      navigator.clipboard.writeText(text);
      setDraftCopied(true);
      setTimeout(() => setDraftCopied(false), 2000);
    };

    return (
      <div className="apply-page" id="apply-page">
        <Navbar />
        <div className="apply-success" id="apply-success">
          <div className="apply-success__icon-wrap">
            <div className="apply-success__icon">
              <CheckCircle2 size={48} />
            </div>
            <div className="apply-success__sparkles">
              <Sparkles size={18} className="sparkle sparkle--1" />
              <Sparkles size={14} className="sparkle sparkle--2" />
              <Sparkles size={16} className="sparkle sparkle--3" />
            </div>
          </div>
          <h2 className="apply-success__title">Application Submitted!</h2>
          <p className="apply-success__subtitle">
            Your <strong>{service.title}</strong> application for <strong>{serviceDetails.municipality || 'your municipality'}</strong> has been received successfully.
          </p>
          <div className="apply-success__ref">
            <span className="apply-success__ref-label">Reference Number</span>
            <span className="apply-success__ref-number">{refNumber}</span>
            <span className="apply-success__ref-hint">Save this number to track your application</span>
          </div>

          {/* Collapsible pre-populated drafts panel for Civil Registry Corrections */}
          {serviceId === 'civil-registry-corrections' && (
            <div className="apply-success__drafts" id="success-drafts-panel">
              <h3 className="apply-success__drafts-title">Generated Legal Drafts</h3>
              <p className="apply-success__drafts-desc">
                Review, copy, and print these documents generated based on your inputs for submission to the Civil Registry.
              </p>

              <div className="apply-success__drafts-tabs">
                <button 
                  className={`apply-success__drafts-tab-btn ${activeDraftTab === 'loi' ? 'apply-success__drafts-tab-btn--active' : ''}`}
                  onClick={() => setActiveDraftTab('loi')}
                >
                  Letter of Intent
                </button>
                <button 
                  className={`apply-success__drafts-tab-btn ${activeDraftTab === 'petition' ? 'apply-success__drafts-tab-btn--active' : ''}`}
                  onClick={() => setActiveDraftTab('petition')}
                >
                  Draft Petition
                </button>
              </div>

              <div className="apply-success__draft-content">
                <button 
                  className="apply-success__draft-copy" 
                  onClick={() => handleCopyDraft(activeDraftTab === 'loi' ? letterOfIntentText : petitionText)}
                >
                  {draftCopied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
                <pre className="apply-success__draft-pre">
                  {activeDraftTab === 'loi' ? letterOfIntentText : petitionText}
                </pre>
              </div>
            </div>
          )}

          <div className="apply-success__timeline-hint">
            <div className="apply-success__timeline-step">
              <div className="apply-success__timeline-dot apply-success__timeline-dot--done" />
              <span>Submitted</span>
            </div>
            <div className="apply-success__timeline-line" />
            <div className="apply-success__timeline-step">
              <div className="apply-success__timeline-dot" />
              <span>Under Review</span>
            </div>
            <div className="apply-success__timeline-line" />
            <div className="apply-success__timeline-step">
              <div className="apply-success__timeline-dot" />
              <span>Processing</span>
            </div>
            <div className="apply-success__timeline-line" />
            <div className="apply-success__timeline-step">
              <div className="apply-success__timeline-dot" />
              <span>Ready</span>
            </div>
          </div>
          <div className="apply-success__actions">
            <button className="apply-btn apply-btn--outline" onClick={() => navigate('/track')} id="track-my-app-btn">
              <Search size={16} /> Track Application
            </button>
            <button className="apply-btn apply-btn--primary" onClick={() => navigate('/')} id="go-home-btn">
              <Home size={16} /> Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ============== MAIN FORM ============== */
  return (
    <div className="apply-page" id="apply-page">
      <Navbar />

      <div className="apply-content">
        {/* --- Header --- */}
        <header className="apply-header" id="apply-header">
          <button className="apply-header__back" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={18} />
          </button>
          <div className="apply-header__service" style={{ background: service.gradient }}>
            <Icon size={20} color="#fff" />
          </div>
          <div className="apply-header__info">
            <h1 className="apply-header__title">{service.title}</h1>
            <p className="apply-header__subtitle">{service.description}</p>
          </div>
        </header>

        {/* --- Progress Steps --- */}
        <div className="apply-progress" id="apply-progress">
          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = step.id === currentStep;
            const isDone = step.id < currentStep;
            return (
              <div key={step.id} className="apply-progress__item-wrap">
                <div
                  className={`apply-progress__item ${isActive ? 'apply-progress__item--active' : ''} ${isDone ? 'apply-progress__item--done' : ''}`}
                >
                  <div className="apply-progress__circle">
                    {isDone ? <Check size={14} /> : <StepIcon size={14} />}
                  </div>
                  <span className="apply-progress__label">{step.label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`apply-progress__connector ${isDone ? 'apply-progress__connector--done' : ''}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* --- Step Content --- */}
        <div className={`apply-step-content ${animating ? 'apply-step-content--animating' : ''}`}>
          {/* STEP 1 */}
          {currentStep === 1 && (
            <div className="apply-step" id="apply-step-1">
              <h2 className="apply-step__title">Personal Information</h2>
              <p className="apply-step__desc">Enter your basic information as it appears on your official documents.</p>
              <div className="apply-form-grid">
                <div className="apply-field">
                  <label className="apply-field__label" htmlFor="fullName">Full Name <span className="apply-field__req">*</span></label>
                  <input type="text" id="fullName" name="fullName" className="apply-field__input" placeholder="Juan A. Dela Cruz" value={personalInfo.fullName} onChange={handlePersonalChange} />
                </div>
                <div className="apply-field">
                  <label className="apply-field__label" htmlFor="dateOfBirth">Date of Birth <span className="apply-field__req">*</span></label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" className="apply-field__input" value={personalInfo.dateOfBirth} onChange={handlePersonalChange} />
                </div>
                <div className="apply-field">
                  <label className="apply-field__label" htmlFor="gender">Gender <span className="apply-field__req">*</span></label>
                  <select id="gender" name="gender" className="apply-field__input" value={personalInfo.gender} onChange={handlePersonalChange}>
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="apply-field">
                  <label className="apply-field__label" htmlFor="contactNumber">Contact Number <span className="apply-field__req">*</span></label>
                  <input type="tel" id="contactNumber" name="contactNumber" className="apply-field__input" placeholder="09XX XXX XXXX" value={personalInfo.contactNumber} onChange={handlePersonalChange} />
                </div>
                <div className="apply-field">
                  <label className="apply-field__label" htmlFor="email">Email Address <span className="apply-field__req">*</span></label>
                  <input type="email" id="email" name="email" className="apply-field__input" placeholder="you@example.com" value={personalInfo.email} onChange={handlePersonalChange} />
                </div>
                <div className="apply-field apply-field--full">
                  <label className="apply-field__label" htmlFor="address">Complete Address <span className="apply-field__req">*</span></label>
                  <input type="text" id="address" name="address" className="apply-field__input" placeholder="House No., Street, Barangay, City, Province" value={personalInfo.address} onChange={handlePersonalChange} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="apply-step" id="apply-step-2">
              <h2 className="apply-step__title">{service.title} Details</h2>
              <p className="apply-step__desc">Provide the specific details required for your {service.title} in the Province of Cebu.</p>
              <div className="apply-form-grid">
                {fields.map((field) => (
                  <div className={`apply-field ${field.name === 'businessAddress' || field.name === 'ownerName' || field.name === 'exactError' || field.name === 'correctFact' || field.name === 'supportingDocs' ? 'apply-field--full' : ''}`} key={field.name}>
                    <label className="apply-field__label" htmlFor={field.name}>
                      {field.label} <span className="apply-field__req">*</span>
                    </label>
                    {field.type === 'select' ? (
                      <select
                        id={field.name}
                        name={field.name}
                        className="apply-field__input"
                        value={serviceDetails[field.name]}
                        onChange={handleServiceChange}
                      >
                        <option value="">Select {field.label.toLowerCase()}</option>
                        {field.options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        id={field.name}
                        name={field.name}
                        className="apply-field__input"
                        placeholder={field.placeholder || ''}
                        value={serviceDetails[field.name]}
                        onChange={handleServiceChange}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="apply-step" id="apply-step-3">
              <h2 className="apply-step__title">Upload Documents</h2>
              <p className="apply-step__desc">Upload clear scanned copies or photos of the required documents.</p>
              <div className="apply-docs-grid">
                {docs.map((docName, index) => (
                  <div className="apply-doc-card" key={index} id={`doc-upload-${index}`}>
                    <div className="apply-doc-card__header">
                      <FileText size={18} />
                      <span className="apply-doc-card__name">{docName}</span>
                    </div>
                    {uploadedFiles[index] ? (
                      <div className="apply-doc-card__uploaded">
                        <div className="apply-doc-card__file-info">
                          <Check size={16} className="apply-doc-card__check" />
                          <span className="apply-doc-card__file-name">{uploadedFiles[index].name}</span>
                        </div>
                        <button className="apply-doc-card__remove" onClick={() => removeFile(index)} aria-label="Remove file">
                          <X size={14} />
                        </button>
                      </div>
                    ) : (
                      <label className="apply-doc-card__upload-zone" htmlFor={`file-${index}`}>
                        <Upload size={22} />
                        <span className="apply-doc-card__upload-text">Click to upload</span>
                        <span className="apply-doc-card__upload-hint">JPG, PNG, or PDF up to 5MB</span>
                        <input
                          type="file"
                          id={`file-${index}`}
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => handleFileChange(index, e)}
                          className="apply-doc-card__file-input"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="apply-step" id="apply-step-4">
              <h2 className="apply-step__title">Review & Submit</h2>
              <p className="apply-step__desc">Please review all the information you've provided before submitting.</p>

              <div className="apply-review-section">
                <h3 className="apply-review-section__title">
                  <User size={16} /> Personal Information
                </h3>
                <div className="apply-review-grid">
                  {Object.entries(personalInfo).map(([key, value]) => (
                    <div className="apply-review-item" key={key}>
                      <span className="apply-review-item__label">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                      <span className="apply-review-item__value">{value || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="apply-review-section">
                <h3 className="apply-review-section__title">
                  <ClipboardList size={16} /> Business Permit Details
                </h3>
                <div className="apply-review-grid">
                  {fields.map((field) => (
                    <div className="apply-review-item" key={field.name}>
                      <span className="apply-review-item__label">{field.label}</span>
                      <span className="apply-review-item__value">{serviceDetails[field.name] || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="apply-review-section">
                <h3 className="apply-review-section__title">
                  <Upload size={16} /> Uploaded Documents
                </h3>
                <div className="apply-review-docs">
                  {docs.map((docName, i) => (
                    <div className="apply-review-doc" key={i}>
                      <FileText size={14} />
                      <span>{docName}</span>
                      {uploadedFiles[i] ? (
                        <span className="apply-review-doc__status apply-review-doc__status--done">
                          <Check size={12} /> Uploaded
                        </span>
                      ) : (
                        <span className="apply-review-doc__status apply-review-doc__status--missing">
                          Not uploaded
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="apply-review-fee">
                <span>Application Fee</span>
                <strong>{service.fee}</strong>
              </div>

              <label className="apply-terms" htmlFor="agree-terms" id="agree-terms-label">
                <input
                  type="checkbox"
                  id="agree-terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="apply-terms__checkbox"
                />
                <span className="apply-terms__text">
                  I certify that all the information provided is true and correct. I understand that any false statements may result in the denial of my application.
                </span>
              </label>
            </div>
          )}
        </div>

        {/* --- Navigation Buttons --- */}
        <div className="apply-nav" id="apply-nav">
          {currentStep > 1 ? (
            <button className="apply-btn apply-btn--outline" onClick={goPrev}>
              <ArrowLeft size={16} /> Previous
            </button>
          ) : (
            <div />
          )}
          {currentStep < 4 ? (
            <button
              className="apply-btn apply-btn--primary"
              onClick={goNext}
              disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
            >
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button
              className="apply-btn apply-btn--submit"
              onClick={handleSubmit}
              disabled={!isStep4Valid}
              id="submit-application-btn"
            >
              <CheckCircle2 size={16} /> Submit Application
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
