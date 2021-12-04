var QRCode = require("qrcode");
var Jimp = require("jimp");
var fs = require("fs");
var QrCode = require("qrcode-reader");

exports.getDataUrl = (data) => {
  return QRCode.toDataURL(data);
};

exports.getDecodedData = async (buffer) => {
  let image = await Jimp.read(buffer);
  let qrcode = new QrCode();
  const value = await new Promise((resolve, reject) => {
    qrcode.callback = (err, v) => (err != null ? reject(err) : resolve(v));
    qrcode.decode(image.bitmap);
  });
  return value.result;
};
