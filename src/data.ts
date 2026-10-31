// Fill these in to show the social buttons. Empty strings are hidden.
export const LINKS = { linkedin: '', github: '' }
export const EMAIL = 'tejusverma032@gmail.com'
export const PHONE = '+91 9795356257'
export const ROLES = ['Software Developer', 'Python Developer', 'AI & ML Enthusiast']
export const SKILLS: Record<string, string[]> = {
  'Programming languages': ['Python', 'Java', 'C', 'C++'],
  'Web development': ['HTML', 'CSS', 'JavaScript'],
  'AI & machine learning': ['Machine Learning', 'Data Analysis', 'Predictive Modelling', 'NLP'],
  'Python libraries': ['Pandas', 'NumPy', 'Scikit-learn'],
  'Core computer science': ['DSA', 'OOP', 'DBMS', 'Problem Solving'],
  'Development tools': ['Git', 'GitHub', 'VS Code', 'Streamlit', 'Microsoft Office'],
}
export interface Project { name: string; tech: string; desc: string; problem: string; role: string; stat?: string; github?: string; live?: string }
export const PROJECTS: Project[] = [
  { name: 'Customer Churn Prediction', tech: 'Python, Pandas, NumPy, Scikit-learn', desc: 'Built a machine learning pipeline on telecom customer data using Logistic Regression.', problem: 'Predicts which customers are likely to leave, so a business can act earlier.', role: 'Data preprocessing, exploratory analysis, model training and evaluation.', stat: '74.2% accuracy · 0.841 ROC-AUC' },
  { name: 'Billing software for SD Wellers', tech: 'Software development', desc: 'Billing software supporting billing operations and transaction management.', problem: 'Handles day-to-day billing and transaction records for the client.', role: 'Developed the software during the Thiranex EduTech internship.' },
  { name: 'E-commerce and portfolio websites', tech: 'HTML, CSS, JavaScript', desc: 'Web applications with a responsive structure, user interface and functionality.', problem: 'Gives businesses and individuals a presentable web presence.', role: 'Built the interface and site functionality.' },
  { name: 'Jarvis AI Assistant', tech: 'Python', desc: 'A voice-interactive virtual assistant.', problem: 'Lets users run tasks by speaking instead of typing.', role: 'Built as a software development project.' },
  { name: 'Bank management and smart attendance systems', tech: 'Software development', desc: 'Applications for account management, transaction handling and digital attendance tracking.', problem: 'Replaces manual record-keeping for accounts and attendance.', role: 'Developed both applications.' },
]
export const CERTS: [string, string][] = [
  ['Generative AI Professional', 'Oracle Cloud Infrastructure'], ['Artificial Intelligence Course', 'NASSCOM'],
  ['Fundamental AI Concepts', 'Microsoft'], ['Python Programming', 'Grant Thornton Bharat'],
  ['C Programming (Spoken Tutorial)', 'IIT Bombay'], ['Advanced C++ Training', 'IIT Bombay / EduPyramids'],
  ['Internet of Things: Concepts to Deployment', 'IIT Roorkee'], ['Technology Software Development Job Simulation', 'Citi'],
  ['Cyber Job Simulation', 'Deloitte'],
]
