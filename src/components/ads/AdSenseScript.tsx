import Script from "next/script";
import { SITE_CONFIG } from "@/config/site";

export function AdSenseScript() {
  const clientId = SITE_CONFIG.adsense.clientId;
  const gaId = SITE_CONFIG.gaId;

  return (
    <>
      {/* Google Consent Mode v2 default state (privacy-first until user consents) */}
      <Script id="google-consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          var saved = null;
          try { saved = localStorage.getItem('finvalio_consent'); } catch (e) {}
          var granted = saved === 'all' ? 'granted' : 'denied';
          gtag('consent', 'default', {
            ad_storage: granted,
            ad_user_data: granted,
            ad_personalization: granted,
            analytics_storage: granted,
            wait_for_update: 500
          });
        `}
      </Script>

      {clientId ? (
        <Script
          id="google-adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      ) : null}

      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
