---
date: 2021-10-29
tags: programming javascript
layout: post
title: "Javascript: Divlji zapad standarda"
thumbnail: "/assets/rulebook.jpg"
category:
excerpt_separator: <!--more-->
---

# TL;DR

> Razlog nekonzistentnosti pravila u javascript ekostitemu dolazi posledicom nekonzistentnosti između drugih jezika i operativnih okruženja dok javascript nije nikom bio primaran jezik.

> javascript pravila pisanja su opinionated za organizacije, ali unopinionated za ceo ekosistem.

# Jedan Typescript primer

Skorije sam imao promenu paradigme promenom posla, prešao sam sa React-a na Angular. Nisam imao pojma koliko mi je bilo teško da drastično promenim neke navike a ranije sam shvatao zdravo za gotovo.

Ako pravite nešto što nije vezano za ekosistem, recimo definišite typescript interfejs za formu, koja izgleda ovako:

```ts
export interface MyFirstInterface {
    ...
}
```

Kako ćete prozvati ime fajla tog interfejsa?

Programeri koji žive u ekosistemu Angular-a ga intuitivno nazivaju `my-first.interface.ts`. Ako koristite React, to će vrlo verovatno biti `MyFirstInterface.ts`. Međutim, gledajući ostatak biblioteka, očekivajući da neko ovde nije u pravu, nisam našao konzistentno pravilo koji će podržati ona koji se koristi u datom projektu ispred sebe, da možeš da podeliš sa kolegama "evo, za ovo pravilo smo se odlučili jer ceo JS ekosistem univerzalno to pravilo koristi". Uvek će pravila da se uvode igrom slučaja ničea u kome se nalažite, i to čini stvar jako teškim ljudima koji menjaju niče.

To me je navelo na neki zaključak: možda nema univerzalnog standarda baš zbog toga što je veći deo javascript koda napisan od ljudi koji nisu primarno javascript programeri.

## Izvor svih problema


Sećam se studentskih dana, izmedju 2007 i 2011. Bila je jako zanimljiva podela između Windows i Linux korisnika, i znam da su to najuticaniji sistemi na stil pisanja zbog pravila OS ekosistema. Osetio sam da se neke stvari tu kose, na primer Windows nije bio case sensitive, pa kada student sa windows računarom, na kome aplikacija dobro kompajlira u konzoli, pošalje mejlom fajlove kolegama, linuksaši nisu uvek srećni. Očigledno je bilo da studenti sa windows računarima, među kojima sam i ja bio, moraju uvesti standarde imenovanja fajlova, kako bi ceo tim mogao funkcionisati dobro, iako ta pravila samom sebi ne dovodi nikakvu korist.

Negde izmedju 2007 i 2011 sam takođe prvi put pravio MVC aplikacije pomoću IDE-a, fokus je bio da napravim MVC u Javi, C# ili PHP, dok dizajnerski deo obogatim malim javascript funkcijama da bih dodao malo dinamike, jQuery je jako pomagao, ali nisam razumeo potpuno kako funkcioniše taj jezik, nigde nisam imao popisana pravila kao što ih imam u primarnom jeziku, recimo C#. Svoje znanje o javascript-u sam stekao od kolega koji takođe nisu primarno javascript programeri, jer takvi programeri dolaze mnogo kasnije. Javascript je bio toliko nebitan, da je svako uvodio pravila iz svog primarnog jezika. Najsmešnije su mi bile rasprave C# i Java navijača oko toga da li blok uokviren vitičastim zagradama treba biti u novom redu ili ne, i kada su delili komade izvornog koda, uvek je proradio OCD ispravljanja tuđih pravila, često alatom za formatiranje preferiranog IDE-a. Primer na šta mislim:

```C#
//C# VisualStudio
class Greet()
{
    public void Hello(){
        ...
    }
}
```

```java

//java eclipse
class Greet() {
    public void hello(){
        ...
    }
}
```

U istom primeru se vidi razlika u korišćenju velikog ili malog početnog slova za metode klase.

Ovo je ulazilo u stil pisanja javascript koda. Ukoliko IDE nije formatirao, programer će to ručno uraditi.

Ako uzmemo u obzir koliko ljudi u javascript ulaze iz drugih jezika i navika, mogu intuitivno da zaključim da 

> Razlog nekonzistentnosti pravila u javascript ekostitemu dolazi posledicom nekonzistentnosti između drugih jezika i operativnih okruženja dok javascript nije nikom bio primaran jezik.

Iako imamo jako opširno definisane coding standarde za neke biblioteke, međusobno se drastično razlikuju. Mislim da postoji konflikt između inertne potrebe da stvari budu konzistentne i uredne, dok postoji manjak centralizacije u ekosistemu, što me dovodi da pomislim:

> javascript pravila pisanja su opinionated za organizacije, ali unopinionated za ceo ekosistem.

Možete mi tvitovati zamerke na [@covekzbrda](https://www.twitter.com/{{ site.twitter_username }})


<!-- 

## Angular: Opinionated or not

Angular vodi vrlo jasnu, nekad nepisanu, filozofiju: _Imamo najbolju praksu i forsiramo da koristite i vi najbolju praksu_. Standardi pisanja se mogu naći ovde:

https://angular.io/guide/styleguide

> Napomena: sve nadalje predstavlja moju raspravu sa navikama koje moram steći, mislim da se trebaju uzeti u obzir iako čitalac ne vidi razlog u tome, ali ako imati jako dobar argument, možete mi tvitovati na [@covekzbrda](twitter.com/covekzbrda) i dodaću taj tvit kao ispravku.

Postoje stvari koje su mi vrlo teške da prihvatim u Angular ekosistemu samo zbog manjka praktičnosti, nedostatka dokumentacije, i možda sve ovo dolazi iz unopinionetad sveta koji sam uživao do sada.

Daću najjednostavniji primer: zašto komponenta čiji kontroler nosi ime `MyFirstComponent`, mora da nosi ime datoteke `my-first.component.ts` i da ima ime selektora `app-my-first`, koji se generiše uz `angular cli` pomoću komande `ng g c my-first?`.

Koliko brzo vaš um prebacuje kontekst ako želite da pretražite sve vezano za `MyFirst` ili `my-first` ili `app-my-first`. Zašto kad imam puno tabova, moram da imam povlake da zauzimaju jako skup prostor ekrana (pola ekrana, ako programirate kao ja, IDE na jednoj a browser na drugoj polovini)

Zatim, uvođenje `.` za identifikovanje uloge fajla takođe čini stvar konfuznim. Prvo sam mislio da se odnosi na stvari koje važe samo za angular: modul, komponenta, servis, direktiva itd, što mi olakšava da iz imena identifikujem coupling sa angular ekosistemom. Ali, počeo sam da viđam navike na primer za interfejse, kao na primer gore `my-first.interface.ts`.   -->