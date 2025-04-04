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

  if (count > 3) {
  hideAdsenseAds();
  alert(
    "🚨 비정상적인 광고 클릭이 감지되었습니다.\n" +
    "해당 IP는 무효 트래픽 시도로 기록되었으며,\n" +
    "Google 보안 시스템에 의해 차단될 수 있습니다.\n\n" +
    "이 행위는 법적 책임이 따를 수 있습니다. 즉시 중단하십시오."
  );
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
