export const handlePreview = () => {
    const preview = document.querySelector(".preview-image");
    if (preview) {
        const inputImg = document.querySelector("[data-upload-image-input]");
        const closePreview = preview.querySelector("[data-upload-image-close]");
        const imgPreview = preview.querySelector("[data-upload-image-preview]");
        if(!imgPreview.src){
            closePreview && closePreview.classList.add("hidden");
            preview.style.display = "none";
        }
        if(closePreview){
            closePreview.addEventListener("click", () => {
                imgPreview.src = "";
                closePreview && closePreview.classList.add("hidden");
                preview.style.display = "none";
            })
        }
        inputImg.addEventListener("change", (e) => {
            const [file] = e.target.files;
            imgPreview.src = URL.createObjectURL(file);
            closePreview && closePreview.classList.remove("hidden");
            preview.style.display = "block";
        })
    }
}