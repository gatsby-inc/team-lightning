import fetch from "node-fetch";
import Jimp from "jimp";

const url =
  process.env.NODE_ENV === "production"
    ? "https://teamlightning.gatsbyjs.io/gatsby-release.png"
    : "http://localhost:8000/gatsby-release.png";

export default async function socialCard(req, res) {
  const imageRes = await fetch(url);
  const imageBuffer = await imageRes.buffer();

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
  const font = Jimp.loadFont(Jimp.FONT_SANS_10_BLACK);

  // open a file called "template.png"
  const image = await Jimp.read(imageBuffer);
  // image.print(font, 100, 176, "hello", 618);
  // image.
  // res.send;
  // }

  // image.write(res);
  res.setHeader("Content-Type", "image/png");
  res.status(200).send(await image.getBufferAsync(Jimp.MIME_PNG));
  // transformImage({ firstname: "Kyle", lastname: "Gill", number: 6999})
}
