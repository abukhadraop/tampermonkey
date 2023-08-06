(() => {
  let executed = false;
  if (executed) {
    return;
  }
  executed = true;

  const GITHUB_URL = 'https://abukhadraop.github.io/tampermonkey/scripts';
  const FIRE_BASE_URL = 'https://test-1ee63.web.app';
  const GITHUB_QUERY_PARAM = 'github';
  const FIRE_BASE_QUERY_PARAM = 'firebase';

  const mapGithubUrl = (scr) => `${GITHUB_URL}/${scr}`;
  const mapFirebaseUrl = (scr) => `${FIRE_BASE_URL}/${scr}`;

  const SITE_DEFAULT_SCRIPTS = ['subx-cookie-site.js'].map(mapGithubUrl);
  const SHOP_DEFAULT_SCRIPTS = ['subx-cookie-shop.js'].map(mapFirebaseUrl);

  const getQueryParameter = (name) =>
    new URLSearchParams(window.location.search).get(name);

  let scripts = []
    .concat(
      (getQueryParameter(GITHUB_QUERY_PARAM) || '')
        .split(',')
        .filter((x) => !!x)
        .map(mapGithubUrl)
    )
    .concat(
      (getQueryParameter(FIRE_BASE_QUERY_PARAM) || '')
        .split(',')
        .filter((x) => !!x)
        .map(mapFirebaseUrl)
    );
  if (!scripts.length) {
    const isShopSite = window.location.host.toLowerCase().includes('shop.');
    scripts = scripts.concat(
      isShopSite ? SHOP_DEFAULT_SCRIPTS : SITE_DEFAULT_SCRIPTS
    );
  }

  scripts.forEach((scr) => {
    const scriptTag = document.createElement('script');
    scriptTag.src = scr;
    document.head.appendChild(scriptTag);
    console.log(`Subx Cookie: the '${scr}' was injected in the page`);
  });
})();
