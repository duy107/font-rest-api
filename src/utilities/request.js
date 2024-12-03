// const api = "https://back-rest-api.up.railway.app/";
// const api = "https://demo-rest-api.up.railway.app/";
const api = "http://localhost:4000/";
export const get = async (path) => {
    const res = await fetch(`${api}${path}`, { credentials: "include"});
    const data = await res.json();
    return data;
}

export const post = async (path, newData) => {
    const isFormData = newData instanceof FormData;
    const res = await fetch(`${api}${path}`, {
        method: "POST",
        credentials: "include",
        headers: isFormData ? undefined : {
            "Content-Type": "application/json",
        },
        body: isFormData ? newData : JSON.stringify(newData)
    });
    const data = await res.json();
    return data;
}


export const del = async (path, id) => {
    const res = await fetch(`${api}${path}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id)
    });
    const data = await res.json();
    return { status: res.status, data };
}

export const patch = async (path, item) => {
    const iObject = item instanceof FormData;
    const res = await fetch(`${api}${path}`, {
        method: "PATCH",
        headers: iObject ? undefined : {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: iObject ? item : JSON.stringify(item)
    });
    const data = await res.json();
    return data;
}
export const put = async (path, item) => {
    const res = await fetch(`${api}${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    });
    const data = await res.json();
    return data;
}

export const sort = async (path, option) => {
    const res = await fetch(`${api}${path}?_sort=${option}`);
    const data = await res.json();
    return data;
}

export const getHeader = async (path, option) => {
    const res = await fetch(`${api}${path}`, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${option}`
        },
        credentials: "include"
    });
    const data = await res.json();
    return data;
}