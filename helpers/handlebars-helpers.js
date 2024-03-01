const dayjs = require("dayjs");
var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
module.exports = {
  relativeTimeFromNow: (a) => dayjs(a).fromNow(),
};
