(() => {
  const SUBX_SITE_COOKIE_NAME = '_sxpca';
  const SUBX_SHARED_COOKIE_NAME = 'subx-data';

  const setCookie = (name, value, days) => {
    const currentDomain = window.location.hostname;
    const parts = currentDomain.split('.');
    const topLevelDomain = parts.slice(-2).join('.');

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieValue = `${value}${
      days ? '; expires=' + expirationDate.toUTCString() : ''
    }; path=/; domain=.${topLevelDomain}; secure`;

    document.cookie = name + '=' + cookieValue;
  };

  const getCookie = (name) => {
    const cookieName = name + '=';
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(
      (cookie) => cookie.trim().indexOf(cookieName) === 0
    );

    if (!cookie) {
      return null;
    }

    return cookie.split('=')[1];
  };

  const waitForCookie = (
    cookieName,
    callback,
    intervalTime = 200,
    maxAttempts = 25
  ) => {
    let attempts = 0;
    let intervalId;

    const checkCookie = () => {
      attempts++;

      if (attempts > maxAttempts) {
        // If the maximum number of attempts is reached, stop checking
        clearInterval(intervalId);
        console.error(
          `Subx Cookie: Cookie "${cookieName}" not found after ${maxAttempts} attempts.`
        );
        return;
      }

      // Check if the cookie is defined
      const cookieValue = getCookie(cookieName);

      if (cookieValue) {
        // If the cookie is defined, execute the callback function
        clearInterval(intervalId);
        callback(cookieValue);
      }
    };

    // Start the interval to check for the cookie
    intervalId = setInterval(checkCookie, intervalTime);
  };

  waitForCookie(SUBX_SITE_COOKIE_NAME, (subxCookie) => {
    setCookie(SUBX_SHARED_COOKIE_NAME, subxCookie, 1);
    console.log(
      `Subx Cookie: the '${SUBX_SHARED_COOKIE_NAME}' cookie was shared for subdomains`
    );
  });
})();
