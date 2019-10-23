let assert = require('assert');
const SocialSelectors = (require('../../../module/index.js'));

let instagram = new SocialSelectors();
let twitter = new SocialSelectors();
let soundcloud = new SocialSelectors();
let google = new SocialSelectors();
let test = new SocialSelectors();

before(async function() {
  await instagram.load({
    library: 'instagram', // The social media site you want to load
    location: 'local', // Load the local library or hosted library (local | hosted).
  })
  await twitter.load({
    library: 'twitter', // The social media site you want to load
    location: 'local', // Load the local library or hosted library (local | hosted).
  })
  // await soundcloud.load({
  //   library: 'soundcloud', // The social media site you want to load
  //   location: 'local', // Load the local library or hosted library (local | hosted).
  // })
  await google.load({
    library: 'google', // The social media site you want to load
    location: 'local', // Load the local library or hosted library (local | hosted).
  })
  await test.load({
    library: 'test', // The social media site you want to load
    location: 'local', // Load the local library or hosted library (local | hosted).
  })

});

describe('SocialSelectors - Instagram',  function() {
  describe('regex', function() {
    let url_fail_1 = ''
    let url_fail_2 = 'not a url'

    let url_home_1 = 'http://www.instagram.com'
    let url_home_2 = 'http://www.instagram.com/'
    let url_home_3 = 'http://www.instagram.com/?'
    let url_home_4 = 'http://www.instagram.com?'
    let url_home_5 = 'http://www.instagram.com/?param1=foo'
    let url_home_6 = 'http://www.instagram.com#top'
    let url_home_7 = 'http://www.instagram.com/#top'

    let url_post_1 = 'http://www.instagram.com/p/1234567890'
    let url_post_2 = 'http://www.instagram.com/p/1234567890/'
    let url_post_3 = 'http://www.instagram.com/p/1234567890/?'
    let url_post_4 = 'http://www.instagram.com/p/1234567890?'
    let url_post_5 = 'http://www.instagram.com/p/1234567890/?param1=foo'
    let url_post_6 = 'http://www.instagram.com/p/1234567890#top'
    let url_post_7 = 'http://www.instagram.com/p/1234567890/#top'

    let url_search_1 = 'http://www.instagram.com/explore/tags/cat'
    let url_search_2 = 'http://www.instagram.com/explore/tags/cat/'
    let url_search_3 = 'http://www.instagram.com/explore/tags/cat/?'
    let url_search_4 = 'http://www.instagram.com/explore/tags/cat?'
    let url_search_5 = 'http://www.instagram.com/explore/tags/cat/?param1=foo'
    let url_search_6 = 'http://www.instagram.com/explore/tags/cat#top'
    let url_search_7 = 'http://www.instagram.com/explore/tags/cat/#top'

    describe('base', function() {
      it(`Match ${url_home_1}`, function() {
        console.log('REGEXP 1', instagram.get('pages.feed.meta.url.regex'));
        console.log('REGEXP 2', new RegExp(instagram.get('pages.feed.meta.url.regex')));
        assert(true)
      })
    });

    describe('home', function() {
      it(`Match ${url_home_1}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Match ${url_home_2}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Match ${url_home_3}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Match ${url_home_4}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Match ${url_home_5}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Match ${url_home_6}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Match ${url_home_7}`, function() { assert(url_home_1.match(instagram.get('pages.feed.meta.url.regex'))) })

      it(`Don't match ${url_post_1}`, function() { assert(!url_post_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Don't match ${url_post_2}`, function() { assert(!url_post_2.match(instagram.get('pages.feed.meta.url.regex'))) })

      it(`Don't match ${url_fail_1}`, function() { assert(!url_fail_1.match(instagram.get('pages.feed.meta.url.regex'))) })
      it(`Don't match ${url_fail_2}`, function() { assert(!url_fail_2.match(instagram.get('pages.feed.meta.url.regex'))) })
    });

    describe('post', function() {
      it(`Match ${url_post_1}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Match ${url_post_2}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Match ${url_post_3}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Match ${url_post_4}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Match ${url_post_5}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Match ${url_post_6}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Match ${url_post_7}`, function() { assert(url_post_1.match(instagram.get('pages.post.meta.url.regex'))) })

      it(`Don't match ${url_home_1}`, function() { assert(!url_home_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Don't match ${url_home_2}`, function() { assert(!url_home_2.match(instagram.get('pages.post.meta.url.regex'))) })

      it(`Don't match ${url_fail_1}`, function() { assert(!url_fail_1.match(instagram.get('pages.post.meta.url.regex'))) })
      it(`Don't match ${url_fail_2}`, function() { assert(!url_fail_2.match(instagram.get('pages.post.meta.url.regex'))) })
    });

    describe('search', function() {
      it(`Match ${url_search_1}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_2}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_3}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_4}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_5}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_6}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_7}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })

      it(`Don't match ${url_home_1}`, function() { assert(!url_home_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Don't match ${url_home_2}`, function() { assert(!url_home_2.match(instagram.get('pages.search.meta.url.regex'))) })

      it(`Don't match ${url_fail_1}`, function() { assert(!url_fail_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Don't match ${url_fail_2}`, function() { assert(!url_fail_2.match(instagram.get('pages.search.meta.url.regex'))) })
    });

    describe('test', function() {
      it(`Match ${url_search_1}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_2}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_3}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_4}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_5}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_6}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Match ${url_search_7}`, function() { assert(url_search_1.match(instagram.get('pages.search.meta.url.regex'))) })

      it(`Don't match ${url_home_1}`, function() { assert(!url_home_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Don't match ${url_home_2}`, function() { assert(!url_home_2.match(instagram.get('pages.search.meta.url.regex'))) })

      it(`Don't match ${url_fail_1}`, function() { assert(!url_fail_1.match(instagram.get('pages.search.meta.url.regex'))) })
      it(`Don't match ${url_fail_2}`, function() { assert(!url_fail_2.match(instagram.get('pages.search.meta.url.regex'))) })
    });

  });
});


// describe('User', function() {
//   describe('#save()', function() {
//     // it('should save without error', function(done) {
//     //   done();
//     //   // var user = new User('Luna');
//     //   // user.save(function(err) {
//     //   //   if (err) done(err);
//     //   //   else done();
//     //   // });
//     // });
//     it('should return sum of arguments', function() {
//       assert.equal([1, 2, 3, 4].indexOf(4), -1);
//     })
//     it('should return sum of arguments', function() {
//       assert(true);
//     })
//   });
// });


// describe('SocialSelectors - Instagram', async function() {
//   await instagram.load({
//     library: 'instagram', // The social media site you want to load
//     location: 'local', // Load the local library or hosted library (local | hosted).
//     // path: (scope.environment == 'development')
//     //   ? 'http://localhost:4001/module/libraries/instagram/main.json'
//     //   : 'https://social-selectors.itwcreativeworks.com/module/libraries/instagram/main.json',
//   })
//   describe('regex', function() {
//     it('should apply to all these URLs', function() {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });
