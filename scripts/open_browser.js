const { execSync } = require('child_process');
const opn = require('opn');

module.exports = function openBrowser(url) {
  const browser = process.env.BROWSER;
  const shouldTryOpenChromeWithAppleScript =
    process.platform === 'darwin' &&
    (typeof browser !== 'string' || browser === 'google chrome');

  if (shouldTryOpenChromeWithAppleScript) {
    try {
      execSync('ps cax | grep "Google Chrome"');
      execSync(`osascript open-chrome.applescript "${encodeURI(url)}"`, {
        cwd: __dirname,
        stdio: 'ignore',
      });

      return true;
    } catch (error) {
      // Ignore errors.
    }
  }

  try {
    opn(url).catch(() => {}); // Prevent `unhandledRejection` error.

    return true;
  } catch (error) {
    return false;
  }
};