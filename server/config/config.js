const config = (function () {
  const _conf = {
    recordMode: true,
  };

  const get = (key) => {
    return _conf[key];
  };

  const set = (key, value) => {
    _conf[key] = value;
  };

  const getAll = () => {
    return _conf;
  };

  return {
    get,
    set,
    getAll,
  };
})();

exports.conf = config;
