export const setCookie: (key: string, value: string, days: number) => void
    = (key, value, days) => {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = key + "=" + (value || "") + expires + "; path=/";
}

export const getCookie: (key: string) => string
    = (key: string) => {
    let nameEQ = key + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export const eraseCookie: (key: string) => void
    = (key: string) => {
    document.cookie = key + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}