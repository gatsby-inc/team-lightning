import * as yup from "yup";
import * as archiver from "archiver";
import fetch from "node-fetch";

import getHost from "../lib/get-host";

const schema = yup.object().shape({
  text: yup.string().required(),
});

const HOST = getHost();

export default async function Bundle(req, res) {
  const body = await schema.validate(req.query);

  const files = await Promise.all(
    ["square", "landscape"].map((format) =>
      fetch(`${HOST}/api/social-card?text=${body.text}&format=${format}`)
        .then((res) => res.buffer())
        .then((buffer) => [`${format}.png`, buffer])
    )
  );

  const buffer = await new Promise(async (resolve, reject) => {
    const archive = archiver("zip", {
      zlib: { level: 9 },
    });
    let responses = [];

    for (let [name, buff] of files) {
      archive.append(buff, { name });
    }

    archive.finalize();

    archive.on("error", reject);
    archive.on("data", (data) => responses.push(data));
    archive.on("end", () => {
      resolve(Buffer.concat(responses));
    });
  });

  return res
    .set({
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=assets.zip",
    })
    .status(200)
    .send(buffer);
}
