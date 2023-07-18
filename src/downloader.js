import { createVcr } from "dom-vcr";
import * as gif from "modern-gif";
import mp4box from "mp4box";
import html2canvas from "html2canvas";

export async function generateDownloadable(duration, type) {
  const divToRecord = document.getElementById("previewElement");
  const numFrames = duration;

  if (type === "canvas") {
    html2canvas(divToRecord).then((canvas) => {
      //   const canvas = document.querySelector("canvas");
      const downloadLink = document.createElement("a");
      downloadLink.setAttribute("download", "your-gif-with-text.gif");
      downloadLink.setAttribute(
        "href",
        canvas.toDataURL("image/gif").replace("image/gif", "image/octet-stream")
      );
      downloadLink.click();
    });
  } else {
    const gifVcr = await createVcr(
      divToRecord,
      type === "gif"
        ? {
            type: "gif",
            gif,
            interval: 25,
          }
        : type === "mp4"
        ? {
            type: "mp4",
            mp4: mp4box,
            interval: 25,
          }
        : {}
    );

    await gifVcr.record(numFrames, { delay: 50 });
    const blob = await gifVcr.render();
    window.open(URL.createObjectURL(blob));
  }
}
