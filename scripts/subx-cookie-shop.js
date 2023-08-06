(() => {
  const SUBX_SHARED_COOKIE_NAME = 'subx-data';

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

  const subxCookie = getCookie(SUBX_SHARED_COOKIE_NAME);
  if (!subxCookie) {
    console.log(
      `Subx Cookie: the '${SUBX_SITE_COOKIE_NAME}' cookie is not defined`
    );
    return;
  }
  console.log(`Subx Cookie: subx data`, JSON.parse(subxCookie));
})();
