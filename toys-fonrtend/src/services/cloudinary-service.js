


async function uploadImg(ev) {
    const CLOUD_NAME = 'dtxgoca7h'
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

    const formData = new FormData();
    formData.append('file', ev.target.files[0])
    formData.append('upload_preset', 'pqeqzkww');
    
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: formData
        })
        const data = await res.json()
        return data.url;
    }
    catch (err) {
        console.error(err)
    }
    // return fetch(UPLOAD_URL, {
    //     method: 'POST',
    //     body: formData
    // })
    //     .then(res => res.json())
    //     .then(res => {
    //         res.url
    //         // const elImg = document.createElement('img');
    //         // elImg.src = res.url;
    //         // document.body.append(elImg);
    //     })
    //     .catch(err => console.error(err))
}

export const cloudService = {
    uploadImg
}