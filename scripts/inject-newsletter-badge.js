const badgeCss = `
.body {
  --badge-dimensions: 5.3125rem;
  --badge-bg-color: #59e7ed;
  --badge-edge-bg-color: #119397;
  --badge-edge-width: 2.5rem;
  --badge-edge-height: 0.5rem;
  --badge-edge-position: 2.8125rem;

  padding-right: var(--badge-edge-height);
}

.outer-wrapper {
  margin-top: var(--badge-edge-height);
  position: relative;
}

.hed {
  max-width: calc(100% - 2rem);
}

.badge-container {
  height: var(--badge-dimensions);
  overflow: hidden;
  position: absolute;
  right: calc(var(--badge-edge-height) * -1);
  top: calc(var(--badge-edge-height) * -1);
  width: var(--badge-dimensions);
}

.badge-container::before,
.badge-container::after {
  background-color: var(--badge-edge-bg-color);
  border-radius: 8px;
  content: '';
  position: absolute;
}

.badge-container::before {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  height: var(--badge-edge-height);
  right: var(--badge-edge-position);
  width: var(--badge-edge-width);
}

.badge-container::after {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  height: var(--badge-edge-width);
  right: 0;
  top: var(--badge-edge-position);
  width: var(--badge-edge-height);
}

.badge {
  background: var(--badge-bg-color);
  border: 1px dashed;
  box-shadow: 0 0 0 3px var(--badge-bg-color),
    0px 21px 5px -18px rgba(0, 0, 0, 0.6);
  height: 1.5625rem;
  line-height: 1.5625rem;
  overflow: hidden;
  position: absolute;
  right: -2.3125rem;
  text-align: center;
  top: 1.125rem;
  transform: rotate(45deg);
  width: 8.125rem;
  z-index: 2;
}
`;

let newsletterUpdated = false;

const injectNewsletterBadge = () => {
  let inlineNewsletter = document.querySelector('journey-inline-newsletter');
  if (newsletterUpdated || !inlineNewsletter) {
    return;
  }
  newsletterUpdated = true;
  const styleNode = document.createElement('style');
  styleNode.innerHTML = badgeCss;
  inlineNewsletter.shadow.querySelector('head').appendChild(styleNode);

  const badgeContainer = document.createElement('div');
  badgeContainer.classList.add('badge-container');
  badgeContainer.innerHTML = '<div class="badge">Daily</div>';
  inlineNewsletter.shadow
    .querySelector('.outer-wrapper')
    .appendChild(badgeContainer);
};

window.addEventListener('journey-displayed', () =>
  setTimeout(() => injectNewsletterBadge(), 5)
);

injectNewsletterBadge();
