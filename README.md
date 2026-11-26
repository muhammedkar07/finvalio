# FinValio (`finvalio.com`) — Çift Dilli (EN + TR) AdSense Uyumlu Finans Hesaplama Platformu

**FinValio**, hem Global İngilizce (ABD 2026 IRS verileri) hem de Türkiye (2026 GİB vergi dilimleri, 33.030 TL asgari ücret istisnası, 73.729,87 TL kıdem tazminatı tavanı, KKDF/BSMV) pazarlarını aynı anda hedefleyen, yüksek AdSense RPM/CPC odaklı, statik önderlemeli (SSG) Next.js 15 web uygulamasıdır.

---

## Hızlı Başlangıç

```bash
npm install
npm run test:math   # 2026 finans & vergi motoru doğrulama testleri
npm run dev         # http://localhost:3000 (yerel geliştirme)
npm run build       # Üretim (production) derlemesi
```

---

## Yayına Alma ve Google AdSense Gelir Yol Haritası

### 1. Domain Satın Alma (`finvalio.com`)
- **Cloudflare Registrar** (maliyetine, ek kâr marjı yok), **Porkbun** veya **Namecheap** üzerinden `finvalio.com` alan adını tescil edin.

### 2. Ücretsiz Hosting / Yayınlama (0 $/ay — GitHub Pages)
- Proje `https://muhammedkar07.github.io/finvalio/` adresinde GitHub Pages üzerinden otomatik yayınlanır (`.github/workflows/deploy-pages.yml`).
- **`finvalio.com` domainini satın aldığınızda geçiş (2 dakika):**
  1. GitHub Repo → **Settings → Pages → Custom domain** alanına `finvalio.com` yazıp kaydedin (DNS A/CNAME kayıtlarını domain sağlayıcınızdan ekleyin, HTTPS otomatik aktif olur).
  2. GitHub Repo → **Settings → Secrets and variables → Actions → Variables** altında şu iki değişkeni ekleyin:
     - `CUSTOM_DOMAIN` = `true`
     - `NEXT_PUBLIC_SITE_URL` = `https://finvalio.com`
  3. **Actions → Deploy FinValio to GitHub Pages → Run workflow** butonuna tıklayın; tüm kanonik linkler, `sitemap.xml` ve `hreflang` etiketleri otomatik `https://finvalio.com` adresine geçer.

### 3. Google Search Console & İndeksleme
- Google Search Console'da `finvalio.com` mülkünü doğrulayın.
- `https://finvalio.com/sitemap.xml` site haritasını gönderin.
- Hem `/en/...` hem `/tr/...` sayfaları karşılıklı `hreflang` etiketleri ve JSON-LD (`WebApplication`, `FAQPage`, `Article`, `BreadcrumbList`) şemalarıyla indekslenecektir.

### 4. Google AdSense Başvurusu ve Aktivasyon
- **Önemli:** AdSense onayı almadan önce `NEXT_PUBLIC_ADSENSE_CLIENT_ID` boş kalabilir; üretim modunda boş reklam kutusu **görünmez**, böylece AdSense inceleme ekibi temiz, yüksek değerli bir finans platformu görür.
- Onay aldıktan sonra:
  1. `public/ads.txt` dosyasındaki `pub-0000000000000000` değerini gerçek AdSense Yayıncı Kimliğinizle değiştirin.
  2. AdSense panelinde 4 duyarlı (Responsive Display) reklam birimi oluşturun (`top`, `inContent`, `sidebar`, `bottom`).
  3. Hosting panelinde ortam değişkenlerini ekleyin (`.env.example` dosyasına bakın):
     ```env
     NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_SLOT_TOP=XXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT=XXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=XXXXXXXXXX
     NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM=XXXXXXXXXX
     ```
  4. Yeniden deploy ettiğinizde tüm reklam alanları sıfır düzen kayması (CLS = 0) ve Google Consent Mode v2 desteğiyle otomatik devreye girer.
