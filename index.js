const uploadbox = document.querySelector(".upload-box"),
    previewimg = uploadbox.querySelector("img"),
    fileinput = uploadbox.querySelector("input"),
    widthinput = document.querySelector(".width input"),
    ratioinput = document.querySelector(".ratio input"),
    downloadbtn = document.querySelector(".download-btn"),
    qualityinput = document.querySelector(".quality input"),
    heightinput = document.querySelector(".height input");

let ogimageratio;
const loadfile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewimg.src = URL.createObjectURL(file);
    previewimg.addEventListener("load", () => {
        widthinput.value = previewimg.naturalWidth;
        heightinput.value = previewimg.naturalHeight;
        ogimageratio = previewimg.naturalWidth / previewimg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
    console.log(file)
}
widthinput.addEventListener("keyup", () => {
    const height = ratioinput.checked ? widthinput.value / ogimageratio : heightinput.value;
    heightinput.value = Math.floor(height);
});
heightinput.addEventListener("keyup", () => {
    const width = ratioinput.checked ? heightinput.value * ogimageratio : widthinput.value;
    widthinput.value = Math.floor(width);
});
const resizeanddownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");
    const imgquality = qualityinput.checked ? 0.7 : 1.0;
    canvas.width = widthinput.value;
    canvas.height = heightinput.value;
    ctx.drawImage(previewimg, 0, 0, canvas.width, canvas.height);
    a.href = canvas.toDataURL("image/jpeg", imgquality);
    a.download = new Date().getTime();
    a.click();

}


downloadbtn.addEventListener("click", resizeanddownload);
fileinput.addEventListener("change", loadfile);
uploadbox.addEventListener("click", () => fileinput.click());