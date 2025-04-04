function isAdsenseAd(el) {
  if (!el) return false;

  const tag = el.tagName;
  const src = el.src || '';
  const client = el.getAttribute && el.getAttribute('data-ad-client');

  return (
    (tag === 'IFRAME' && src.includes('google')) ||
    (tag === 'INS' && client && client.includes('pub-'))
  );
}

function hideAdsenseAds() {
  const ads = document.querySelectorAll('.adsbygoogle, iframe[src*="google"]');
  ads.forEach(ad => {
    ad.style.display = 'none';
  });
}

function handleAdClick() {
  let count = parseInt(localStorage.getItem('clickLimiterCount')) || 0;
  count++;

  localStorage.setItem('clickLimiterCount', count.toString());

  if (count >= 3) {
    hideAdsenseAds();
    alert("반복된 광고 클릭이 감지되어 광고를 숨겼습니다.\n지속적인 클릭은 수익에 악영향을 줄 수 있습니다.");
  }
}

window.addEventListener('blur', function () {
  const el = document.activeElement;
  if (isAdsenseAd(el)) {
    if (window.location.href.includes('#google_vignette')) return;
    handleAdClick();
    setTimeout(() => el.blur(), 1);
  }
});
