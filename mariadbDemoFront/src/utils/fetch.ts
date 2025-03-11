export async function asyncGet(api: string, params: Record<string, any> = {}) {
    try {
        const queryParams = new URLSearchParams(params).toString();
        const url = `${api}?${queryParams}`;
        console.log("Request URL:", url);

        const res: Response = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log("Response data:", data);

        // 檢查回傳資料是否為陣列，並進行處理
        if (Array.isArray(data)) {
            return data; // 正常情況下，直接返回資料
        } else {
            // 如果資料不是陣列，顯示錯誤
            console.error("預期回傳陣列，但收到:", data);
            return [];
        }
    } catch (error) {
        console.log("Error fetching data:", error);
        return [];
    }
}






export async function asyncPost(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'POST',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
            'content-Type':"application/json"
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers:new Headers({
            'Access-Control-Allow-Origin':"http://localhost:5173/",
        }),
        body: body instanceof FormData?body:JSON.stringify(body),
        mode:"cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}