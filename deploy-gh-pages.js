const ghpages = require('gh-pages');

ghpages.publish('dist', (err) => {
  if (err) {
    throw Error(err);
  } else {
    console.info('Deployed to gh-pages!');
  }
})