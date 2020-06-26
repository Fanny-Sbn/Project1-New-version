export function pageLoader(filename, callback) {
// get post put delete options...
    axios
      .get(filename)
      .then((response) => {
        const html = response.data;
        callback(html);
      })
      .catch((err) => {
        console.error(err);
      });
  }