// Easily switch between deployment and local environment by changing one variable
export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
export const SYNONYM_API = `${BASE_URL}/api/synonyms`;
