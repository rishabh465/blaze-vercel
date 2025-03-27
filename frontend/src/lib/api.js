export const api = {
    async fetch(endpoint, options = {}) {
        try {
            const response = await fetch(endpoint, {
                ...options,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
            });

            // First check if the response is ok
            if (!response.ok) {
                // Try to parse as JSON first
                try {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Something went wrong');
                } catch (e) {
                    // If JSON parsing fails, get the text response
                    const textError = await response.text();
                    throw new Error(textError || 'Something went wrong');
                }
            }

            // For successful responses, try to parse as JSON
            try {
                return await response.json();
            } catch (e) {
                // If JSON parsing fails, return the text response
                return await response.text();
            }
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }
}; 