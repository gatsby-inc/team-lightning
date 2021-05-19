import fetch from "node-fetch";
import Jimp from "jimp";
import * as yup from 'yup'

const schema = yup.object().shape({
  image: yup.string().required(),
  text: yup.array().of(yup.object().shape({
    x: yup.number(),
    y: yup.number(),
    center: yup.bool(),
    value: yup.string().required(),
    font: yup.number().required()
  })).min(1),
  type: yup.string().default(Jimp.MIME_PNG)
})

const positionText = (textObj, image, font) => {
  const [width, height] = [Jimp.measureText, Jimp.measureTextHeight].map(method => method.bind(Jimp)(font, textObj.value))

  return image.print(
    font,
    textObj.center ? (image.getWidth() / 2) - (width / 2) : x,
    textObj.center ? (image.getHeight() / 2) - (height / 2) : y,
  )
} 

export default async function socialCard(req, res) {
  try {
    const { image, text = [], type } = await schema.validate(req.query || req.body)
    const imageRes = await fetch(image);
    const imageBuffer = await imageRes.buffer();

    const font = await Jimp.loadFont(
      "https://raw.githubusercontent.com/oliver-moran/jimp/master/packages/plugin-print/fonts/open-sans/open-sans-128-black/open-sans-128-black.fnt"
    );
  
    let modifiedImage = await Jimp.read(imageBuffer);
    const sample = [
      {
        value: 'v3.5',
        center: true
      }
    ]

    

    modifiedImage.print(
      font,
      textObj.center ? (image.getWidth() / 2) - (width / 2) : x,
      textObj.center ? (image.getHeight() / 2) - (height / 2) : y,
    )
  
    // for (let block of sample) {
    //   modifiedImage = positionText(block, modifiedImage, font)
    // }
  
    return res
      .header("Content-Type", "image/png")
      .status(200)
      .send(await modifiedImage.getBufferAsync(type));
  } catch (e) {
    // TODO: better fallback? Fallback to just image? etc.
    return res.status(500).json({
      message: e.message,
      stack: e.stack
    })
  }
}
