let clickCount = 0;

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

function trackAdClick() {
    let currentCount = localStorage.getItem('clickLimiterCount');
    currentCount = currentCount ? parseInt(currentCount) : 0;

    if (currentCount <= 2) {
        currentCount++;
        localStorage.setItem('clickLimiterCount', currentCount.toString());
    }

    if (currentCount > 2) {
        const warning = confirm(
            "광고를 3회 이상 클릭하셨습니다. 무효 트래픽으로 간주될 수 있습니다.\n지속적인 클릭은 블로그 수익에 영향을 줄 수 있습니다."
        );
        if (!warning) {
            window.location.replace("https://www.google.com");
        }
        localStorage.setItem('clickLimiterCount', '0');
    }
}

window.addEventListener('blur', function () {
    const el = document.activeElement;
    if (isAdsenseAd(el)) {
        if (window.location.href.includes('#google_vignette')) return;
        trackAdClick();
        setTimeout(() => el.blur(), 1);
    }
});
