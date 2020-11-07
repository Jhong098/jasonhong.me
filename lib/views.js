const views = async () => {
  const firebase = (await import('firebase/app')).default;
  await import('firebase/database');

  try {
    firebase.initializeApp({
      databaseURL: 'https://websiteviews-9ea8e.firebaseio.com'
    });
  } catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
      // eslint-disable-next-line no-console
      console.error('Firebase initialization error', error.stack);
    }
  }

  return firebase.database().ref('views');
};

export default views;
