const { getDataUrl, getDecodedData } = require("../helpers/qrcode");
const { web3, contract } = require("../helpers/web3");

exports.addProduct = (req, res) => {
  var prodname = req.body.productName;
  var username = req.user.name;
  var email = req.user.email;
  var details =
    prodname + "<br>Registered By: " + username + "<br>Contact: " + email;

  var today = new Date();
  var thisdate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  web3.eth.getAccounts().then(async function (accounts) {
    var receipt = await contract.methods
      .newItem(details, thisdate)
      .send({ from: accounts[0], gas: 1000000 });
    // .then(receipt => {
    //     var msg="<h5 style='color: #53D769'><b>Item Added Successfully</b></h5><p>Product ID: "+receipt.events.Added.returnValues[0]+"</p>";
    //     qr.value = receipt.events.Added.returnValues[0];
    //     $bottom="<p style='color: #FECB2E'> You may print the QR Code if required </p>"
    //     $("#alertText").html(msg);
    //     $("#qrious").show();
    //     $("#bottomText").html($bottom);
    //     $(".customalert").show("fast","linear");
    // })
    console.log(__dirname);
    var url = await getDataUrl(receipt.events.Added.returnValues[0]);
    return res.send(url);
  });
};

exports.getProduct = async (req, res) => {
  var prodId = req.body.productId;

  if (req.file && !prodId) {
    prodId = await getDecodedData(new Buffer.from(req.file.buffer, "base64"));
  }

  contract.methods.searchProduct(prodId).call(function (err, result) {
    if (err) res.send({ msg: "No product found!!" });
    return res.send({ msg: result });
  });
};
