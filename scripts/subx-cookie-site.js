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

  const subxCookie = getCookie(SUBX_SITE_COOKIE_NAME);
  if (!subxCookie) {
    console.log(
      `Subx Cookie: the '${SUBX_SITE_COOKIE_NAME}' cookie is not defined`
    );
    return;
  }
  setCookie(SUBX_SHARED_COOKIE_NAME, subxCookie, 1);
  console.log(
    `Subx Cookie: the '${SUBX_SHARED_COOKIE_NAME}' cookie was shared for domains`
  );
})();
