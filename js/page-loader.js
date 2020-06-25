export function pageLoader(filename, callback) {

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