import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en',
  timeout: 10000,
});

export const searchWord = async (word) => {
  const { data } = await api.get(`/${word.toLowerCase()}`);
  return data[0];
};
