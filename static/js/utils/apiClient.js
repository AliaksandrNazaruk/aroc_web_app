(function(global) {
    'use strict';

    async function fetchJson(url, options = {}) {
        const response = await fetch(url, options);
        let data = null;
        try {
            data = await response.json();
        } catch (e) {
            throw new Error('Invalid JSON response');
        }

        if (!response.ok) {
            const message = data && (data.error || data.detail || response.statusText);
            throw new Error(message || 'Request failed');
        }

        return data;
    }

    const postJson = (url, payload) =>
        fetchJson(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

    const getJson = url => fetchJson(url);

    global.apiClient = { postJson, getJson, fetchJson };
})(this);

