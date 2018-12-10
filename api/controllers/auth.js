exports.authorize = async (req, res, next) => {
  if (process.env.BYPASS === 'true') return next();
  const key = req.headers['x-api-key'];
  if (!key) return res.status(403).send({ success: false, message: 'No key provided' });
  return next();
};
