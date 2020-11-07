import db from 'lib/firebase';

export default (req, res) => {
  if (!req.query.id) {
    return db.ref('views').once('value', (snapshot) => {
      const views = snapshot.val();
      const allViews = views
        ? Object.values(views).reduce((total, value) => total + value)
        : 0;

      return res.status(200).json({
        total: allViews
      });
    });
  }

  const ref = db.ref('views').child(req.query.id);

  return ref.once('value', (snapshot) => {
    res.status(200).json({
      total: snapshot.val()
    });
  });
};
