import fetch from "node-fetch";
import Jimp from "jimp";

const url =
  process.env.NODE_ENV === "production"
    ? "https://teamlightning.gatsbyjs.io/gatsby-release.png"
    : "http://localhost:8000/gatsby-release.png";

export default async function socialCard(req, res) {
  const { text = "YOUR TEXT" } = req.query;
  const imageRes = await fetch(url);
  const imageBuffer = await imageRes.buffer();
  // const fontRes = await fetch(
  //   "https://raw.githubusercontent.com/oliver-moran/jimp/master/packages/plugin-print/fonts/open-sans/open-sans-10-black/open-sans-10-black.fnt"
  // );
  // const fontBuffer = await fontRes.buffer();
  // console.log({ fontBuffer });
  // load font converted from from https://ttf2fnt.com/
  // we might get around having to provide bespoke font files per font color,
  // @see https://github.com/oliver-moran/jimp/issues/537#issuecomment-533831077 ff.
  //
  // const whiteFont = await Jimp.loadFont(`font/white/Inter-Black.ttf.fnt`)
  // const purpleFont = await Jimp.loadFont(`font/purple/Inter-Black.ttf.fnt`)
  // const name = `${firstname} ${lastname}`
  // const idFont = await Jimp.loadFont(`font/Inter-700-16px/Inter-Bold.ttf.fnt`)
  // const nameFont = await Jimp.loadFont(`font/Inter-ExtraBold-56e/Inter-ExtraBold-56e.fnt`)
  // these fonts can't have their size or color changed programmatically
  // you have to convert an entirely new font into a .fnt
  const font = await Jimp.loadFont(
    "https://raw.githubusercontent.com/oliver-moran/jimp/master/packages/plugin-print/fonts/open-sans/open-sans-128-black/open-sans-128-black.fnt"
  );

  // open a file called "template.png"
  const image = await Jimp.read(imageBuffer);

  const [width, height] = [
    Jimp.measureText(font, text),
    Jimp.measureTextHeight(font, text),
  ];

  // fontFile, x coord, y coord, text, maxWidth
  image.print(
    font,
    image.getWidth() / 2 - width / 2,
    image.getHeight() / 2 - height / 2,
    text
  );

  return res
    .header("Content-Type", "image.png")
    .status(200)
    .send(await image.getBufferAsync(Jimp.MIME_PNG));
}
