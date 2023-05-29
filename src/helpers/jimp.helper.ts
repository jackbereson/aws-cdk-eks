import path from "path";
import Jimp from "jimp";
import QrCode from "qrcode";
import { CacheHelper } from "./cache.helper";
export class JimpHelper {
  static getImage(path: string, cache = true) {
    return new Promise((resolve, reject) => {
      resolve(CacheHelper.get(path));
    })
      .then(async (image: any) => {
        if (!image) {
          let jimp = await Jimp.read(path);
          if (cache) CacheHelper.set(path, jimp);
          return jimp.clone();
        } else return image.clone();
      })
      .catch((err) => {
        return null;
      });
  }
  static measureText(font: any, text: string) {
    var x = 0;
    for (var i = 0; i < text.length; i++) {
      if (font.chars[text[i]]) {
        x +=
          font.chars[text[i]].xoffset +
          (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]]
            ? font.kernings[text[i]][text[i + 1]]
            : 0) +
          (font.chars[text[i]].xadvance || 0);
      }
    }
    return x;
  }
  static getQRImage(content: string) {
    return QrCode.toDataURL(content, { width: 500 }).then((dataUri: string) => {
      return Jimp.read(Buffer.from(dataUri.replace(/^data:image\/png;base64,/, ""), "base64"));
    });
  }
}
