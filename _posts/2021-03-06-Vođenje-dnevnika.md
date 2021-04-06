---
layout: post
date: 2021-03-06
tags: srpski
category: life
thumbnail: "/assets/dnevnik-thumb.png"
description: "Pisanje je najbolji način za sređivanje misli. Shodno tome, vođenje dnevnika predstavlja možda najbolji način da se organizuje i planira privatni život."
---

<style> 
img { 
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>

Pisanje je najbolji način za sređivanje misli. Shodno tome, vođenje dnevnika predstavlja možda najbolji način da se organizuje i planira privatni život. Neki ljudi svesno ili nesvesno koriste pisanje kao pomoćno sredstvo za vredan dan. TODO liste, pisanje "da se ne bi zaboravilo", upisivanje događaja u google kalendar itd. Vođenje dnevnika se može smatrati alatom za organizovanje šire slike života. Pisanje dnevnika može biti razgovor sa samim sobom u kome se rešavaju konfuzne emocije u bezbednom okruženju, može biti praćenje važnih životnih detalja, ili jednostavno daje radost i uživanje u prenošenju misli na papir.

![dnevnik sveska](/assets/dnevnik-sveska.jpg)

# Kako pisati

Podeliću kako ja to radim, kao primer, na osnovu nekih stvari koje sam pokupio tokom godina. Um jako dobro funkcioniše ujutru, nakon doručka, kada je dobra prilika da se dan isplanira u obliku liste aktivnosti koju želite da ostvarite ovog dana. Ne mora biti kompletna lista, ali takođe ne mora biti potpuno ostvariva lista, svakako je dobro videti spisak ispred sebe i probrati šta je prioritet za danas.

Uveče je čovek umoran, i može koristiti pisanje za refleksiju na današnji dan, zatim za pregled ostvarene aktivnosti, a pritom se koristi prilika za oslobađanje od stresa, recimo prepričavanjem događaja. Dakle pisanje može terapeutski da deluje. Pisanjem o stvarima koje nas čini nervoznim, anksioznim ili depresivnim nam pomaže da se suočimo sa negativnim emocijama i spontano ih prihvatamo i rešimo, a pisanje o stvarima koje nas čine srećnim i zadovoljnim nam pomaže da cenimo to i da ostavimo dobar ton pred san, pa je bitno navesti neku od njih (neki predlažu tri ili pet).

Ako pišete u svesci, dnevnik počinje na novoj strani (ako niste štedljivi - na levoj strani sveske). Dnevnik treba imati datum i dan u nedelji. Može sadržati podatke dnevne jutarnje rutine, zavisno od potrebe (praćenje težine, lekova, novca na računu itd). A ako pišete na računaru, svaki fajl je novi unos u dnevnik. Na računaru koristim `markdown` jezik i generator za blog kao pomoćno sredstvo. Lično preferiram format imenovanja fajla `{godina}-{mesec}-{dan}-{dan u nedelji}` (na primer `2021-03-26-Subota.md`). Vodite računa o smeštanju podataka, sa jedne strane računar koji je povezan na internet mrežu je uvek u situaciji da sadržaj završi u javnosti a sa druge strane se, zbog nepredvidivih situacija, mogu izgubiti svi podaci, pritom prenosivi mediji ne mogu uvek da istraju onoliko koliko od njih očekujemo, pa je lični sud i pažnja ovde presudan.

Primer današnjeg dnevnika:

`2021-03-26-Subota.md`

```markdown
---
date: 2021-03-06
category: journal
---

# Plan za danas

[x] Šetnja, u povratku uzeti namirnice
[x] Priprema ručka
[x] Dovrši članak o dnevniku
[ ] Peglanje
[x] Nastavak na privatnom projektu (projekcija za rotaciju)

...

# i3 tastatura jezik

Otkrio sam na i3 kako se podešava layout za tastaturu na srpski, to je komanda:
`setxkbmap -layout rs -variant latin`
Ako želim da vratim tastaturu na us engleski, komanda je:
`setxkbmap -layout us`.

...


```

Dnevnik nije potrebno pisati baš svaki dan, ali je zgodno makar posvetiti malo vremena radi održavanja rutine. Sadržaj će sigurno varirati, od oskudne liste planiranih aktivnosti do velikih raspisivanja, zavisi od toga šta želite i šta vam je bitno da sačuvate od sećanja. Možete pisati neke priče od značaja, neke detalje bi ste inače zaboravili, ali isto tako možete pisati o stvarima iz prošlosti.

> Obratite pažnju na privatnost podataka (svojih i drugih), jer tekst moze zavrsiti kod malicioznih ljudi

Pisanje je najzgodnije u prostoru bez izvora ometanja, na urednom stolu, kako bi se sa pisanjem brzo završilo bez spoljnog stresa. Naravno, kao i sa svakim pravilom, ovde možete imati odstupanja. Primer može biti pisanje dnevnika na putovanju, kada želite nešto da zabeležite baš u trenutku haosa. Ja imam stari prenosivi laptop koji mi služi samo za potrebe pisanja, a nekada sam koristio svesku. Smatram da je lepo pisati olovkom ali potreba za efikasnošću me je navela da koristim isključivo taj laptop. Suplementiram sve to sveskama ili blokčićima, naročito kada pravim liste planiranih aktivnosti.

![thinkpad x230i sa ovom stranicom](/assets/dnevnik-thinkpad.jpg)

# Pisanje i čitanje uz Jekyll

Razlog zašto imam standardizovan format datoteke (sa primera gore) je taj što koristim alat `jekyll` ([https://jekyllrb.com/](https://jekyllrb.com/)). To je blog generator za jednostavne članke koji se meni čini idealnim za dnevnik (journal) i koristim potpuno isti sistem za ovaj blog.

Za instalaciju je potreban `ruby`, i možete ispratiti njihova upustva za instalaciju. Ono što sam dodao svom projektu je i skripta za kreiranje nove strane u dnevniku:

``` sh
#!/bin/bash

DATE="$(date +%F)"
FILENAME="_posts/$DATE-$(date +"%A").md"

if [[ -f $FILENAME ]];then
    echo "$FILENAME exists"
else
    touch $FILENAME
    echo -e "---\ndate: $DATE\n---\n" >> $FILENAME
fi
```

Ova skripta kreira ime fajla po današnjem datumu i popuni u fajlu metapodatke za datum.