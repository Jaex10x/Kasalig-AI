
const API_BASE = 'http://localhost:8080/api';

async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
        ...options,
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || `API error: ${response.status}`);
        }
        
        return data;
    } catch (error) {
        if (error.message === 'Failed to fetch') {
            throw new Error('Cannot connect to server. Make sure the Spring Boot backend is running on port 8080.');
        }
        throw error;
    }
}

/* Auth is handled entirely by Supabase — no passwords are ever sent to the custom backend */

export async function apiGetProfile(userId) {
    return apiRequest(`/auth/me/${userId}`);
}

export async function apiUpdateProfile(userId, updates) {
    return apiRequest(`/auth/me/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
}


export async function apiGetApplications(userId) {
    return apiRequest(`/applications?userId=${userId}`);
}

export async function apiGetApplication(appId) {
    return apiRequest(`/applications/${appId}`);
}

export async function apiGetChatHistory(userId) {
    return apiRequest(`/chat/${userId}`);
}

export async function apiSaveChatMessage(userId, sender, content) {
    return apiRequest('/chat', {
        method: 'POST',
        body: JSON.stringify({ userId, sender, content }),
    });
}

/* Syncs user identity (id, name, email) to backend — never sends passwords */
export async function apiSyncUser(supabaseAuthId, fullName, email) {
    return apiRequest('/auth/sync', {
        method: 'POST',
        body: JSON.stringify({ supabaseAuthId, fullName, email }),
    });
}
