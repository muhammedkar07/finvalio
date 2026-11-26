import type { Locale } from "@/lib/i18n";

export type CalculatorId =
  | "salary"
  | "loan"
  | "compound"
  | "deposit"
  | "severance"
  | "fire"
  | "rent-buy"
  | "inflation-vat";

export type CalculatorCategory = "income" | "credit" | "investing" | "housing" | "business";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LocalizedCalcContent {
  slug: string;
  name: string;
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  tagline: string;
  badge: string;
  intro: string;
  formulaTitle: string;
  formulaExpression: string;
  methodologyPoints: string[];
  workedExampleTitle: string;
  workedExampleSteps: string[];
  workedExampleSummary: string;
  faqs: FaqItem[];
}

export interface CalculatorDefinition {
  id: CalculatorId;
  category: CalculatorCategory;
  icon: "wallet" | "landmark" | "trending-up" | "piggy-bank" | "briefcase" | "flame" | "home" | "percent";
  rpmTier: "high" | "very-high";
  relatedIds: CalculatorId[];
  en: LocalizedCalcContent;
  tr: LocalizedCalcContent;
}

export const CATEGORY_LABELS: Record<CalculatorCategory, Record<Locale, string>> = {
  income: { en: "Salary & Tax", tr: "Maaş & Vergi" },
  credit: { en: "Loans & Mortgage", tr: "Kredi & Konut" },
  investing: { en: "Investing & Savings", tr: "Yatırım & Mevduat" },
  housing: { en: "Real Estate & Rent", tr: "Konut & Kira" },
  business: { en: "VAT & Freelance", tr: "KDV & Enflasyon" },
};

