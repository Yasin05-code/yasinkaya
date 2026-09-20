# Yasin Kaya Küçükbaş — Portfolio

Neo-brutalist "retro OS" temalı kişisel portfolyo sitesi.
Statik HTML + Tailwind CSS. Netlify üzerinde yayında:
<https://ysnkayakucukbas.netlify.app/>

## Kurulum

```bash
npm install
```

## Geliştirme

```bash
npm run dev     # Tailwind'i izle (CSS'i her değişiklikte yeniden derler)
npm start       # http://localhost:4321 üzerinde önizleme sunucusu
```

İkisini iki ayrı terminalde çalıştır.

## Yayına hazırlama

```bash
npm run build
```

Bu komut sırasıyla:

1. `src/input.css` → `assets/tailwind.css` derler (minify).
2. Yayınlanacak dosyaları `dist/` klasörüne kopyalar.

Netlify `netlify.toml` üzerinden `npm run build` çalıştırıp `dist/` klasörünü
yayınlar — ayarları arayüzden değiştirmeye gerek yok.

> **Önemli:** HTML'e yeni bir Tailwind sınıfı eklediğinde `npm run build`
> (veya `npm run dev`) çalıştırmayı unutma. Tailwind yalnızca HTML'de gerçekten
> kullanılan sınıfları CSS'e yazar; derlemeden yayınlarsan yeni sınıf çalışmaz.

## Klasör yapısı

```
*.html                 Sayfalar (nav ve footer blokları hepsinde birebir aynı)
src/input.css          Tema: renkler, .win / .btn / .badge bileşenleri, CRT efekti
assets/tailwind.css    Derlenmiş CSS — elle düzenleme, üzerine yazılır
assets/site.js         Ortak davranış: menü, START menüsü, [X] pencereler, form
assets/og-image.png    Sosyal medya paylaşım görseli (1200×630)
assets/favicon.svg     Favicon kaynağı
images/*.webp          Sitede kullanılan optimize görseller
images/*.png|jpeg      Orijinal kaynak görseller (yayına çıkmaz)
scripts/build.cjs      dist/ klasörünü hazırlar
scripts/preview.cjs    Yerel önizleme sunucusu
```

## Görsel eklerken

Yeni bir görseli `images/` içine koy, sonra optimize `.webp` sürümünü üret —
sitede `.webp` sürümü kullanılır, orijinal dosya yayına çıkmaz.

## Notlar

- Sayfaların `<head>`, navigasyon ve footer blokları birebir aynıdır. Birinde
  değişiklik yaparsan aynısını diğer sayfalara da uygula.
- Aktif menü linki JavaScript ile işaretlenir (`data-nav`), elle işaretleme yok.
- Türkçe özel adlarda (İstanbul, Şelale, Küçükbaş) `no-case` sınıfı kullanılır;
  CSS `text-transform: uppercase` Türkçe "i" harfini bozduğu için.
