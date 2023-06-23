function createButton() {
  const inputEL = document.createElement("INPUT");
  inputEL.setAttribute("type", "file");
  inputEL.setAttribute("name", "receipt_image");
  // JPEGのみ
  inputEL.setAttribute("accept", "image/jpeg,image/jpg");
  // 背面カメラを起動する
  inputEL.setAttribute("capture", "environment");
  inputEL.addEventListener(
    "input",
    (e) => {
      const currentTarget = e.currentTarget;
      log(`currentTarget: ${currentTarget}`);
      const files = currentTarget.files;
      log(`files: ${files}`);
      // ファイルが1枚選択された場合のみ、処理を続行する
      if (files.length !== 1) {
        log(`file length: ${files.length}`);
        return false;
      }
      const file = files[0];

      // サンプル処理: bodyのいちばん下にimageを作成してねじ込む
      function convertImageToDataURL(imageFile) {
        log("convertImageToDataURL");
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            log("create dataURL finished");
            resolve(`${reader.result}`);
          };
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
      }

      return convertImageToDataURL(file).then((dataURL) => {
        const imgEL = document.createElement("IMG");
        log("image EL created");
        imgEL.src = dataURL;
        log("image src set");
        document.body.appendChild(imgEL);
        log("append done!");
      });
      // サンプル処理ここまで
    },
    false
  );

  return inputEL;
}

function log(m) {
  const logEL = document.getElementById("log");
  logEL.textContent += `${m}\n`;
}

document.addEventListener("DOMContentLoaded", () => {
  const inputEL = createButton();

  const appEL = document.getElementById("app");
  appEL.appendChild(inputEL);

}, false);