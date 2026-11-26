"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { STATIC_ROUTES, type Locale } from "@/lib/i18n";

export type LegalPageType = "about" | "contact" | "privacy" | "terms" | "disclaimer";

export function LegalPageView({
  page,
  locale,
}: {
  page: LegalPageType;
  locale: Locale;
}) {
  const isTr = locale === "tr";
  const [contactSent, setContactSent] = useState(false);
  const [consentResetDone, setConsentResetDone] = useState(false);

  const resetCookieConsent = () => {
    try {
      localStorage.removeItem("finvalio_consent");
      setConsentResetDone(true);
    } catch {
      // ignore
    }
  };

  if (page === "about") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {isTr ? "Hakkımızda & Metodoloji" : "About & Methodology"}
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-950 dark:text-white">
            {isTr ? `${SITE_CONFIG.name} Hakkında` : `About ${SITE_CONFIG.name}`}
          </h1>
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <p>
              {isTr
                ? `${SITE_CONFIG.name} (${SITE_CONFIG.domain}), bireylerin ve işletmelerin maaş, vergi, kredi, mevduat, kıdem tazminatı, kira artışı ve emeklilik kararlarını şeffaf matematikle alabilmesi için geliştirilmiş çift dilli (Türkçe & İngilizce) bir finans hesaplama platformudur.`
                : `${SITE_CONFIG.name} (${SITE_CONFIG.domain}) is an independent bilingual (English & Turkish) financial calculation platform built to make complex salary, tax, mortgage, savings, and retirement math transparent and accessible to everyone.`}
            </p>
            <h2 className="pt-2 text-lg font-bold text-slate-950 dark:text-white">
              {isTr ? "Veri Kaynaklarımız ve 2026 Doğrulama Politikamız" : "Data Sources & 2026 Verification Standards"}
            </h2>
            <ul className="space-y-2.5">
              {[
                isTr
                  ? "Türkiye 2026 Ücret Gelir Vergisi Tarifesi (193 Sayılı GVK Md. 103), 33.030 TL brüt asgari ücret vergi istisnası ve 2026 kıdem tazminatı tavanı (73.729,87 TL) resmi mevzuat değişiklikleriyle güncellenir."
                  : "US 2026 Federal Income Tax brackets, standard deductions ($16,100 / $32,200 / $24,150), and Social Security wage base ($184,500) reflect official IRS 2026 inflation adjustments.",
                isTr
                  ? "Kredi ve mevduat motorlarımız uluslararası anüite ve ACT/365 bankacılık standartlarına, ayrıca Türkiye KKDF (%15) ve BSMV (%15) vergi kurallarına uygun olarak otomatik birim testlerle doğrulanır."
                  : "Turkey payroll and severance modules strictly model GVK Article 103 cumulative brackets, minimum-wage exemptions, and Labor Law Article 17 notice tiers.",
                isTr
                  ? "Tüm hesaplamalar tamamen kullanıcının kendi tarayıcısında çalışır; maaş veya varlık rakamlarınız sunucularımıza gönderilmez."
                  : "Every calculation runs 100% locally in your browser — your personal income, savings, and debt numbers never leave your device.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <h2 className="pt-2 text-lg font-bold text-slate-950 dark:text-white">
              {isTr ? "Nasıl Ücretsiz Kalıyoruz?" : "How We Keep FinValio Free"}
            </h2>
            <p>
              {isTr
                ? `${SITE_CONFIG.name} üzerindeki tüm hesaplayıcılar, grafikler ve CSV dışa aktarma özellikleri tamamen ücretsizdir ve üyelik gerektirmez. Platform giderlerimiz, kullanıcı deneyimini bozmayan sınırlı Google AdSense reklamlarıyla karşılanır.`
                : `All calculators, interactive charts, and CSV schedule exports on ${SITE_CONFIG.name} are 100% free with no sign-up walls. We fund hosting and editorial updates through non-intrusive display advertising (Google AdSense).`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (page === "contact") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            {isTr ? "İletişim" : "Contact Us"}
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {isTr
              ? "Hesaplama hatası bildirimi, 2026 mevzuat güncelleme önerisi, yeni araç talebi veya iş birliği için bize ulaşabilirsiniz."
              : "Spotted a formula question, want to request a new calculator, or interested in editorial partnerships? Reach out below."}
          </p>

          <div className="mt-6 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 dark:border-emerald-900 dark:bg-emerald-950/40">
            <Mail className="h-5 w-5 text-emerald-700 dark:text-emerald-400" />
            <div className="text-sm">
              <p className="font-bold text-slate-900 dark:text-white">
                {isTr ? "Doğrudan E-posta" : "Direct Email"}
              </p>
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-semibold text-emerald-700 underline dark:text-emerald-400"
              >
                {SITE_CONFIG.contactEmail}
              </a>
            </div>
          </div>

          {contactSent ? (
            <div className="mt-6 rounded-2xl border border-emerald-300 bg-emerald-50 p-5 text-sm font-medium text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200">
              {isTr
                ? "Mesajınız e-posta istemciniz için hazırlandı veya kaydedildi. Genellikle 1-2 iş günü içinde yanıt veriyoruz."
                : "Thank you! Your message has been queued. We typically reply within 1–2 business days."}
            </div>
          ) : (
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setContactSent(true);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {isTr ? "Adınız Soyadınız" : "Your Name"}
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {isTr ? "E-posta Adresiniz" : "Email Address"}
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-700 dark:text-slate-200">
                  {isTr ? "Konu / Mesajınız" : "Message"}
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm dark:border-slate-700 dark:bg-slate-950"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#0B1F3A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500"
              >
                {isTr ? "Mesajı Gönder" : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (page === "privacy") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-bold uppercase">GDPR • KVKK • Google AdSense</span>
          </div>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">
            {isTr ? "Gizlilik ve Çerez Politikası" : "Privacy & Cookie Policy"}
          </h1>
          <p className="mt-2 text-xs text-slate-500">
            {isTr ? "Son güncelleme: 2026" : "Last updated: 2026"}
          </p>

          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              {isTr ? "1. Hesaplama Verilerinin Gizliliği" : "1. Calculator Input Privacy"}
            </h2>
            <p>
              {isTr
                ? `${SITE_CONFIG.name} üzerindeki tüm finansal hesaplamalar doğrudan tarayıcınızda (istemci tarafında) gerçekleştirilir. Girdiğiniz maaş, kredi, mevduat veya birikim tutarları sunucularımıza gönderilmez, kaydedilmez ve üçüncü taraflarla paylaşılmaz.`
                : `All financial calculations on ${SITE_CONFIG.name} execute locally inside your web browser. Income, debt, tax, or investment figures you enter are never transmitted to or stored on our servers.`}
            </p>

            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              {isTr
                ? "2. Google AdSense ve Üçüncü Taraf Reklam Çerezleri"
                : "2. Google AdSense & Third-Party Advertising Cookies"}
            </h2>
            <p>
              {isTr
                ? "Sitemizde reklam göstermek için Google AdSense kullanabiliriz. Google dahil üçüncü taraf tedarikçiler, kullanıcının sitemize veya internetteki diğer web sitelerine yaptığı önceki ziyaretlere dayalı reklamlar yayınlamak için çerezler (DART/reklam çerezleri) kullanır. Kullanıcılar Google Reklam Ayarları (https://adssettings.google.com) üzerinden kişiselleştirilmiş reklamları devre dışı bırakabilirler. Google'ın iş ortağı sitelerindeki verileri nasıl kullandığı hakkında daha fazla bilgi için: https://policies.google.com/technologies/partner-sites."
                : "We may display advertisements via Google AdSense. Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to this website or other websites. Users may opt out of personalized advertising by visiting Google Ads Settings (https://adssettings.google.com) or learn how Google uses information from partner sites at https://policies.google.com/technologies/partner-sites."}
            </p>

            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              {isTr ? "3. KVKK ve GDPR Kapsamında Haklarınız" : "3. Your GDPR & KVKK Privacy Rights"}
            </h2>
            <p>
              {isTr
                ? "6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve Avrupa Birliği GDPR mevzuatı uyarınca, isteğe bağlı reklam ve analiz çerezlerine verdiğiniz onayı dilediğiniz zaman geri çekebilirsiniz. Çerez tercihlerinizi aşağıdan anında sıfırlayabilir veya contact@finvalio.com adresinden bize ulaşabilirsiniz."
                : "Under the EU General Data Protection Regulation (GDPR) and Turkish Law No. 6698 (KVKK), you have the right to withdraw consent for non-essential cookies at any time, request access or deletion of any email correspondence, and manage consent preferences directly below."}
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={resetCookieConsent}
                className="rounded-xl border border-emerald-500 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-800 transition hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300"
              >
                {isTr ? "Çerez Onay Tercihlerimi Sıfırla" : "Reset My Cookie Consent Preferences"}
              </button>
              {consentResetDone ? (
                <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">
                  {isTr
                    ? "Tercihiniz sıfırlandı — sayfayı yenilediğinizde onay penceresi yeniden açılacaktır."
                    : "Consent preference cleared — reload the page to update your choice."}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (page === "terms") {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            {isTr ? "Kullanım Şartları" : "Terms of Service"}
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
            <p>
              {isTr
                ? `${SITE_CONFIG.domain} adresini ziyaret ederek aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Platformda sunulan tüm hesaplayıcılar, grafikler ve yazılı içerikler kişisel ve bilgilendirici kullanım için ücretsiz olarak sunulur.`
                : `By accessing ${SITE_CONFIG.domain}, you agree to these Terms of Service. All calculators, visualizations, and written guides are provided free of charge for personal, educational, and informational use.`}
            </p>
            <p>
              {isTr
                ? "Veri ve formüllerin güncel ve doğru olması için azami özen gösterilmekle birlikte, vergi kanunları, banka faiz/masraf uygulamaları ve yerel düzenlemeler değişiklik gösterebilir. Hesaplama sonuçları 'olduğu gibi' sunulur ve resmi kurum/banka taahhüdü niteliği taşımaz."
                : "While we strive to keep 2026 tax brackets and financial formulas accurate, laws, lender fees, and individual tax situations vary. All results are provided 'as is' without warranty of completeness or suitability for formal filing."}
            </p>
            <p>
              {isTr
                ? "Sitenin kaynak kodunun, özgün içeriklerinin veya markasının izinsiz toplu kopyalanması (scraping) ve ticari amaçla yeniden yayınlanması yasaktır."
                : "Automated scraping, bulk republishing of original guides, or misrepresenting FinValio tools as your own product without written consent is prohibited."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Disclaimer
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
          {isTr ? "Finansal ve Yasal Sorumluluk Reddi" : "Financial & Tax Disclaimer"}
        </h1>
        <div className="mt-6 space-y-4 text-sm leading-7 text-slate-700 dark:text-slate-300">
          <p>
            {isTr
              ? `${SITE_CONFIG.name} (${SITE_CONFIG.domain}) üzerinde yer alan hesaplama araçları, tablolar, grafikler ve rehber yazıları yalnızca genel bilgilendirme ve ön simülasyon amacı taşır; hiçbir şekilde yatırım danışmanlığı, vergi müşavirliği, hukuki görüş veya bankacılık teklifi niteliğinde değildir.`
              : `The calculators, schedules, charts, and educational guides published on ${SITE_CONFIG.name} (${SITE_CONFIG.domain}) are strictly for informational and estimation purposes. Nothing on this website constitutes licensed financial, investment, tax, accounting, or legal advice.`}
          </p>
          <p>
            {isTr
              ? "Resmi bordro, vergi beyannamesi, iş hukuku (kıdem/ihbar tazminatı) veya konut/yatırım kararları öncesinde mutlaka yetkili bir Serbest Muhasebeci Mali Müşavir (SMMM), avukat, SPK lisanslı yatırım danışmanı veya ilgili bankadan yazılı teyit alınız."
              : "Before making binding tax filings, employment separation decisions, mortgage commitments, or investment allocations, always consult a qualified CPA, fiduciary financial advisor, attorney, or lending institution."}
          </p>
          <p>
            {isTr ? "Gizlilik uygulamalarımız için " : "See also our "}
            <Link href={STATIC_ROUTES.privacy[locale]} className="font-semibold text-emerald-700 underline">
              {isTr ? "Gizlilik Politikası" : "Privacy Policy"}
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
