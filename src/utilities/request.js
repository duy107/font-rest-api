// const api = "http://localhost:3002/";
const api = "https://demo-react-tawny.vercel.app/";
export const get = async (path) => {
    const res = await fetch(`${api}${path}`);
    const data = await res.json();
    return data;
}

export const post = async (path ,newData) =>{
    const res = await fetch(`${api}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newData)
    });
    const data = await res.json();
    return data;
}


export const del = async (path) => {
    const res = await fetch(`${api}${path}`, {
        method: "DELETE"
    });
    const data = await res.json();
    return data;
}

export const patch = async (path, item) => {
    const res = await fetch(`${api}${path}`, {
        method: "PATCH",
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