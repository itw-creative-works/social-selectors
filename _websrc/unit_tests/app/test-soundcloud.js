const assert = require('assert');
const puppeteer = require('puppeteer');
let browser;
let page;

describe('hooks', function() {
  before(async function() {
    // runs before all tests in this block
    browser = await puppeteer.launch();
    page = await browser.newPage();

  });

  after(async function() {
    // runs after all tests in this block
    await browser.close();
  });

  beforeEach(function() {
    // runs before each test in this block
  });

  afterEach(function() {
    // runs after each test in this block
  });

  // test cases
  describe('SoundCloud Tests',  function() {
    describe('Desktop', function() {
      describe('Test inner', function() {
        it(`should pass no problem`, function() {
          assert(true)
        })
      });
    });
  });
});
