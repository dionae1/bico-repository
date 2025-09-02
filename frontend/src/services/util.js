function capitalize(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatPhoneNumber(phone) {
    if (!phone) return "";
    return `(${phone.slice(0, 2)}) ${phone[2]} ${phone.slice(3, 7)}-${phone.slice(7)}`;
}

export { capitalize, formatPhoneNumber };