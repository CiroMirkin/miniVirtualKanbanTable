export function generateID() {
    return Date.now().toString(35) + Math.random().toString(36).slice(2)
};