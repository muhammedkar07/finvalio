import type { CalculatorId } from "@/lib/calculators/registry";
import type { Locale } from "@/lib/i18n";

export interface GuideSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LocalizedGuide {
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  readTimeMin: number;
  categoryLabel: string;
  sections: GuideSection[];
}

export interface GuideDefinition {
  id: string;
  publishedAt: string;
  updatedAt: string;
  relatedCalculatorId: CalculatorId;
  en: LocalizedGuide;
  tr: LocalizedGuide;
}

export const GUIDES: GuideDefinition[] = [
  {
    id: "tax-brackets-2026",
    publishedAt: "2026-01-15",
    updatedAt: "2026-07-05",
    relatedCalculatorId: "salary",
    en: {
      slug: "2026-income-tax-brackets-guide",
      title: "2026 Income Tax Brackets & Paycheck Optimization Guide (US & Turkey)",
      seoTitle: "2026 Income Tax Brackets & Take-Home Pay Optimization Guide | FinValio",
      seoDescription:
        "Complete breakdown of 2026 IRS federal brackets, standard deductions, Social Security wage cap, and Turkey 2026 progressive payroll brackets.",
      excerpt:
        "Learn how 2026 inflation-adjusted federal brackets, standard deductions, and pre-tax contributions change your real take-home pay.",
      readTimeMin: 6,
      categoryLabel: "Salary & Tax",
      sections: [
        {
          heading: "Why Marginal Rate Is Never Your Effective Tax Rate",
          paragraphs: [
            "One of the most persistent myths in personal finance is that earning a raise that pushes you into a higher tax bracket can reduce your take-home pay. Under progressive tax systems in both the United States and Turkey, higher percentages apply strictly to the slice of taxable income above each threshold.",
            "In 2026, a single US filer gets a $16,100 standard deduction before the first dollar is taxed at 10%. Even someone earning $100,000 gross typically pays an effective federal income tax rate near 13%–14%, well below their 22% marginal bracket.",
          ],
        },
        {
          heading: "2026 Key Numbers Every Earner Should Know",
          paragraphs: [
            "IRS inflation indexing shifted every bracket upward for 2026, providing modest tax relief if your income grew slower than inflation.",
          ],
          bullets: [
            "US Standard Deduction (2026): $16,100 Single | $32,200 Married Filing Jointly | $24,150 Head of Household.",
            "US Social Security Wage Cap (2026): $184,500 (maximum employee contribution $11,439 at 6.2%).",
            "Turkey 2026 Minimum Wage Exemption: 33,030 TRY monthly gross (28,075.50 TRY net) exempts the equivalent income and stamp tax for every salaried worker.",
            "Turkey 2026 Wage Brackets: 15% up to 190,000 TRY, 20% to 400,000 TRY, 27% to 1,500,000 TRY, 35% to 5,300,000 TRY, and 40% above.",
          ],
        },
        {
          heading: "Three Legal Ways to Keep More of Your 2026 Paycheck",
          paragraphs: [
            "First, maximize employer-matched pre-tax 401(k) contributions — every pre-tax dollar reduces your top marginal bracket first. Second, utilize Section 125 employer health plans or HSAs, which avoid both federal income tax and FICA payroll tax. Third, review your W-4 withholding whenever your filing status or secondary income changes so you aren't giving the government an interest-free loan all year.",
          ],
        },
      ],
    },
    tr: {
      slug: "2026-gelir-vergisi-dilimleri-ve-maas-rehberi",
      title: "2026 Gelir Vergisi Dilimleri ve Brüt-Net Maaş Rehberi",
      seoTitle: "2026 Gelir Vergisi Dilimleri, Asgari Ücret İstisnası ve Maaş Rehberi | FinValio",
      seoDescription:
        "2026 ücret gelirleri vergi dilimleri (190K-5.3M TL), 33.030 TL asgari ücret istisnası, SGK tavanı ve yıl içi maaş düşüşünü yönetme rehberi.",
      excerpt:
        "2026 yılı resmi vergi dilimleriyle maaşınızın yıl içinde neden değiştiğini, asgari ücret istisnasının bordronuza etkisini ve net-brüt farkını öğrenin.",
      readTimeMin: 6,
      categoryLabel: "Maaş & Vergi",
      sections: [
        {
          heading: "2026 Ücret Gelirleri Vergi Dilimleri Nasıl İşler?",
          paragraphs: [
            "Türkiye'de maaşlı çalışanların gelir vergisi, yıllık kümülatif gelir vergisi matrahı üzerinden artan oranlı olarak hesaplanır. Her ay brüt maaşınızdan %14 SGK işçi payı ve %1 işsizlik sigortası kesildikten sonra kalan tutar, o ayın gelir vergisi matrahını oluşturur ve bir önceki ayların matrahına eklenir.",
            "2026 yılı için ilk dilim 190.000 TL (%15), ikinci dilim 400.000 TL (%20), üçüncü dilim 1.500.000 TL (%27), dördüncü dilim 5.300.000 TL (%35) ve üzeri %40 olarak belirlenmiştir. Bir üst dilime geçtiğinizde yalnızca o sınırı aşan kısım yüksek orandan vergilendirilir.",
          ],
        },
        {
          heading: "Asgari Ücret Vergi İstisnası Yüksek Maaşlıları da Etkiler mi?",
          paragraphs: [
            "Evet. 2026 yılında tüm çalışanların maaşından, aylık 33.030 TL brüt asgari ücrete karşılık gelen gelir vergisi ve damga vergisi istisna olarak düşülür. Böylece maaşınız ne kadar yüksek olursa olsun bordronuzda her ay belirli bir vergi avantajı oluşur.",
          ],
          bullets: [
            "2026 Brüt Asgari Ücret: 33.030,00 TL | Net Asgari Ücret: 28.075,50 TL.",
            "2026 Aylık SGK Prime Esas Kazanç Tavanı: 247.725,00 TL (asgari ücretin 7,5 katı).",
            "Aylık Damga Vergisi Oranı: Binde 7,59 (%0,759) — 250,70 TL'lik kısmı istisnadır.",
          ],
        },
        {
          heading: "İş Teklifinde Brüt mü Net mi Anlaşmalısınız?",
          paragraphs: [
            "Brüt maaş teklifi değerlendirilirken Ocak ayı net maaşına bakarak karar vermek sık yapılan bir hatadır. Yılın ikinci yarısında %27 veya %35 dilimine girildiğinde aylık net gelir hissedilir biçimde düşer. Her zaman 12 aylık toplam net gelir ve aylık ortalama net maaş üzerinden kıyaslama yapın.",
          ],
        },
      ],
    },
  },
  {
    id: "mortgage-payoff-strategy",
    publishedAt: "2026-02-02",
    updatedAt: "2026-06-20",
    relatedCalculatorId: "loan",
    en: {
      slug: "how-to-pay-off-mortgage-faster",
      title: "How Extra Principal Payments Cut Years Off Your Mortgage",
      seoTitle: "How Extra Principal Payments Cut Years Off Your Mortgage | FinValio",
      seoDescription:
        "Understand loan amortization front-loading, when extra principal payments beat investing, and how biweekly or small monthly additions save $100K+.",
      excerpt:
        "Why early mortgage payments are mostly interest — and the exact math showing how modest extra payments save tens of thousands.",
      readTimeMin: 5,
      categoryLabel: "Loans & Credit",
      sections: [
        {
          heading: "The Amortization Front-Loading Reality",
          paragraphs: [
            "In year one of a 30-year mortgage at 6.5% APR, nearly 85% of every monthly payment goes strictly to interest, while only 15% reduces your loan balance. That ratio slowly flips over three decades.",
            "Because interest is recalculated each month on your remaining principal, every extra $100 applied to principal in year one prevents 29+ years of compounding interest on that slice.",
          ],
        },
        {
          heading: "Pay Off Debt vs. Invest: The After-Tax Breakeven Test",
          paragraphs: [
            "Paying down a 6.5% mortgage delivers a guaranteed, risk-free 6.5% after-tax return (assuming you take the standard deduction). To beat that in a taxable brokerage account, an investment would need roughly 7.6%–8.2% pre-tax return while taking market volatility risk.",
          ],
          bullets: [
            "Always confirm your lender applies extra payments directly to 'Principal Only' — never 'Paid Ahead.'",
            "Build a 3–6 month emergency fund before locking extra cash into illiquid home equity.",
            "Verify your loan contract has no prepayment penalty before making lump-sum reductions.",
          ],
        },
      ],
    },
    tr: {
      slug: "kredi-maliyetini-dusurme-ve-erken-odeme-rehberi",
      title: "Kredi Maliyetini Düşürme: KKDF, BSMV ve Erken Ödeme Matematiği",
      seoTitle: "Kredi Maliyetini Düşürme: KKDF, BSMV ve Ara Ödeme Rehberi | FinValio",
      seoDescription:
        "İhtiyaç ve konut kredisinde KKDF/BSMV etkisini, efektif yıllık maliyet oranını ve ara ödemeyle toplam faizi düşürmenin matematiğini öğrenin.",
      excerpt:
        "Kredi taksitlerinin ilk aylarda neden ağırlıklı faize gittiğini, KKDF/BSMV farkını ve erken anapara ödemesinin gerçek kazancını inceleyin.",
      readTimeMin: 5,
      categoryLabel: "Kredi & Konut",
      sections: [
        {
          heading: "Tabela Faizi ile Gerçek Efektif Maliyet Farkı",
          paragraphs: [
            "Banka reklamlarında gördüğünüz aylık faiz oranı, ihtiyaç ve taşıt kredilerinde ödeyeceğiniz gerçek maliyet değildir. Her ay oluşan faiz tutarı üzerine %15 KKDF ve %15 BSMV eklenir. Yani %3,50 tabela faizi fiilen %4,55 aylık maliyete çıkar.",
            "Bireysel konut kredileri ise KKDF ve BSMV'den muaftır. Bu nedenle aynı faiz oranında bile konut kredisi ihtiyaç kredisinden çok daha düşük toplam geri ödemeye sahiptir.",
          ],
        },
        {
          heading: "Kredinin İlk Yarısında Yapılan Ara Ödemeler Neden Çok Değerlidir?",
          paragraphs: [
            "Eşit taksitli (anüite) ödeme planında ilk taksitlerin büyük bölümü faizden, küçük bölümü anaparadan oluşur. Kredinin son aylarına gelindiğinde faizin büyük kısmı zaten ödenmiş olur.",
            "Elinize toplu nakit geçtiğinde kredinin ilk %40'lık döneminde yapılacak kısmi erken kapama veya vade kısaltma işlemi, toplam faiz yükünde dramatik tasarruf sağlar.",
          ],
          bullets: [
            "Konut kredisinde erken kapama ücreti yasal olarak kalan vadesi 36 ayı aşmayanlarda %1, aşanlarda en fazla %2 ile sınırlıdır.",
            "Ara ödeme yaparken taksiti düşürmek yerine vadeyi kısaltmak her zaman daha fazla faiz tasarrufu sağlar.",
            "Farklı bankaları kıyaslarken dosya masrafı + sigorta dahil 'Yıllık Maliyet Oranı'na bakın.",
          ],
        },
      ],
    },
  },
  {
    id: "compound-real-return",
    publishedAt: "2026-02-18",
    updatedAt: "2026-07-01",
    relatedCalculatorId: "compound",
    en: {
      slug: "compound-interest-and-real-return",
      title: "Nominal vs. Real Compounding: Why Inflation Changes Everything",
      seoTitle: "Nominal vs. Real Compound Interest: Inflation-Adjusted Wealth Guide | FinValio",
      seoDescription:
        "Why nominal returns mislead long-term investors, how to compute Fisher real returns, and how regular monthly contributions drive compounding.",
      excerpt:
        "A 10% nominal return in 8% inflation is barely treading water. Here is how to model real purchasing power accurately.",
      readTimeMin: 5,
      categoryLabel: "Investing",
      sections: [
        {
          heading: "The Illusion of Nominal Returns",
          paragraphs: [
            "Seeing an account balance double in nominal terms feels rewarding, yet if consumer prices also doubled over the same span, your real wealth did not move an inch. True wealth creation happens exclusively through positive real returns.",
            "Economists use the Fisher equation: Real Return = (1 + Nominal Rate) ÷ (1 + Inflation Rate) − 1. At 9% nominal return and 3% inflation, your real compounding rate is 5.83% — the exact rate at which your future lifestyle expands.",
          ],
        },
        {
          heading: "Consistency Beats Timing",
          paragraphs: [
            "Automated monthly contributions eliminate emotional market timing and exploit dollar-cost averaging. Starting five years earlier with smaller monthly deposits routinely beats starting late with double the monthly contribution.",
          ],
        },
      ],
    },
    tr: {
      slug: "bilesik-getiri-ve-enflasyon-ustu-reel-kazanc",
      title: "Bileşik Getiri ve Enflasyon Üstü Reel Kazanç Stratejisi",
      seoTitle: "Bileşik Getiri ve Enflasyon Üstü Reel Kazanç Rehberi | FinValio",
      seoDescription:
        "Yüksek enflasyon ortamında nominal getiri yanılsaması, Fisher reel getiri denklemi ve düzenli aylık yatırımla gerçek servet oluşturma.",
      excerpt:
        "Yüksek faiz veya yüksek getiri her zaman zenginleşmek demek değildir. Enflasyondan arındırılmış gerçek bileşik büyümeyi doğru okuyun.",
      readTimeMin: 5,
      categoryLabel: "Yatırım",
      sections: [
        {
          heading: "Nominal Getiri Yanılsamasına Dikkat",
          paragraphs: [
            "Yıllık %40 getiri sağlayan bir yatırım, yıllık enflasyon %45 iken size gerçekte para kaybettirir. Hesabınızdaki rakam büyümüş görünse de satın alabileceğiniz mal ve hizmet miktarı azalır.",
            "Gerçek servet artışını ölçmek için Fisher formülü kullanılır: Reel Getiri = (1 + Nominal Getiri) ÷ (1 + Enflasyon) − 1. Yatırım kararlarınızı her zaman bu reel oran üzerinden değerlendirmelisiniz.",
          ],
        },
        {
          heading: "Zaman Kaldıracı ve Düzenli Birikim",
          paragraphs: [
            "Bileşik getirinin asıl sıçraması ilk 3 yılda değil, 8. ila 20. yıllar arasında gerçekleşir. Gelirinizin sabit bir yüzdesini her ay otomatik olarak reel getiri üreten çeşitlendirilmiş varlıklara aktarmak uzun vadede en güvenilir servet inşası yöntemidir.",
          ],
        },
      ],
    },
  },
  {
    id: "severance-rights-2026",
    publishedAt: "2026-07-03",
    updatedAt: "2026-07-10",
    relatedCalculatorId: "severance",
    en: {
      slug: "severance-and-notice-pay-rules-2026",
      title: "2026 Severance & Notice Pay Rules: What to Check Before Signing",
      seoTitle: "2026 Severance Package & Turkey Kıdem Tazminatı Cap Guide | FinValio",
      seoDescription:
        "How severance packages are calculated and taxed globally and under Turkey's 2026 73,729.87 TL statutory cap, plus negotiation checklist.",
      excerpt:
        "Understand base salary vs. dressed gross pay, statutory caps, unused PTO, and tax withholding before accepting a separation package.",
      readTimeMin: 5,
      categoryLabel: "Career & Pay",
      sections: [
        {
          heading: "Key Components of a Fair Severance Package",
          paragraphs: [
            "While US federal law does not mandate severance pay unless covered by a contract or WARN Act notice period, corporate packages typically offer 1 to 2 weeks per year of service plus unused accrued PTO and temporary health coverage.",
            "In Turkey, statutory severance (Kıdem Tazminatı) is legally protected for qualifying terminations after 1 full year of employment, calculated at 30 days of dressed gross pay per year up to the H2 2026 cap of 73,729.87 TL.",
          ],
        },
        {
          heading: "Checklist Before Signing Any Release Agreement",
          paragraphs: [
            "Never sign under same-day pressure. Verify the exact calculation of tenure days, recurring allowances, prorated annual bonuses, and tax withholding treatment.",
          ],
          bullets: [
            "Confirm whether severance is paid as a lump sum or salary continuation (which can affect benefits and tax year timing).",
            "Ask whether unused vacation/PTO days are paid out separately.",
            "Check if outplacement support or equity vesting acceleration is negotiable.",
          ],
        },
      ],
    },
    tr: {
      slug: "2026-kidem-ve-ihbar-tazminati-haklari-rehberi",
      title: "2026 Kıdem ve İhbar Tazminatı Hakları: Tavan, Yan Haklar ve Kesintiler",
      seoTitle: "2026 Kıdem ve İhbar Tazminatı Rehberi | 73.729,87 TL Tavan | FinValio",
      seoDescription:
        "2026 güncel kıdem tazminatı tavanı, giydirilmiş brüt ücret hesabı, ihbar süreleri ve işten ayrılırken kontrol edilmesi gereken tüm yasal haklar.",
      excerpt:
        "Kıdem tazminatı hesabında sık unutulan yol, yemek ve ikramiye hakları ile 2026 yılı 73.729,87 TL tavanının bordroya etkisini öğrenin.",
      readTimeMin: 6,
      categoryLabel: "Çalışma Hayatı",
      sections: [
        {
          heading: "2026 Kıdem Tazminatı Tavanı ve Vergi Avantajı",
          paragraphs: [
            "Memur maaş katsayısına endeksli olarak yılda iki kez güncellenen kıdem tazminatı tavanı, 2026 yılının ilk yarısında 64.948,77 TL, 1 Temmuz – 31 Aralık 2026 döneminde ise 73.729,87 TL olarak uygulanmaktadır.",
            "Kıdem tazminatından yalnızca binde 7,59 (%0,759) oranında damga vergisi kesilir; gelir vergisi ve SGK primi kesilmez. Bu nedenle brüt ile net kıdem tutarı birbirine çok yakındır.",
          ],
        },
        {
          heading: "Giydirilmiş Brüt Ücret Neden Kritik?",
          paragraphs: [
            "Pek çok çalışan tazminatını yalnızca çıplak brüt maaş üzerinden kontrol eder. Oysa işverenin düzenli sağladığı yemek kartı, yol/servis yardımı ve yılda 1-4 kez verilen düzenli ikramiyelerin aylık ortalaması da tavan sınırına kadar hesaba katılır.",
          ],
          bullets: [
            "İhbar tazminatında tavan sınırı bulunmaz, ancak gelir vergisi ve damga vergisi kesilir.",
            "Kullanılmayan yıllık izin günleri de işten ayrılışta son çıplak brüt ücret üzerinden nakit olarak ödenir.",
            "İbraname imzalamadan önce kıdem, ihbar ve yıllık izin kalemlerinin ayrı ayrı doğru hesaplandığını teyit edin.",
          ],
        },
      ],
    },
  },
  {
    id: "fire-4-percent-guide",
    publishedAt: "2026-03-10",
    updatedAt: "2026-06-25",
    relatedCalculatorId: "fire",
    en: {
      slug: "fire-4-percent-rule-explained",
      title: "The 4% Rule & FIRE Math: How Much Do You Actually Need to Retire?",
      seoTitle: "FIRE Movement & 4% Safe Withdrawal Rule Explained (2026) | FinValio",
      seoDescription:
        "Break down the math behind Financial Independence (FIRE), Lean vs. Fat FIRE, Coast FIRE, and sequence-of-returns risk.",
      excerpt:
        "Why your savings rate matters more than your salary — and how to stress-test the 4% safe withdrawal rule against inflation.",
      readTimeMin: 6,
      categoryLabel: "Retirement & FIRE",
      sections: [
        {
          heading: "Savings Rate Is the Master Lever",
          paragraphs: [
            "A household saving 10% of net income needs roughly 45+ years to reach financial independence. Raising that savings rate to 35% cuts the timeline roughly in half — regardless of whether your income is $60,000 or $260,000.",
            "The reason is simple: living comfortably on less simultaneously boosts monthly investments and shrinks the 25× portfolio target you must build.",
          ],
        },
        {
          heading: "Managing Sequence-of-Returns Risk",
          paragraphs: [
            "The biggest threat to early retirees isn't average return — it's a sharp bear market in the first 3–5 years of retirement while withdrawing living expenses. Keeping a 1–2 year cash/treasury buffer and staying flexible with discretionary spending during downturns dramatically improves 40-year success rates.",
          ],
        },
      ],
    },
    tr: {
      slug: "finansal-ozgurluk-fire-ve-4-yuzde-kurali",
      title: "Finansal Özgürlük (FIRE) ve %4 Kuralı: Erken Emeklilik İçin Ne Kadar Birikim Gerekir?",
      seoTitle: "Finansal Özgürlük (FIRE) ve %4 Kuralı Rehberi | FinValio",
      seoDescription:
        "FIRE hareketi nedir? %4 güvenli çekim kuralı, 25 katı hedefi, Coast FIRE eşiği ve Türkiye'den döviz bazlı erken emeklilik planlaması.",
      excerpt:
        "Tasarruf oranının neden maaş yüksekliğinden daha belirleyici olduğunu ve %4 kuralıyla pasif gelir hedefini adım adım inceleyin.",
      readTimeMin: 6,
      categoryLabel: "Emeklilik & FIRE",
      sections: [
        {
          heading: "Neden Yıllık Giderin 25 Katı?",
          paragraphs: [
            "Finansal özgürlüğün temel formülü şaşırtıcı derecede basittir: Yıllık yaşam giderinizi 0,04'e böldüğünüzde (yani 25 ile çarptığınızda) ulaşmanız gereken ana portföy büyüklüğünü bulursunuz. Örneğin ayda $2.000 ($24.000/yıl) gideri olan bir kişi için hedef portföy $600.000'dır.",
            "Çeşitlendirilmiş hisse senedi ve tahvil portföyünden ilk yıl %4 çekip sonraki yıllarda bu tutarı enflasyon kadar artırdığınızda, tarihsel veriler portföyün 30 yıl boyunca yüksek olasılıkla korunduğunu gösterir.",
          ],
        },
        {
          heading: "Getiri Sırası Riskini Azaltmak",
          paragraphs: [
            "Erken emekliliğin ilk 3-5 yılında yaşanacak sert bir piyasa düşüşü, hisse satarak geçinen portföyleri zorlayabilir. Bu riski azaltmak için 1-2 yıllık yaşam giderini likit mevduat/para piyasası fonlarında tampon olarak tutmak ve çekim oranını %3,5-%4 bandında esnek yönetmek en güçlü stratejidir.",
          ],
        },
      ],
    },
  },
  {
    id: "rent-vs-buy-framework",
    publishedAt: "2026-04-05",
    updatedAt: "2026-07-08",
    relatedCalculatorId: "rent-buy",
    en: {
      slug: "rent-vs-buy-financial-framework",
      title: "Rent vs. Buy in 2026: The 5% Rule and Hidden Ownership Costs",
      seoTitle: "Rent vs. Buy in 2026: The 5% Rule & True Cost Comparison | FinValio",
      seoDescription:
        "Don't just compare rent to a mortgage payment. Learn the 5% rule, unrecoverable ownership costs, and how to compare long-term net worth.",
      excerpt:
        "Comparing monthly rent only to a mortgage payment ignores property tax, maintenance, closing fees, and down-payment opportunity cost.",
      readTimeMin: 5,
      categoryLabel: "Real Estate",
      sections: [
        {
          heading: "Unrecoverable Costs on Both Sides",
          paragraphs: [
            "Rent is an unrecoverable cost — you pay for shelter and build no equity. Yet homeownership carries its own unrecoverable costs: mortgage interest, property taxes, homeowners insurance, maintenance (~1% of home value/year), and the lost investment return on your down payment.",
            "A quick benchmark known as the 5% Rule estimates unrecoverable annual ownership cost at ~5% of home value (1% property tax + 1% maintenance + 3% cost of capital). Multiply home price by 5% and divide by 12 to find the rough breakeven monthly rent.",
          ],
        },
        {
          heading: "When Buying Clearly Wins",
          paragraphs: [
            "Homeownership shines when you plan to stay at least 7–10 years, lock in a manageable fixed mortgage rate, buy in a market with a reasonable price-to-rent ratio, and value the stability of capping your core housing payment against decades of rent inflation.",
          ],
        },
      ],
    },
    tr: {
      slug: "ev-almak-mi-kiralamak-mi-finansal-analiz",
      title: "2026'da Ev Almak mı Kiralamak mı? Kira Çarpanı ve Fırsat Maliyeti Analizi",
      seoTitle: "Ev Almak mı Kiralamak mı 2026? Kira Çarpanı ve Yatırım Kıyaslaması | FinValio",
      seoDescription:
        "Kira çarpanı, peşinatın fırsat maliyeti, konut kredisi faizleri ve 10 yıllık net servet kıyaslamasıyla doğru konut kararını verin.",
      excerpt:
        "Sadece aylık kira ile kredi taksitini kıyaslamak yanıltıcıdır. Peşinatın bileşik getirisi ve konut değer artışıyla gerçek hesabı yapın.",
      readTimeMin: 5,
      categoryLabel: "Konut & Kira",
      sections: [
        {
          heading: "Geri Dönmeyen Maliyetler ve Fırsat Maliyeti",
          paragraphs: [
            "Kirada otururken ödenen kira geri dönmeyen bir giderdir; ancak ev satın alırken de kredi faizi, tapu harcı, bakım/aidat ve peşinat olarak bağlanan sermayenin alternatif yatırım getirisi (fırsat maliyeti) vardır.",
            "Gerçek kıyaslama, aylık ödemeleri değil 10 yıl sonundaki toplam net serveti karşılaştırmaktır: Ev sahibinin (Ev Değeri − Kalan Kredi − Satış Masrafı) rakamı ile kiracının (Yatırımda Büyüyen Peşinat + Aylık Nakit Farkı) portföyü kıyaslanmalıdır.",
          ],
        },
        {
          heading: "Kira Çarpanı ve Vade Kriteri",
          paragraphs: [
            "Aynı evde en az 7-10 yıl oturmayı planlıyorsanız, kira çarpanı 180 ayın altındaysa ve geliriniz kredi taksitini zorlanmadan karşılıyorsa konut sahipliği uzun vadede enflasyona karşı güçlü bir koruma sağlar. Kısa vadeli planlarda ve yüksek kredi faizi ortamında sermayeyi likit tutmak daha avantajlı olabilir.",
          ],
        },
      ],
    },
  },
];

export function getGuideBySlug(locale: Locale, slug: string): GuideDefinition | undefined {
  return GUIDES.find((g) => g[locale].slug === slug);
}

export function getGuideUrl(guide: GuideDefinition, locale: Locale): string {
  const base = locale === "tr" ? "/tr/rehberler" : "/en/guides";
  return `${base}/${guide[locale].slug}`;
}
