"use strict";

module.exports = function (str) {
  return str.replace(/^\w/, function (c) {
    return c.toUpperCase();
  });
};