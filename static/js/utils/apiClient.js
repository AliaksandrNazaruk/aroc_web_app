(function(global) {
    async function postJson(url, payload) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
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
    async function getJson(url) {
        const response = await fetch(url);
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
    global.apiClient = { postJson, getJson };
})(this);

