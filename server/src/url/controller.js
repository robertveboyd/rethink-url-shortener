import Url from "./model.js";
import { encodeUrl } from "./helpers.js";

const getShortUrl = (req, res) => {
  const { longUrl } = req.query;
  Url.findOne({ long: longUrl }).then((result) => {
    if (result) return res.send(result.short);
    else {
      Url.count({})
        .exec()
        .then((count) => {
          const id = count + 1;
          const short = encodeUrl(id);
          console.log(short);
          Url.create({
            short,
            long: longUrl,
            seq_id: id,
          });
          return res.send(short);
        });
    }
  });
};

const getUrls = (req, res) => {
  Url.find({}, null, {
    limit: 5,
    sort: {
      seq_id: -1,
    },
  }).then((results) =>
    res.send(
      results.map((result) => ({ short: result.short, long: result.long }))
    )
  );
};

const deleteUrls = (req, res) => {
  Url.remove({}).then(() => res.send("urls deleted"));
};

export default { getShortUrl, getUrls, deleteUrls };
