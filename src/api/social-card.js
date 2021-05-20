import fetch from "node-fetch";
import Jimp from "jimp";
import * as yup from "yup";

const schema = yup.object().shape({
  text: yup.string().required(),
  format: yup.string().required(),
});

const LANDSCAPE_FORMAT = {
  background: "landcape-template.png",
  font: "Inter-ExtraBold.ttf.fnt",
  textY: 380,
};

const SQUARE_FORMAT = {
  background: "square-template.png",
  font: "Inter-ExtraBold.ttf.fnt",
  textY: 780,
};

const HOST =
  process.env.NODE_ENV === "production"
    ? process.env.PRODUCTION_HOST
      ? process.env.PRODUCTION_HOST
      : "https://teamlightning.gatsbyjs.io/"
    : "http://localhost:8000/";

export default async function socialCard(req, res) {
  try {
    const { text, format } = await schema.validate(req.query);

    let options;
    if (format === `landscape`) {
      options = LANDSCAPE_FORMAT;
    } else if (format === `square`) {
      options = SQUARE_FORMAT;
    }

    const font = await Jimp.loadFont(`${HOST}${options.font}`);

    const imageRes = await fetch(`${HOST}${options.background}`);
    const imageBuffer = await imageRes.buffer();

    let modifiedImage = await Jimp.read(imageBuffer);

    const imageDimensions = [
      modifiedImage.getWidth(),
      modifiedImage.getHeight(),
    ];
    const textDimensions = [
      Jimp.measureText(font, text),
      Jimp.measureTextHeight(font, text),
    ];

    modifiedImage.print(
      font,
      imageDimensions[0] / 2 - textDimensions[0] / 2,
      // This is approximate
      options.textY,
      text
    );

    return res
      .header("Content-Type", "image/png")
      .status(200)
      .send(await modifiedImage.getBufferAsync(Jimp.MIME_PNG));
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      message: e.message,
      stack: e.stack,
    });
  }
}
