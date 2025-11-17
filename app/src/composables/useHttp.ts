import { ref } from 'vue';

const API_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestOptions {
    endpoint: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: HeadersInit;
}

export function useHttp() {
    const isLoading = ref<boolean>(false);
    const error = ref<string | null>(null);

    const request = async <T>({
                                  endpoint,
                                  method = 'GET',
                                  body = null,
                                  headers = { 'Content-Type': 'application/json' },
                              }: RequestOptions): Promise<T> => {
        isLoading.value = true;
        error.value = null;

        try {
            const url = ${API_URL}${endpoint};
            const options: RequestInit = { method, headers, credentials: 'include' };
            if (body) options.body = JSON.stringify(body);

            const response = await fetch(url, options);
            if (!response.ok && response.status !== 401 && response.status !== 404) {
                throw new Error(Something went wrong: ${url}, status: ${response.status});
            }

            const data = await response.json();
            return data;
        } catch (e: any) {
            error.value = e.message;
            throw e;
        } finally {
            isLoading.value = false;
        }
    };

    return { request, isLoading, error };
}