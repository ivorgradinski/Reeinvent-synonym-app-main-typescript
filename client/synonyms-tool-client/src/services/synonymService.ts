import axios, { AxiosResponse } from 'axios';
import { SYNONYM_API } from '../api/apiConfig';
import { ADD_SYNONYM, SEARCH_SYNONYM } from '../constants/routes';
import { toast } from 'react-toastify';

export const addSynonym = async (word: string, synonyms: string[]): Promise<{ message: string }> => {
    try {
        const response: AxiosResponse<{ message: string }> = await axios.post(`${SYNONYM_API}${ADD_SYNONYM}`, { word, synonyms });
        toast.success('Synonym added successfully!');
        return response.data;
    } catch (error: any) {
        toast.error('Failed to add synonym.');
        throw error;
    }
};

export const searchSynonyms = async (word: string): Promise<{ synonyms: string[] }> => {
    try {
        const response: AxiosResponse<{ synonyms: string[] }> = await axios.get(`${SYNONYM_API}${SEARCH_SYNONYM}/${word}`);
        toast.success('Synonyms found!');
        return response.data;
    } catch (error: any) {
        toast.error('No synonyms found.');
        throw error;
    }
};
