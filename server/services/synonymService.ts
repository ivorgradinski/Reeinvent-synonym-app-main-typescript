import { Mutex } from 'async-mutex';

// Mutex for thread-safe operations
const synonymMutex = new Mutex();

interface SynonymMap {
    [key: string]: Set<string>;
}

let synonymMap: SynonymMap = {};

// Function to add a pair of synonyms
function addPair(word1: string, word2: string): void {
    if (!synonymMap[word1]) {
        synonymMap[word1] = new Set();
    }
    synonymMap[word1].add(word2);
}

// DFS algorithm for finding all synonyms
function findAllSynonymsIterative(word: string): Set<string> {
    const visited = new Set<string>();
    const stack: string[] = [word];

    while (stack.length > 0) {
        const currentWord = stack.pop();
        if (currentWord && !visited.has(currentWord)) {
            visited.add(currentWord);

            if (synonymMap[currentWord]) {
                synonymMap[currentWord].forEach((syn) => {
                    if (!visited.has(syn)) {
                        stack.push(syn);
                    }
                });
            }
        }
    }

    return visited;
}

export const addSynonym = async (word: string, synonyms: string[]): Promise<void> => {
    await synonymMutex.runExclusive(async () => {
        synonyms.forEach((syn) => {
            addPair(word, syn);
            addPair(syn, word);
        });

        const allRelatedWords = findAllSynonymsIterative(word);

        allRelatedWords.forEach((w1) => {
            allRelatedWords.forEach((w2) => {
                if (w1 !== w2) {
                    addPair(w1, w2);
                    addPair(w2, w1);
                }
            });
        });
    });
};

export const getSynonyms = (word: string): string[] | null => {
    if (!synonymMap[word]) return null;
    return Array.from(synonymMap[word]);
};

export const clearSynonyms = (): void => {
    synonymMutex.runExclusive(() => {
        synonymMap = {};
    });
};

export default {
    addSynonym,
    getSynonyms,
    clearSynonyms,
};