export const CALCULATORS: CalculatorDefinition[] = [
  {
    id: "salary",
    category: "income",
    icon: "wallet",
    rpmTier: "very-high",
    relatedIds: ["severance", "compound", "inflation-vat"],
    en: {
      slug: "salary-paycheck-calculator",
      name: "2026 Salary & Take-Home Pay Calculator",
      shortName: "Salary & Tax (2026)",
      seoTitle: "2026 Salary & Take-Home Pay Calculator (US IRS & Turkey) | FinValio",
      seoDescription:
        "Calculate your exact 2026 net take-home pay with official IRS federal brackets, FICA caps, 401(k) deductions, or Turkey 12-month gross-to-net payroll.",
      tagline: "Exact 2026 federal tax, FICA, 401(k), state tax & 12-month Turkish payroll breakdown.",
      badge: "2026 Tax Tables",
      intro:
        "Understand what actually lands in your bank account in 2026. Switch seamlessly between the US Federal IRS 2026 Paycheck Engine (including the $16,100 / $32,200 standard deduction and $184,500 Social Security cap) and Turkey's 2026 progressive 12-month Gross-to-Net / Net-to-Gross payroll system.",
      formulaTitle: "2026 Progressive Income Tax & Payroll Formula",
      formulaExpression:
        "Net Pay = Gross Salary − Pre-Tax Deductions − Progressive Income Tax − Payroll / FICA Taxes",
      methodologyPoints: [
        "US Federal 2026 Standard Deduction: $16,100 (Single), $32,200 (Married Filing Jointly), and $24,150 (Head of Household).",
        "US 2026 FICA Taxes: 6.2% Social Security up to the $184,500 wage base limit ($11,439 max), plus 1.45% Medicare on all wages (+0.9% Additional Medicare over $200,000 single / $250,000 married).",
        "Pre-tax 401(k) lowers Federal and State taxable income while remaining subject to FICA payroll taxes; Section 125 health premiums reduce both.",
        "In Turkey mode, the engine applies the official 2026 GVK Article 103 brackets (15%, 20%, 27%, 35%, 40%) and the monthly 33,030 TRY minimum-wage tax exemption across all 12 months.",
      ],
      workedExampleTitle: "Example: $95,000 Annual Salary (Single, 2026, 5% State Tax, 6% 401k)",
      workedExampleSteps: [
        "Pre-tax 401(k) contribution (6%): $5,700/year reduces taxable income to $89,300.",
        "Subtract 2026 Single Standard Deduction ($16,100) → Federal Taxable Income = $73,200.",
        "Progressive Federal Tax: 10% on first $12,400 ($1,240) + 12% on next $38,000 ($4,560) + 22% on remaining $22,800 ($5,016) = $10,816.",
        "FICA Taxes on $95,000: Social Security (6.2% = $5,890) + Medicare (1.45% = $1,377.50) = $7,267.50.",
        "Estimated State Income Tax (5% on $89,300) = $4,465.00.",
      ],
      workedExampleSummary:
        "Estimated Annual Take-Home Pay: $66,751.50 ($5,562.63/month or $2,567.37 biweekly), with an effective federal rate of 11.39%.",
      faqs: [
        {
          question: "How do progressive tax brackets work in 2026?",
          answer:
            "Only the portion of your taxable income that falls inside a higher bracket is taxed at that higher marginal rate. Moving into the 22% or 24% bracket never causes your earlier dollars to be taxed at that higher percentage.",
        },
        {
          question: "What is the 2026 Social Security wage base limit?",
          answer:
            "For 2026, the IRS Social Security (OASDI) wage base limit is $184,500. Employees pay 6.2% up to that threshold (a maximum of $11,439 for the year), while Medicare (1.45%) has no income cap.",
        },
        {
          question: "Why does monthly net salary change during the year in Turkey mode?",
          answer:
            "Turkey uses cumulative year-to-date taxable income brackets (190,000 TL, 400,000 TL, 1,500,000 TL, 5,300,000 TL). As your cumulative taxable base crosses into a higher bracket mid-year, monthly net pay drops slightly under a fixed gross contract.",
        },
        {
          question: "Are my salary figures sent to any server?",
          answer:
            "No. Every calculation runs locally inside your browser using JavaScript. FinValio never stores, transmits, or logs your income data.",
        },
      ],
    },
    tr: {
      slug: "brutten-nete-maas-hesaplama",
      name: "2026 Brüt-Net Maaş Hesaplama (12 Aylık)",
      shortName: "Brüt-Net Maaş (2026)",
      seoTitle: "2026 Brüt-Net ve Net-Brüt Maaş Hesaplama | 12 Aylık Vergi Dilimli | FinValio",
      seoDescription:
        "2026 güncel gelir vergisi dilimleri (190K-5.3M TL), 33.030 TL asgari ücret vergi istisnası ve SGK tavanıyla 12 aylık brütten nete ve netten brüte maaş hesaplama.",
      tagline: "2026 GİB vergi dilimleri, asgari ücret istisnası, işveren maliyeti ve 12 aylık detaylı bordro.",
      badge: "2026 Güncel Tarife",
      intro:
        "2026 yılı resmi ücret gelir vergisi dilimleri ve 33.030 TL brüt asgari ücret vergi istisnası ile maaşınızın yıl boyunca hangi ayda ne kadar değişeceğini kuruşu kuruşuna görün. Hem Brütten Nete hem Netten Brüte hesaplama ve 5 puanlık SGK işveren teşviki analizi tek ekranda.",
      formulaTitle: "2026 Türkiye Ücret Bordrosu ve Vergi Dilimi Formülü",
      formulaExpression:
        "Net Maaş = Brüt Maaş − SGK İşçi (%14) − İşsizlik (%1) − (Gelir Vergisi − Asgari Ücret GV İstisnası) − (Damga Vergisi − İstisna)",
      methodologyPoints: [
        "2026 Gelir Vergisi Dilimleri (Ücretliler): 190.000 TL'ye kadar %15, 400.000 TL'ye kadar %20, 1.500.000 TL'ye kadar %27, 5.300.000 TL'ye kadar %35, fazlası %40.",
        "2026 Asgari Ücret İstisnası: Aylık 33.030 TL brüt asgari ücrete (28.075,50 TL vergi matrahı) tekabül eden gelir vergisi ve damga vergisi tüm çalışanların bordrosundan otomatik düşülür.",
        "SGK Prime Esas Kazanç Tavanı: Aylık brüt asgari ücretin 7,5 katı olan 247.725 TL üzeri kazançlardan SGK ve işsizlik primi kesilmez.",
        "Netten Brüte modunda, sabit net maaş anlaşmalarında yılın ilerleyen aylarında vergi dilimi arttıkça işverenin üstlendiği brüt maliyetin yükselişi her ay için ayrı ayrı çözülür.",
      ],
      workedExampleTitle: "Örnek Hesaplama: 2026 Yılında Aylık 80.000 TL Sabit Brüt Maaş",
      workedExampleSteps: [
        "SGK İşçi Payı (%14): 11.200,00 TL ve İşsizlik Sigortası İşçi Payı (%1): 800,00 TL düşülür.",
        "Aylık Gelir Vergisi Matrahı: 80.000 − 12.000 = 68.000,00 TL olur.",
        "Ocak ayında (%15 dilimi): Ham gelir vergisi 10.200 TL'dir; 4.211,33 TL asgari ücret istisnası düşülünce ödenecek gelir vergisi 5.988,68 TL olur.",
        "Damga Vergisi: 607,20 TL − 250,70 TL istisna = 356,50 TL ödenir.",
        "Ocak ayı net maaşı: 61.654,82 TL olarak ele geçer. Mart sonunda kümülatif matrah 190.000 TL'yi aşınca %20 dilimine, Haziran'da ise 400.000 TL'yi aşınca %27 dilimine girilir.",
      ],
      workedExampleSummary:
        "80.000 TL sabit brüt maaşta Ocak neti ~61.655 TL iken yıl sonuna doğru %27 dilimi etkisiyle aylık net düşer; yıllık ortalama aylık net ~56.860 TL seviyesinde gerçekleşir.",
      faqs: [
        {
          question: "2026 yılında net asgari ücret ne kadardır?",
          answer:
            "2026 yılı için brüt asgari ücret 33.030,00 TL, SGK (%14) ve işsizlik (%1) kesintileri sonrası net asgari ücret 28.075,50 TL'dir. Gelir ve damga vergisi istisnası sayesinde 12 ay boyunca net tutar sabit kalır.",
        },
        {
          question: "Brüt anlaşmada maaşım yıl içinde neden düşüyor?",
          answer:
            "Türkiye'de gelir vergisi yıllık kümülatif matrah üzerinden artan oranlı (%15'ten %40'a) hesaplanır. Yıl içinde üst dilimlere (190.000 TL, 400.000 TL, 1.500.000 TL) geçtikçe kesilen vergi artar ve sabit brüt maaşta elinize geçen net tutar azalır.",
        },
        {
          question: "Net maaş anlaşmasında vergi dilimi farkını kim öder?",
          answer:
            "Net anlaşmalı çalışanların yıl boyu eline geçen tutar değişmez; artan vergi yükünü işveren brüt maaşı yukarı çekerek karşılar. Aracımızda 'Netten Brüte' sekmesiyle işverene aylık toplam maliyeti görebilirsiniz.",
        },
        {
          question: "SGK tavanı aşılırsa ne olur?",
          answer:
            "Aylık brüt ücretiniz 2026 yılı SGK tavanı olan 247.725 TL'nin üzerindeyse, sadece tavan tutar üzerinden %14 SGK ve %1 işsizlik primi kesilir; aşan kısım için yalnızca gelir ve damga vergisi hesaplanır.",
        },
      ],
    },
  },
  {
    id: "loan",
    category: "credit",
    icon: "landmark",
    rpmTier: "very-high",
    relatedIds: ["rent-buy", "deposit", "compound"],
    en: {
      slug: "loan-mortgage-calculator",
      name: "Loan & Mortgage Amortization Calculator",
      shortName: "Loan & Mortgage",
      seoTitle: "Loan & Mortgage Calculator with Extra Payments & CSV Schedule | FinValio",
      seoDescription:
        "Calculate monthly mortgage or personal loan payments, total interest, extra payment payoff savings, KKDF/BSMV tax impact, and export full CSV schedules.",
      tagline: "Interactive amortization schedule, extra-payment interest savings, and CSV export.",
      badge: "CSV Export Included",
      intro:
        "Compare mortgage terms, auto loans, and personal credit offers with complete transparency. See how even a modest extra monthly principal payment shaves years off your loan and saves tens of thousands in interest — plus optional Turkey KKDF/BSMV tax support.",
      formulaTitle: "Standard Amortizing Loan Payment Formula",
      formulaExpression: "M = P × [ r(1 + r)^n ] / [ (1 + r)^n − 1 ]",
      methodologyPoints: [
        "P is the loan principal, r is the periodic effective monthly interest rate (Annual APR ÷ 12, or monthly rate × (1 + tax surcharge)), and n is total monthly installments.",
        "Every installment covers accrued monthly interest first; the remainder reduces principal, creating a compounding reduction in future interest.",
        "Extra monthly payments are applied 100% directly to principal, permanently shortening the payoff timeline and lowering total interest.",
        "Optional Monthly Escrow lets homeowners include property taxes, homeowners insurance, and PMI for realistic monthly cash-flow planning.",
      ],
      workedExampleTitle: "Example: $350,000 30-Year Mortgage at 6.50% APR (+$250/mo Extra)",
      workedExampleSteps: [
        "Standard monthly Principal & Interest payment on $350,000 at 6.50% over 360 months is $2,212.24.",
        "Without extra payments, total interest paid over 30 years reaches $446,405.71 (total paid: $796,405.71).",
        "Adding just $250/month extra toward principal cuts the payoff time from 360 months to 274 months (saving 7 years and 2 months).",
        "Total interest drops to $321,880 — saving over $124,500 in lifetime interest.",
      ],
      workedExampleSummary:
        "Small recurring principal prepayments early in a mortgage yield a guaranteed, risk-free return equal to your mortgage APR.",
      faqs: [
        {
          question: "What is the difference between interest rate and APR?",
          answer:
            "The nominal interest rate calculates your monthly principal-and-interest payment, while APR (Annual Percentage Rate) reflects the true annualized borrowing cost including compounding, taxes, or origination fees.",
        },
        {
          question: "How much can extra monthly payments really save?",
          answer:
            "Because mortgages are front-loaded with interest in the early years, paying even 10% extra toward principal each month typically cuts 4 to 7 years off a 30-year loan and eliminates 20% to 30% of total interest.",
        },
        {
          question: "Does this calculator support Turkish loans with KKDF and BSMV?",
          answer:
            "Yes. Switch the rate period to 'Monthly %' and set KKDF (15%) and BSMV (15%) for Turkish consumer loans, or 0% for housing mortgages (Konut Kredisi), to match bank amortization schedules exactly.",
        },
        {
          question: "Can I export the payment table to Excel or Google Sheets?",
          answer:
            "Yes — click the 'Export CSV' button right below the amortization summary to download every month's payment, principal, interest, tax, and ending balance.",
        },
      ],
    },
    tr: {
      slug: "kredi-ve-konut-kredisi-hesaplama",
      name: "Kredi ve Konut Kredisi Hesaplama (KKDF & BSMV)",
      shortName: "Kredi & Konut Kredisi",
      seoTitle: "Kredi ve Konut Kredisi Hesaplama 2026 | KKDF, BSMV ve Ödeme Planı | FinValio",
      seoDescription:
        "İhtiyaç, taşıt ve konut kredisi aylık taksit, toplam geri ödeme, KKDF (%15) ve BSMV (%15) vergi maliyeti, erken ödeme tasarrufu ve Excel/CSV ödeme planı.",
      tagline: "İhtiyaç, taşıt ve konut kredisi için KKDF/BSMV destekli tam ödeme planı ve CSV dışa aktarma.",
      badge: "KKDF & BSMV Dahil",
      intro:
        "Bankaların açıkladığı aylık faiz oranlarının gerçekte size ne kadara mal olduğunu anında görün. Konut kredisi (vergisiz) veya ihtiyaç/taşıt kredisi (%15 KKDF + %15 BSMV) profilleriyle aylık taksiti, toplam faizi ve ekstra ara ödemenin kaç ay kazandırdığını hesaplayın.",
      formulaTitle: "Anüite (Eşit Taksitli) Kredi ve Vergili Efektif Faiz Formülü",
      formulaExpression:
        "Efektif Aylık Oran (r) = Aylık Faiz × (1 + KKDF + BSMV)  |  Taksit = P × [r(1+r)^n] / [(1+r)^n − 1]",
      methodologyPoints: [
        "Konut Kredisi: Bireysel konut kredilerinde KKDF %0 ve BSMV %0 olarak uygulanır; faiz üzerine ekstra vergi binmez.",
        "İhtiyaç ve Taşıt Kredisi: Her ay oluşan faiz tutarı üzerinden %15 KKDF ve %15 BSMV (toplamda faizin %30'u kadar ek vergi) tahsil edilir.",
        "Efektif Yıllık Maliyet Oranı (APR), aylık vergili faizin 12 ay bileşik etkisiyle gerçek yıllık kredi maliyetini gösterir.",
        "Ekstra Aylık Ödeme simülasyonu ile her ay anaparaya küçük eklemeler yaptığınızda toplam faizden ne kadar tasarruf edeceğinizi görebilirsiniz.",
      ],
      workedExampleTitle: "Örnek Hesaplama: 250.000 TL İhtiyaç Kredisi (24 Ay, Aylık %3,49 Faiz)",
      workedExampleSteps: [
        "İhtiyaç kredisinde faiz üzerine %15 KKDF + %15 BSMV eklendiği için efektif aylık oran %3,49 × 1,30 = %4,537 olur.",
        "24 ay vadede aylık eşit taksit tutarı 17.326,41 TL olarak hesaplanır.",
        "24 ay sonunda bankaya ödenecek toplam tutar 415.833,84 TL olur.",
        "Toplam 165.833,84 TL'lik ek maliyetin 127.564,49 TL'si banka faizi, 38.269,35 TL'si ise KKDF ve BSMV vergisidir.",
      ],
      workedExampleSummary:
        "Aylık %3,49 görünen bir ihtiyaç kredisinde vergilerle birlikte gerçek aylık maliyet %4,54'e yaklaşır; karşılaştırma yaparken mutlaka toplam geri ödemeye bakılmalıdır.",
      faqs: [
        {
          question: "İhtiyaç kredisinde KKDF ve BSMV neden toplam maliyeti bu kadar artırıyor?",
          answer:
            "Bireysel ihtiyaç kredilerinde her taksit dönemindeki faiz tutarına %15 KKDF ve %15 BSMV eklenir. Bu durum efektif faiz oranını doğrudan 1,30 katına çıkarır.",
        },
        {
          question: "Konut kredisinde KKDF ve BSMV ödenir mi?",
          answer:
            "Hayır. Bireysel konut kredileri KKDF ve BSMV'den muaftır (%0). Hesaplayıcımızda 'Konut Kredisi' hazır profilini seçerek vergisiz hesaplama yapabilirsiniz.",
        },
        {
          question: "Kredi ödeme planını Excel'e aktarabilir miyim?",
          answer:
            "Evet. Hesaplama sonuçlarının altındaki 'CSV İndir' butonuna tıklayarak tüm taksitlerin anapara, faiz, vergi ve kalan bakiye tablosunu Excel veya Google Sheets'te açabilirsiniz.",
        },
        {
          question: "Ara ödeme veya ekstra taksit faizi azaltır mı?",
          answer:
            "Evet. Kredinin erken aylarında anaparadan düşülen her ekstra tutar, kalan tüm vadeler boyunca o kısım için faiz işlemesini durdurur ve yüksek faiz tasarrufu sağlar.",
        },
      ],
    },
  },
  {
    id: "compound",
    category: "investing",
    icon: "trending-up",
    rpmTier: "very-high",
    relatedIds: ["fire", "deposit", "inflation-vat"],
    en: {
      slug: "compound-interest-calculator",
      name: "Compound Interest & Investment Calculator",
      shortName: "Compound Interest",
      seoTitle: "Compound Interest Calculator with Inflation & Monthly Deposits | FinValio",
      seoDescription:
        "Project investment growth with monthly contributions, compounding frequency, and inflation-adjusted real purchasing power curves.",
      tagline: "Visualize nominal vs. inflation-adjusted real wealth growth over 1–60 years.",
      badge: "Inflation-Adjusted",
      intro:
        "See the true long-term power of compounding — not just in headline nominal dollars, but in inflation-adjusted real purchasing power. Model index funds, retirement accounts, or recurring monthly savings plans with crystal-clear yearly charts.",
      formulaTitle: "Compound Growth & Inflation-Adjusted Real Value",
      formulaExpression: "A = P(1 + r/n)^(nt) + PMT × [((1 + r/n)^(nt) − 1) / (r/n)]   |   Real = A / (1 + i)^t",
      methodologyPoints: [
        "Compounding frequency (monthly, quarterly, semiannual, or annual) determines how often accrued gains join the principal base.",
        "Consistent monthly contributions dramatically accelerate compounding during market cycles compared to a lump sum alone.",
        "Inflation adjustment divides nominal future balances by (1 + inflation)^years so you see what your future portfolio actually buys in today's money.",
      ],
      workedExampleTitle: "Example: $10,000 Start + $500/Month at 8% Annual Return for 20 Years (2.5% Inflation)",
      workedExampleSteps: [
        "Total cash contributed out of pocket over 20 years: $10,000 + ($500 × 240) = $130,000.",
        "With monthly compounding at 8% nominal annual return, ending nominal balance reaches $343,780.",
        "Total investment gains earned from compounding: $213,780 (more than 62% of the final portfolio).",
        "Adjusting for 2.5% average annual inflation, the real purchasing power in today's dollars is ~$209,800.",
      ],
      workedExampleSummary:
        "Time in the market dominates contributions: in year 20 alone, annual compounding interest exceeds four times your yearly deposits.",
      faqs: [
        {
          question: "Why does inflation adjustment matter in a compound interest calculator?",
          answer:
            "A $1,000,000 balance 25 years from now will not buy what $1,000,000 buys today. Showing both nominal and inflation-adjusted real value keeps your retirement and savings goals grounded in reality.",
        },
        {
          question: "Does compounding frequency make a large difference?",
          answer:
            "At 8% APR, monthly compounding produces an effective yield of 8.30% vs. 8.00% for annual compounding. Over 20–30 years, that 0.30% difference compounds into meaningful extra wealth.",
        },
        {
          question: "What historical return rate is realistic for long-term index investing?",
          answer:
            "Broad US equities (such as the S&P 500) have historically averaged ~9–10% nominal (~6.5–7% after inflation) over multi-decade windows, though annual returns fluctuate widely and are never guaranteed.",
        },
      ],
    },
    tr: {
      slug: "bilesik-getiri-ve-yatirim-hesaplama",
      name: "Bileşik Getiri ve Yatırım Büyüme Hesaplama",
      shortName: "Bileşik Getiri",
      seoTitle: "Bileşik Getiri ve Düzenli Yatırım Hesaplama (Enflasyon Düzeltmeli) | FinValio",
      seoDescription:
        "Başlangıç sermayesi, aylık düzenli ekleme ve enflasyon etkisine göre yatırımınızın 1-60 yıllık nominal ve reel büyümesini grafikle hesaplayın.",
      tagline: "Düzenli aylık birikimin nominal ve enflasyondan arındırılmış reel büyüme projeksiyonu.",
      badge: "Reel Getiri Analizi",
      intro:
        "Küçük ama düzenli aylık yatırımların zaman içinde bileşik getiriyle nasıl kartopu etkisine dönüştüğünü keşfedin. Enflasyon düzeltmesi sayesinde 10 veya 20 yıl sonraki birikiminizin bugünün parasıyla gerçek alım gücünü görün.",
      formulaTitle: "Bileşik Getiri ve Reel Alım Gücü Formülü",
      formulaExpression:
        "Nominal Değer = P(1 + r/n)^(nt) + Aylık Katkı Bileşiği   |   Reel Değer = Nominal / (1 + Enflasyon)^t",
      methodologyPoints: [
        "Bileşik getiride her dönem elde edilen kazanç anaparaya eklenir ve sonraki dönemlerde 'getirinin getirisi' oluşur.",
        "Enflasyon oranı yüksek ekonomilerde sadece nominal rakama bakmak yanıltıcıdır; reel getiri grafiği gerçek servet artışını gösterir.",
        "Dolar/Euro bazlı küresel ETF veya eurobond yatırımları için para birimini USD/EUR seçerek düşük enflasyon senaryolarını da test edebilirsiniz.",
      ],
      workedExampleTitle: "Örnek: 100.000 TL Başlangıç + Aylık 10.000 TL Yatırım (%35 Yıllık Getiri, %25 Enflasyon, 10 Yıl)",
      workedExampleSteps: [
        "10 yıl boyunca cebinizden çıkan toplam anapara: 100.000 + (10.000 × 120) = 1.300.000 TL.",
        "Aylık bileşik %35 getiriyle 10. yıl sonunda nominal portföy yaklaşık 13,5 milyon TL'ye ulaşır.",
        "Yıllık %25 ortalama enflasyon etkisinden arındırıldığında, birikimin bugünkü gerçek alım gücü ~1,45 milyon TL'nin üzerinde reel değer taşır.",
      ],
      workedExampleSummary:
        "Gerçek servet inşası, enflasyonun üzerinde pozitif reel getiri sağlayan varlıklarda sabırla düzenli birikim yapmaktan geçer.",
      faqs: [
        {
          question: "Nominal getiri ile reel getiri arasındaki fark nedir?",
          answer:
            "Nominal getiri ekranda gördüğünüz toplam para artışıdır. Reel getiri ise enflasyon arındırıldıktan sonra gerçekte ne kadar fazla mal/hizmet alabildiğinizi gösterir.",
        },
        {
          question: "Düzenli aylık yatırım mı, tek seferlik toplu para mı daha etkilidir?",
          answer:
            "Başlangıç sermayesi ilk yıllarda güçlü fark yaratır ancak 10 yıl ve üzeri vadelerde her ay disiplinle eklenen tutarlar ve bunların bileşik getirisi toplam servetin ana motoru haline gelir.",
        },
        {
          question: "Dolar bazlı bileşik getiri hesaplayabilir miyim?",
          answer:
            "Evet, hesaplayıcının üst kısmındaki para birimi seçicisinden USD veya EUR seçip yıllık %7-%10 getiri ve %2,5-%3 enflasyon girerek döviz bazlı uzun vadeli projeksiyon oluşturabilirsiniz.",
        },
      ],
    },
  },
  {
    id: "deposit",
    category: "investing",
    icon: "piggy-bank",
    rpmTier: "very-high",
    relatedIds: ["compound", "inflation-vat", "loan"],
    en: {
      slug: "deposit-hysa-yield-calculator",
      name: "Deposit, CD & High-Yield Savings Calculator",
      shortName: "Deposit & HYSA",
      seoTitle: "High-Yield Savings (HYSA), CD & Term Deposit Tax Calculator | FinValio",
      seoDescription:
        "Calculate net after-tax interest on term deposits, CDs, and High-Yield Savings Accounts with withholding tax and multi-cycle rollover compounding.",
      tagline: "Exact term-day net interest after withholding tax plus automatic rollover compounding.",
      badge: "After-Tax Net Yield",
      intro:
        "Banks advertise gross annual interest rates, but what matters is your net after-tax yield. Calculate exact earnings for 32-day, 92-day, 181-day, or 1-year term deposits and CDs, including withholding tax and automatic maturity rollovers.",
      formulaTitle: "Term Deposit & Rollover Compounding Formula",
      formulaExpression:
        "Gross Interest = Principal × Rate × (Days / 365)   |   Net Interest = Gross × (1 − Tax Rate)",
      methodologyPoints: [
        "Uses the standard ACT/365 day-count convention used by retail banks for term deposits and CDs.",
        "Automatically deducts withholding or marginal income tax at maturity before rolling net proceeds into the next cycle.",
        "Displays the True Effective Annual Net Yield (APY after tax) so you can compare 32-day rollovers against 181-day or 365-day lockups fairly.",
      ],
      workedExampleTitle: "Example: $50,000 in a 90-Day Term CD at 4.75% Gross (22% Tax, 4 Rollovers)",
      workedExampleSteps: [
        "First 90-day gross interest: $50,000 × 4.75% × (90 / 365) = $585.62.",
        "Estimated tax at 22%: $128.84 → Net first-term interest: $456.78.",
        "Rolling over principal + net interest for 4 full cycles (360 days) yields $1,852.34 total net interest.",
        "Ending balance reaches $51,852.34, representing an effective annualized net yield of 3.76%.",
      ],
      workedExampleSummary:
        "Short-term rollovers compound faster, but locking a slightly higher rate or lower tax tier on longer maturities can outperform — test both in seconds.",
      faqs: [
        {
          question: "Why is my effective annual net yield higher when rolling over every 32 days?",
          answer:
            "Because each month's net interest is added to your principal and starts earning interest in the next cycle (compounding). However, if interest rates drop mid-year, renewal rates will change.",
        },
        {
          question: "What withholding tax rate should I use?",
          answer:
            "In the US, interest is taxed at your federal (and applicable state) marginal income tax rate. In Turkey, TL deposit withholding tax (stopaj) varies by maturity bucket — enter your bank's current rate directly.",
        },
        {
          question: "Does the calculator use 365 days per year?",
          answer:
            "Yes, standard 365-day retail banking convention is applied, which matches Turkish TL deposit calculations and most global CD schedules.",
        },
      ],
    },
    tr: {
      slug: "mevduat-faizi-ve-stopaj-hesaplama",
      name: "Mevduat Faizi ve Stopaj Hesaplama (Vade Yenilemeli)",
      shortName: "Mevduat & Stopaj",
      seoTitle: "Mevduat Faizi ve Stopaj Hesaplama 2026 | 32 Günlük Net Getiri | FinValio",
      seoDescription:
        "32 gün, 92 gün, 181 gün ve 1 yıl vadeli mevduat net faiz kazancı, güncel stopaj kesintisi ve bileşik vade yenileme tablosunu anında hesaplayın.",
      tagline: "Vade gününe göre net faiz, stopaj kesintisi ve çok dönemli bileşik yenileme simülasyonu.",
      badge: "32 / 92 / 181 Gün",
      intro:
        "Bankaların sunduğu brüt mevduat faizinden stopaj kesintisi sonrası elinize geçecek net kazancı hesaplayın. Vade sonunda faizi anaparaya ekleyerek 6 ay veya 1 yıl boyunca vade yenilediğinizde bileşik net getirinin kaç TL'ye ulaştığını görün.",
      formulaTitle: "Vadeli Mevduat Brüt/Net Getiri ve Stopaj Formülü",
      formulaExpression:
        "Brüt Faiz = Anapara × (Faiz / 100) × (Gün / 365)   |   Net Faiz = Brüt Faiz × (1 − Stopaj Oranı)",
      methodologyPoints: [
        "Bankacılık standartlarına uygun olarak 365 gün esası üzerinden brüt faiz hesaplanır.",
        "Stopaj oranı vadeye göre değişebildiği için 6 aya kadar, 1 yıla kadar ve 1 yıldan uzun vadeler için tek tıkla oran seçebilir veya özel stopaj girebilirsiniz.",
        "Vade Yenileme (Bileşik Dönem) kaydırıcısı ile faizin her vade sonunda anaparaya eklendiği gerçek yıllık efektif net getiriyi görürsünüz.",
      ],
      workedExampleTitle: "Örnek: 500.000 TL Mevduat, 32 Gün Vade, %42 Brüt Faiz, %15 Stopaj",
      workedExampleSteps: [
        "32 günlük brüt faiz: 500.000 × 0,42 × (32 / 365) = 18.410,96 TL.",
        "%15 stopaj kesintisi: 2.761,64 TL vergi olarak kesilir.",
        "İlk 32 gün sonunda ele geçen net faiz: 15.649,32 TL (Toplam bakiye: 515.649,32 TL).",
        "Aynı oranla 11 kez vade yenilendiğinde (352 gün) bileşik etkiyle yıllık efektif net getiri %41,9 bandına yaklaşır.",
      ],
      workedExampleSummary:
        "Aylık (32 günlük) mevduatta faizin anaparaya eklenerek yenilenmesi, basit yıllık faize kıyasla önemli bir bileşik getiri avantajı sağlar.",
      faqs: [
        {
          question: "Mevduat stopaj oranı neden vadelere göre değişir?",
          answer:
            "Türkiye'de TL mevduatlarda uzun vadeli tasarrufu teşvik etmek amacıyla 6 aya kadar, 6 ay-1 yıl arası ve 1 yıl üzeri vadelerde farklı stopaj oranları uygulanabilir. Güncel banka oranınızı doğrudan seçerek net kazancınızı görebilirsiniz.",
        },
        {
          question: "32 günlük mevduat mı 92 günlük mevduat mı daha kazançlıdır?",
          answer:
            "Faizlerin sabit kaldığı bir ortamda 32 günlük vade her ay bileşik etki yarattığı için efektif getiriyi yükseltir. Faizlerin düşeceği beklentisi varsa daha uzun vadede yüksek oranı sabitlemek avantajlı olabilir.",
        },
        {
          question: "Hesaplanan net getiri enflasyonun üzerinde mi kalıyor?",
          answer:
            "Net efektif yıllık getirinizi beklenen yıllık enflasyonla karşılaştırarak reel kazancınızı ölçebilirsiniz. Enflasyon hesaplayıcımızla alım gücü etkisini de test edebilirsiniz.",
        },
      ],
    },
  },
  {
    id: "severance",
    category: "income",
    icon: "briefcase",
    rpmTier: "high",
    relatedIds: ["salary", "deposit", "fire"],
    en: {
      slug: "severance-notice-pay-calculator",
      name: "Severance & Notice Pay Calculator (2026)",
      shortName: "Severance Pay (2026)",
      seoTitle: "2026 Severance & Notice Pay Calculator (Global & Turkey Cap) | FinValio",
      seoDescription:
        "Estimate your net severance package, unused PTO payout, and taxes — includes official 2026 Turkey Kıdem Tazminatı cap (73,729.87 TL) and notice weeks.",
      tagline: "Global severance + PTO package estimator and official 2026 Turkey Kıdem/İhbar engine.",
      badge: "2026 Cap Updated",
      intro:
        "Planning a career transition or reviewing a layoff package? Estimate your net severance payout, unused PTO compensation, and withholding taxes globally, or switch to the Turkey 2026 Labor Law engine with the official 73,729.87 TL H2 2026 severance cap.",
      formulaTitle: "Severance Package & Notice Pay Methodology",
      formulaExpression:
        "Global Net = (Weekly Salary × Years × Weeks/Yr + Unused PTO) × (1 − Tax %)  |  TR Kıdem = min(Dressed Gross, Cap) × (Days / 365) × (1 − 0.00759)",
      methodologyPoints: [
        "Global corporate severance formulas typically grant 1 to 2 weeks of base salary per completed year of service, plus payout of accrued unused PTO where required.",
        "Severance pay is generally taxed as supplemental income (e.g., 22% federal supplemental withholding in the US plus FICA and applicable state tax).",
        "In Turkey mode, statutory severance (Kıdem Tazminatı) requires at least 1 full year of tenure, is capped at 73,729.87 TL/year for H2 2026 (64,948.77 TL for H1 2026), and is subject only to 0.759% stamp tax.",
      ],
      workedExampleTitle: "Example: $110,000 Annual Salary, 6 Years Tenure (2 Weeks/Year + 10 PTO Days)",
      workedExampleSteps: [
        "Weekly base pay: $110,000 ÷ 52 = $2,115.38; daily pay (260 workdays): $423.08.",
        "Severance portion (6 years × 2 weeks = 12 weeks): $25,384.62.",
        "Unused PTO payout (10 days): $4,230.77 → Total Gross Package = $29,615.38.",
        "At 28% combined estimated tax withholding: ~$8,292.31 withheld → Net Payout ≈ $21,323.08.",
      ],
      workedExampleSummary:
        "Always check whether unused PTO, prorated bonuses, and health insurance (COBRA) subsidies are included before signing a separation agreement.",
      faqs: [
        {
          question: "How is severance pay taxed in the United States?",
          answer:
            "The IRS treats severance pay as supplemental wages subject to federal income tax withholding (commonly a 22% flat supplemental rate), Social Security, Medicare, and state income tax.",
        },
        {
          question: "What is the 2026 Turkey severance pay ceiling (Kıdem Tazminatı Tavanı)?",
          answer:
            "For January 1 – June 30, 2026 the cap is 64,948.77 TL, and for July 1 – December 31, 2026 the cap is 73,729.87 TL per year of service. Only 0.759% stamp tax is deducted from severance pay.",
        },
        {
          question: "How many weeks is statutory notice pay (İhbar Tazminatı) in Turkey?",
          answer:
            "Under Turkish Labor Law Article 17: 2 weeks (<6 months), 4 weeks (6–18 months), 6 weeks (18–36 months), and 8 weeks (>3 years). Both income tax and stamp tax apply to notice pay.",
        },
      ],
    },
    tr: {
      slug: "kidem-ve-ihbar-tazminati-hesaplama",
      name: "2026 Kıdem ve İhbar Tazminatı Hesaplama",
      shortName: "Kıdem & İhbar (2026)",
      seoTitle: "2026 Kıdem ve İhbar Tazminatı Hesaplama | 73.729,87 TL Güncel Tavan | FinValio",
      seoDescription:
        "2026 Temmuz-Aralık güncel 73.729,87 TL kıdem tazminatı tavanı, giydirilmiş brüt ücret, damga vergisi ve 2-8 haftalık ihbar tazminatını anında hesaplayın.",
      tagline: "2026 güncel 73.729,87 TL tavanı, giydirilmiş brüt maaş ve ihbar haftalarıyla kesin net hesap.",
      badge: "2026 2. Yarı Tavanı",
      intro:
        "İşten ayrılma veya işveren feshi durumunda hak edeceğiniz net kıdem ve ihbar tazminatını 2026 resmi tavan rakamlarıyla saniyeler içinde hesaplayın. Yol, yemek ve düzenli ikramiyeleri dahil ederek gerçek 'giydirilmiş brüt ücret' üzerinden net ödeme tutarını görün.",
      formulaTitle: "2026 Kıdem ve İhbar Tazminatı Yasal Hesaplama Formülü",
      formulaExpression:
        "Net Kıdem = min(Giydirilmiş Brüt, Tavan) × (Toplam Gün / 365) × (1 − 0,00759)   |   İhbar = (Brüt / 30) × İhbar Günü − (GV + DV)",
      methodologyPoints: [
        "2026 Kıdem Tazminatı Tavanı: 1 Ocak – 30 Haziran 2026 dönemi için 64.948,77 TL; 1 Temmuz – 31 Aralık 2026 dönemi için 73.729,87 TL'dir.",
        "Kıdem tazminatına hak kazanmak için aynı işverene bağlı en az 1 tam yıl (365 gün) çalışmış olmak gerekir ve yalnızca binde 7,59 (%0,759) damga vergisi kesilir; gelir vergisi kesilmez.",
        "İhbar Süreleri (4857 Sayılı İş Kanunu Md. 17): 6 aydan az → 2 hafta (14 gün), 6–18 ay → 4 hafta (28 gün), 18–36 ay → 6 hafta (42 gün), 3 yıldan fazla → 8 hafta (56 gün).",
        "İhbar tazminatında tavan sınırı yoktur; ancak çalışanın bulunduğu gelir vergisi dilimi (%15–%40) ve binde 7,59 damga vergisi kesilir.",
      ],
      workedExampleTitle: "Örnek: 5 Yıl 4 Ay Çalışma, 65.000 TL Brüt Maaş + 5.000 TL Yan Hak (2026 2. Yarı)",
      workedExampleSteps: [
        "Giydirilmiş Brüt Ücret: 65.000 + 5.000 = 70.000 TL (2026 2. yarı tavanı 73.729,87 TL altında kaldığı için tamamı esas alınır).",
        "Toplam çalışma süresi: (5 × 365) + (4 × 30) = 1.945 gün (5,3288 yıl).",
        "Brüt Kıdem Tazminatı: 70.000 × (1.945 / 365) = 373.013,70 TL; Damga Vergisi (%0,759) = 2.831,17 TL → Net Kıdem: 370.182,53 TL.",
        "İhbar Tazminatı (3 yıldan fazla → 8 hafta = 56 gün): Brüt 130.666,67 TL; %20 vergi dilimi ve damga vergisi sonrası Net İhbar: 103.541,57 TL.",
      ],
      workedExampleSummary:
        "Toplam Net Kıdem + İhbar Ödemesi: 473.724,10 TL. Kıdem tazminatı hesabına yemek kartı, servis/yol ve düzenli ikramiyelerin aylık ortalamasını eklemeyi unutmayın.",
      faqs: [
        {
          question: "Giydirilmiş brüt ücrete hangi yan haklar dahildir?",
          answer:
            "Çalışana süreklilik arz eden şekilde ödenen yol parası/servis, yemek yardımı/kartı, düzenli ikramiye, yakacak veya gıda yardımlarının aylık brüt karşılıkları giydirilmiş brüt ücrete eklenir. Fazla mesai ve tek seferlik primler dahil edilmez.",
        },
        {
          question: "Kendi isteğimle istifa edersem kıdem tazminatı alabilir miyim?",
          answer:
            "Genel kural olarak haklı neden olmadan istifada kıdem tazminatı doğmaz. Ancak emeklilik, askerlik, kadın çalışanın evlilik tarihinden itibaren 1 yıl içinde ayrılması veya İş Kanunu Md. 24 kapsamındaki haklı fesih hallerinde kıdem tazminatı alınabilir.",
        },
        {
          question: "Kıdem tazminatından gelir vergisi kesilir mi?",
          answer:
            "Hayır. Yasal tavan dahilinde ödenen kıdem tazminatı gelir vergisinden muaftır; yalnızca binde 7,59 (%0,759) oranında damga vergisi kesilir.",
        },
        {
          question: "İhbar tazminatında tavan sınırı var mı?",
          answer:
            "Hayır. Kıdem tazminatının aksine ihbar tazminatında herhangi bir üst tavan sınırı yoktur; gerçek giydirilmiş brüt ücret üzerinden hesaplanır.",
        },
      ],
    },
  },
  {
    id: "fire",
    category: "investing",
    icon: "flame",
    rpmTier: "very-high",
    relatedIds: ["compound", "salary", "rent-buy"],
    en: {
      slug: "fire-retirement-calculator",
      name: "FIRE & Early Retirement Calculator",
      shortName: "FIRE & Retirement",
      seoTitle: "FIRE & Early Retirement Calculator (4% Rule & Coast FIRE) | FinValio",
      seoDescription:
        "Calculate your exact FIRE number, Coast FIRE milestone, years to financial independence, and inflation-adjusted retirement portfolio projection.",
      tagline: "4% safe withdrawal rule, Coast FIRE target, and real-dollar independence timeline.",
      badge: "High-Precision FIRE",
      intro:
        "Map out the exact age when your investment portfolio can permanently cover your living expenses. Test different savings rates, expected real returns, and Safe Withdrawal Rates (3.5% to 4.5%) to find both your full FIRE number and your Coast FIRE milestone.",
      formulaTitle: "The 4% Rule, Real Return & Coast FIRE Formula",
      formulaExpression:
        "FIRE Target = Annual Expenses ÷ SWR   |   Real Return = (1 + r) / (1 + i) − 1   |   Coast FIRE = Target ÷ (1 + Real)^(65 − Age)",
      methodologyPoints: [
        "At a 4% Safe Withdrawal Rate (Trinity Study baseline), you need 25× your annual retirement spending invested in a diversified portfolio.",
        "For ultra-early retirements lasting 40–50 years, many planners test a more conservative 3.5% SWR (~28.6× annual expenses).",
        "Coast FIRE shows the lump sum you need invested today so that even if you stop contributing a single dollar, compounding alone carries you to full retirement by age 65.",
      ],
      workedExampleTitle: "Example: Age 32, $80,000 Invested, $2,000/Mo Saved, $52,000/Yr Retirement Spending",
      workedExampleSteps: [
        "At a 4% Safe Withdrawal Rate, your FIRE Number in today's dollars is $52,000 ÷ 0.04 = $1,300,000.",
        "Assuming 8% nominal return and 2.5% inflation, your real annualized return is 5.37%.",
        "With $80,000 starting capital and $2,000/month inflation-adjusted savings, your portfolio crosses $1.3M real value in ~20 years (Age 52).",
        "Your Coast FIRE milestone for traditional age-65 retirement is ~$231,400 today.",
      ],
      workedExampleSummary:
        "Increasing savings rate has a double benefit: it accelerates investment contributions while simultaneously lowering the annual spending target you need to fund.",
      faqs: [
        {
          question: "What is the 4% Rule in FIRE planning?",
          answer:
            "Derived from the Trinity Study, the 4% Rule suggests withdrawing 4% of your portfolio in year one of retirement and adjusting that dollar amount for inflation each subsequent year has historically sustained a balanced stock/bond portfolio for at least 30 years.",
        },
        {
          question: "What is Coast FIRE?",
          answer:
            "Coast FIRE is the point where your existing investments will grow to your full retirement target by age 65 without any further contributions — allowing you to switch to lower-stress or part-time work that only covers current bills.",
        },
        {
          question: "Why does the chart track real (today's) dollars against the FIRE target?",
          answer:
            "Because both your portfolio and your future living expenses inflate over time, comparing inflation-adjusted real portfolio value against today's FIRE number gives an apples-to-apples retirement date.",
        },
      ],
    },
    tr: {
      slug: "emeklilik-ve-finansal-ozgurluk-fire-hesaplama",
      name: "Emeklilik ve Finansal Özgürlük (FIRE) Hesaplama",
      shortName: "FIRE & Emeklilik",
      seoTitle: "Finansal Özgürlük (FIRE) ve Erken Emeklilik Hesaplama | %4 Kuralı | FinValio",
      seoDescription:
        "%4 güvenli çekim kuralı, Coast FIRE hedefi ve enflasyondan arındırılmış reel getiriyle finansal özgürlüğe ulaşacağınız yaşı hemen hesaplayın.",
      tagline: "%4 güvenli çekim kuralı, hedef portföy ve erken emeklilik yaşı projeksiyonu.",
      badge: "%4 Kuralı Analizi",
      intro:
        "Çalışma zorunluluğu olmadan yaşam giderlerinizi yatırım gelirlerinizle karşılayabileceğiniz 'Finansal Özgürlük (FIRE)' sayınızı ve hedef yaşınızı hesaplayın. Enflasyon düzeltmeli reel getiri projeksiyonu ile erken emeklilik yol haritanızı çıkarın.",
      formulaTitle: "%4 Kuralı, Reel Getiri ve Finansal Özgürlük Formülü",
      formulaExpression:
        "FIRE Hedefi = Yıllık Gider ÷ Güvenli Çekim Oranı   |   Reel Getiri = (1 + Nominal) / (1 + Enflasyon) − 1",
      methodologyPoints: [
        "%4 Kuralı (Trinity Çalışması): Yıllık yaşam giderinizin 25 katına ulaşan çeşitlendirilmiş bir portföyden her yıl reel olarak %4 çekildiğinde portföy uzun vadede tükenmeden sürdürülebilir.",
        "Daha temkinli erken emeklilik (40+ yıl) için güvenli çekim oranını %3,5 (giderin 28,6 katı) olarak test edebilirsiniz.",
        "Coast FIRE, bugünden itibaren ek birikim yapmasanız bile mevcut portföyünüzün 65 yaşında hedef emeklilik rakamına kendi kendine ulaşması için gereken eşik tutardır.",
      ],
      workedExampleTitle: "Örnek (USD Bazlı): 30 Yaş, $25.000 Birikim, Aylık $1.000 Yatırım, Yıllık $24.000 Gider",
      workedExampleSteps: [
        "Yıllık $24.000 ($2.000/ay) yaşam gideri için %4 kuralına göre FIRE Hedefi: $24.000 ÷ 0,04 = $600.000.",
        "Yıllık %8,5 nominal döviz getirisi ve %2,5 ABD enflasyonu ile yıllık reel getiri %5,85 olur.",
        "Aylık $1.000 düzenli yatırım ile yaklaşık 21 yılda (51 yaşında) $600.000 reel portföye ulaşılır.",
        "Hedefe ulaşıldığında portföy her ay bugünün alım gücüyle $2.000 pasif gelir üretebilir.",
      ],
      workedExampleSummary:
        "Türkiye'den FIRE planlarken hesaplamayı USD/EUR cinsinden yapmak, uzun vadeli kur ve enflasyon dalgalanmalarına karşı çok daha net bir yol haritası sunar.",
      faqs: [
        {
          question: "Finansal özgürlük (FIRE) hesaplamasını TL mi yoksa USD bazlı mı yapmalıyım?",
          answer:
            "10-30 yıllık uzun vadelerde kur ve enflasyon öngörülebilirliği daha yüksek olduğu için birçok yatırımcı FIRE hesabını USD veya EUR bazlı (örneğin %7-9 getiri, %2,5-3 enflasyon) yapmayı tercih eder.",
        },
        {
          question: "Tasarruf oranını artırmak neden emeklilik yaşını çok hızlı öne çeker?",
          answer:
            "Daha az harcayıp daha çok biriktirdiğinizde iki yönlü etki oluşur: Hem portföyünüz hızla büyür hem de 25 katını biriktirmeniz gereken yıllık gider hedefiniz küçülür.",
        },
        {
          question: "Coast FIRE ne anlama gelir?",
          answer:
            "Mevcut yatırımlarınızın artık tek kuruş ekleme yapmadan bileşik getiriyle 65 yaşında emeklilik hedefinize ulaşacağı kritik eşiktir. Bu eşiği geçenler sadece güncel yaşam masraflarını karşılayacak daha esnek işlere geçebilir.",
        },
      ],
    },
  },
  {
    id: "rent-buy",
    category: "housing",
    icon: "home",
    rpmTier: "very-high",
    relatedIds: ["loan", "compound", "inflation-vat"],
    en: {
      slug: "rent-vs-buy-calculator",
      name: "Rent vs. Buy & Rent Increase Calculator",
      shortName: "Rent vs. Buy",
      seoTitle: "Rent vs. Buy Home Calculator & Legal Rent Increase Estimator | FinValio",
      seoDescription:
        "Compare buying a home vs. renting and investing the difference over 5-30 years, plus instant CPI rent increase calculations.",
      tagline: "True 5–30 year buyer vs. renter net worth comparison plus annual rent increase math.",
      badge: "Net Worth Comparison",
      intro:
        "Buying isn't always cheaper than renting — and renting isn't always 'throwing money away.' Model the exact opportunity cost of your down payment, mortgage interest, home appreciation, maintenance costs, and annual rent hikes to see which builds more wealth over your timeframe.",
      formulaTitle: "Opportunity Cost & Multi-Year Net Worth Framework",
      formulaExpression:
        "Buyer Net Worth = Home Value × (1 − 4% Selling Cost) − Remaining Mortgage   vs.   Renter Portfolio = Invested Down Payment + Monthly Savings",
      methodologyPoints: [
        "Tracks buyer equity net of a realistic 4% eventual selling/closing cost so short holding horizons aren't overstated.",
        "Credits the renter with investing both the unspent down payment and any monthly cash-flow difference (mortgage + ownership costs − rent) at your expected market return.",
        "Includes a quick Annual Rent Increase calculator tab for CPI / TÜFE lease renewal checks.",
      ],
      workedExampleTitle: "Example: $420,000 Home (20% Down, 6.5% Rate) vs. $2,200/Mo Rent Over 10 Years",
      workedExampleSteps: [
        "Buyer puts $84,000 down and pays ~$2,124/mo mortgage plus ~1.5%/yr property tax & maintenance (~$525/mo initially).",
        "Renter invests the $84,000 down payment plus the initial ~$449/mo cash savings into a portfolio earning 7.5% annually.",
        "With 3.5% annual home appreciation and 3.5% annual rent inflation, the renter often stays ahead in years 1–6 due to closing costs and high initial interest.",
        "By year 9–12, fixed mortgage payments plus leveraged home equity begin pulling ahead depending on local price-to-rent ratios.",
      ],
      workedExampleSummary:
        "Time horizon is king: if you plan to move within 4–5 years, transaction costs usually favor renting; over 10+ years, home equity and fixed housing costs often win.",
      faqs: [
        {
          question: "What is a healthy price-to-rent ratio?",
          answer:
            "Divide home price by annual rent. Ratios under 15 strongly favor buying, 16–20 are balanced depending on mortgage rates, and ratios above 21–25 often favor renting and investing the savings.",
        },
        {
          question: "Why does the calculator include 4% selling friction?",
          answer:
            "Real estate isn't liquid like stocks. Agent commissions, title fees, and closing taxes typically consume 3%–6% of the sale price when you sell.",
        },
        {
          question: "Can I calculate Turkish TÜFE legal rent increase here?",
          answer:
            "Yes! Switch to the 'Rent Increase (CPI / TÜFE)' tab at the top of the tool to compute exact monthly and annual lease renewal increases in one click.",
        },
      ],
    },
    tr: {
      slug: "kira-artis-orani-ve-ev-alma-hesaplama",
      name: "Kira Artış Oranı (TÜFE) ve Ev Almak mı Kiralamak mı?",
      shortName: "Kira Artışı & Konut",
      seoTitle: "Kira Artış Oranı (TÜFE) Hesaplama ve Ev Almak mı Kiralamak mı? | FinValio",
      seoDescription:
        "12 aylık TÜFE ortalamasına göre yasal kira zammı hesaplama ve peşinatı yatırımda değerlendirme vs. konut kredisi ile ev alma net servet kıyaslaması.",
      tagline: "Yasal TÜFE kira zammı hesabı ve 5-30 yıllık Ev Almak mı Kiralamak mı servet simülasyonu.",
      badge: "TÜFE & Konut Analizi",
      intro:
        "Kira yenileme dönemindeki yasal TÜFE artış tutarını saniyeler içinde hesaplayın; ardından 'Ev Almak mı Kiralamak mı?' simülatörüyle peşinatı yatırımda tutmak ile kredi çekip ev sahibi olmanın 10 yıllık net servet farkını veriye dayalı kıyaslayın.",
      formulaTitle: "Yasal Kira Artışı ve Servet Karşılaştırma Metodolojisi",
      formulaExpression:
        "Yeni Kira = Mevcut Kira × (1 + TÜFE %)   |   Ev Sahibi Net Serveti vs. Kiracı Yatırım Portföyü",
      methodologyPoints: [
        "Kira Artış Hesabı: Türk Borçlar Kanunu Md. 344 gereği konut ve işyeri kira yenilemelerinde yasal üst sınır TÜİK 12 aylık TÜFE ortalamasıdır.",
        "Ev Almak mı Kiralamak mı Analizi: Ev alıcısının peşinatı, aylık kredi taksiti ve bakım/vergi giderlerine karşılık kiracının peşinatını ve aylık nakit farkını yatırımda bileşik büyütmesini karşılaştırır.",
        "Ev değer artışı, yıllık kira artış oranı ve alternatif yatırım getirisi kaydırıcılarıyla kendi piyasa beklentinizi anında test edebilirsiniz.",
      ],
      workedExampleTitle: "Örnek: 25.000 TL Mevcut Kira (%45 TÜFE Artışı) & 4.500.000 TL Konut Kıyaslaması",
      workedExampleSteps: [
        "Mevcut kira 25.000 TL ve yasal TÜFE oranı %45 ise aylık artış 11.250 TL olur.",
        "Yeni aylık kira bedeli 36.250 TL'ye, yıllık toplam kira gideri ise 435.000 TL'ye çıkar.",
        "Ev fiyatının yıllık kiraya oranı (Amortisman süresi) 15 yılın altındaysa konut almak uzun vadede güçlü bir servet kaldıraç etkisi yaratır.",
      ],
      workedExampleSummary:
        "Kira çarpanı (Ev Fiyatı ÷ Aylık Kira) 180 ayın altındaysa satın alma; 250 ayın üzerindeyse ve kredi faizleri yüksekse kirada kalıp sermayeyi reel getiride büyütmek öne çıkabilir.",
      faqs: [
        {
          question: "Konutlarda yasal kira artış oranı neye göre belirlenir?",
          answer:
            "Konut kira sözleşmelerinde yenileme dönemi yasal artış tavanı, TÜİK tarafından her ay açıklanan 12 aylık ortalamalara göre TÜFE değişim oranıdır.",
        },
        {
          question: "Ev fiyatının kira çarpanı (amortisman) kaç yıl olmalıdır?",
          answer:
            "Türkiye'de genel kabul gören dengeli kira çarpanı 180-216 ay (15-18 yıl) bandıdır. 15 yılın altı satın alma lehine, 22 yılın üzeri ise yatırım getirisi yüksek dönemlerde kiralama lehine sinyal verir.",
        },
        {
          question: "Simülasyon evi satarken oluşan masrafları hesaba katıyor mu?",
          answer:
            "Evet. Ev sahibinin net serveti hesaplanırken tapu harcı ve emlak komisyonu gibi gerçekçi satış sürtünme maliyetleri (%4) düşülerek adil bir karşılaştırma yapılır.",
        },
      ],
    },
  },
  {
    id: "inflation-vat",
    category: "business",
    icon: "percent",
    rpmTier: "high",
    relatedIds: ["compound", "salary", "deposit"],
    en: {
      slug: "inflation-vat-freelance-calculator",
      name: "Inflation, VAT & Freelance Rate Calculator",
      shortName: "Inflation, VAT & Rate",
      seoTitle: "Inflation Purchasing Power, VAT/Sales Tax & Freelance Hourly Rate | FinValio",
      seoDescription:
        "Measure cash purchasing power loss from inflation, compute VAT inclusive/exclusive invoices with withholding, and price your freelance hourly rate.",
      tagline: "Three essential tools: purchasing power decay, VAT/withholding invoice math & freelance pricing.",
      badge: "3-in-1 Business Suite",
      intro:
        "Protect your margins and purchasing power. Track how inflation erodes idle cash over time, calculate exact VAT/Sales Tax invoices (including Turkey Tevkifat ratios), and reverse-engineer the hourly rate you must charge as a freelancer to hit your net income goal.",
      formulaTitle: "Purchasing Power, VAT & Freelance Billing Formulas",
      formulaExpression:
        "Real Cash Value = Amount ÷ (1 + i)^n   |   VAT Base = Gross ÷ (1 + VAT)   |   Hourly Rate = [Net ÷ (1 − Tax) + Expenses] ÷ Billable Hours",
      methodologyPoints: [
        "Inflation Decay shows both what today's basket will cost in N years and what cash sitting idle in a 0% account will really be worth.",
        "VAT Calculator supports both tax-exclusive and tax-inclusive totals plus partial VAT withholding (Tevkifat 2/10 through 9/10).",
        "Freelance Hourly Rate accounts for non-billable weeks (vacation, admin, sales), overhead expenses, and self-employment/income taxes so you never underprice your time.",
      ],
      workedExampleTitle: "Example: Freelancer Targeting $90,000 Net Income ($8,000 Expenses, 28% Tax, 46 Weeks × 30 Billable Hrs)",
      workedExampleSteps: [
        "Pre-tax profit needed to net $90,000 after 28% effective tax: $90,000 ÷ 0.72 = $125,000.",
        "Add $8,000 annual software, equipment, and insurance overhead → Required Annual Revenue: $133,000.",
        "Total realistic billable hours per year (46 weeks × 30 billable hrs/wk): 1,380 hours.",
        "Minimum target billing rate: $133,000 ÷ 1,380 = $96.38/hour ($771/day).",
      ],
      workedExampleSummary:
        "Most new freelancers divide desired salary by 2,080 hours and drastically undercharge — accounting for taxes, overhead, and non-billable time prevents burnout.",
      faqs: [
        {
          question: "How fast does 5% annual inflation cut purchasing power in half?",
          answer:
            "By the Rule of 72 (72 ÷ 5), 5% annual inflation cuts the real purchasing power of uninvested cash in half in roughly 14.4 years.",
        },
        {
          question: "How do I extract VAT from a VAT-inclusive price?",
          answer:
            "Divide the total gross price by (1 + VAT rate). For example, at 20% VAT, a $120 gross invoice has a net base of $120 ÷ 1.20 = $100 and $20 VAT — not 20% of $120.",
        },
        {
          question: "How many billable hours per week is realistic for freelancers?",
          answer:
            "Even working 40–45 hours per week, independent consultants typically bill 25 to 32 hours after accounting for client acquisition, invoicing, admin, and learning.",
        },
      ],
    },
    tr: {
      slug: "enflasyon-kdv-ve-freelance-ucret-hesaplama",
      name: "Enflasyon, KDV/Tevkifat ve Freelance Ücret Hesaplama",
      shortName: "Enflasyon, KDV & Freelance",
      seoTitle: "Enflasyon Alım Gücü, KDV Tevkifat ve Freelance Saatlik Ücret Hesaplama | FinValio",
      seoDescription:
        "Paranın enflasyon karşısındaki reel alım gücü kaybını, %1-%10-%20 KDV dahil/hariç ve tevkifatlı faturayı, ayrıca hedef net gelire göre freelance saatlik ücreti hesaplayın.",
      tagline: "Enflasyon alım gücü grafiği, KDV & Tevkifat fatura hesabı ve freelance fiyatlandırma aracı.",
      badge: "3'ü 1 Arada İş Paketi",
      intro:
        "Nakit paranızın enflasyon karşısında ne kadar eridiğini görün, %1 / %10 / %20 KDV dahil-hariç ve tevkifatlı fatura tutarlarını hatasız çıkarın ve serbest çalışan (freelancer) olarak hedeflediğiniz net gelir için saatlik kaç TL/USD fatura kesmeniz gerektiğini hesaplayın.",
      formulaTitle: "Alım Gücü, KDV/Tevkifat ve Freelance Fiyatlama Formülleri",
      formulaExpression:
        "Reel Değer = Tutar ÷ (1 + Enflasyon)^Yıl   |   KDV Hariç = Toplam ÷ (1 + KDV)   |   Saatlik Ücret = [Net ÷ (1 − Vergi) + Gider] ÷ Faturalanabilir Saat",
      methodologyPoints: [
        "Enflasyon Modülü: Bugünkü bir tutarın yıllar içinde alım gücünün ne kadar eridiğini ve aynı alım gücünü korumak için kaç TL'ye ihtiyaç duyulduğunu gösterir.",
        "KDV & Tevkifat Modülü: KDV dahil/hariç hesaplamaya ek olarak 2/10, 3/10, 4/10, 5/10, 7/10 ve 9/10 tevkifat oranlarında alıcı ve satıcı KDV dağılımını otomatik çıkarır.",
        "Freelance Modülü: Yıllık net kazanç hedefiniz, işletme giderleriniz (muhasebe, Bağ-Kur, yazılım) ve vergi oranınıza göre faturalamanız gereken saatlik ve günlük ücreti hesaplar.",
      ],
      workedExampleTitle: "Örnek: 100.000 TL + %20 KDV'li ve 5/10 Tevkifatlı Hizmet Faturası",
      workedExampleSteps: [
        "KDV Hariç Matrah: 100.000,00 TL; Hesaplanan Toplam KDV (%20): 20.000,00 TL.",
        "5/10 Tevkifat uygulandığında alıcının devlete doğrudan ödeyeceği (tevkif edilen) KDV: 10.000,00 TL.",
        "Satıcıya ödenecek KDV tutarı: 10.000,00 TL.",
        "Fatura Ödenecek Toplam Tutar: 100.000 + 10.000 = 110.000,00 TL olur.",
      ],
      workedExampleSummary:
        "KDV dahil tutardan matrah bulurken yüzdeyi doğrudan çıkarmak yaygın bir hatadır; her zaman (1 + KDV oranı) ile bölme yapılmalıdır.",
      faqs: [
        {
          question: "KDV dahil fiyattan KDV hariç tutar nasıl bulunur?",
          answer:
            "KDV dahil toplam tutar (1 + KDV oranı) sayısına bölünür. Örneğin %20 KDV dahil 1.200 TL'nin KDV hariç matrahı 1.200 ÷ 1,20 = 1.000 TL, KDV'si ise 200 TL'dir.",
        },
        {
          question: "KDV tevkifatı nedir, faturayı nasıl etkiler?",
          answer:
            "Tevkifat, KDV'nin tamamının satıcıya ödenmesi yerine belirli bir oranının (örneğin 5/10 veya 9/10) alıcı tarafından doğrudan vergi dairesine yatırılmasıdır. Satıcının tahsil edeceği fatura tutarı tevkif edilen KDV kadar azalır.",
        },
        {
          question: "Freelance çalışırken haftada kaç saat faturalanabilir kabul edilmeli?",
          answer:
            "Müşteri görüşmeleri, teklif hazırlama, muhasebe ve izin günleri düşünüldüğünde tam zamanlı çalışan bir freelancer için haftada ortalama 25-30 faturalanabilir saat (yılda ~46 hafta) gerçekçi bir bazdır.",
        },
      ],
    },
  },
];

export function getCalculatorById(id: CalculatorId): CalculatorDefinition {
  const found = CALCULATORS.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown calculator id: ${id}`);
  return found;
}

export function getCalculatorBySlug(locale: Locale, slug: string): CalculatorDefinition | undefined {
  return CALCULATORS.find((c) => c[locale].slug === slug);
}

export function getCalculatorUrl(calc: CalculatorDefinition, locale: Locale): string {
  const base = locale === "tr" ? "/tr/hesaplayicilar" : "/en/calculators";
  return `${base}/${calc[locale].slug}`;
}
