# SauerBeen Trainingsfeedback – Kuerz Erklärung

Oct 1, 2026 · @Guy

## Wat ass et?

D'Trainingsfeedback Lafen ersetzt d'Excel-Fichier: Leefer droen hiren Training an, d'Tool rechent alles wéi am Excel, a mat engem Klick gëtt et e PDF fir den Trainer.

- **Link:** [pugu-prog.github.io/lafen-feedback](https://pugu-prog.github.io/lafen-feedback/)
- **Apparat:** Computer, Tablet oder Handy, an all aktuellem Browser (Safari, Chrome, Firefox, Edge).
- **Keng Umeldung:** Et brauch kee Kont a keen Passwuert.
- **Donnéeën:** Alles bleift am Browser vum Leefer. Näischt gëtt op e Server geschéckt; Fotoen a Fichieren ginn um Apparat selwer gelies.
- **Zwëschespäicheren:** De leschten Training bleift automatesch stoen, och wann een d'Säit zoumécht.

## E Training aginn: 5 Schrëtt

Blo Felder fëllt een aus, gro Felder rechent d'Tool.

1. **Kapp ausfëllen:** Num, Pace Schwell (z.B. `4:50`), HR Schwell (z.B. `156`), Datum, Training, Ënnergrond, Schong, Temperatur a Wand. Num, Schwellen a Schong bleiwen fir den nächsten Training stoen.
2. **Reps uleeen:** „Training importéieren“ (kuck ënnen), „Reps aus Training uleeen“ (liest z.B. `6x1000 (60s)` aus dem Feld Training), „Strecke virwielen“ (5 km, 10 km, Hallefmarathon … gëtt automatesch an 1-km-Reps opgedeelt) oder einfach „+ Rep“.
3. **Zäiten an HR aginn:** Zäiten als `7:38,2` oder `4:37,15` (min:sek), `1:02:30` fir eng Stonn oder méi. Pace, Total a Faarwen kommen direkt.
4. **Kommentar schreiwen:** pro Rep an ënnen e génerelle Kommentar zum Training.
5. **PDF fir den Trainer:** am Drockdialog „Als PDF späicheren“ wielen. De Fichiersnumm ass schonn ausgefëllt, wéi am Excel: `JJMMDD Num -- Ënnergrond -- Training`, z.B. `260930 Guy -- Piste -- 4x1600`.

„Neien Training“ mécht d'Trainingsdonnéeën eidel. „Späicheren“ an „Lueden“ späicheren en Training als Fichier, fir en spéider nees opzemaachen.

## Training importéieren

De Knäppchen „Training importéieren“ fëllt d'Reps a Pausen aus engem Fichier oder Bild aus. Et gëtt ëmmer eng Virschau, an der een all Zeil (Rep, Paus oder ignoréieren) a Wert nach ännere kann, ier een iwwerhëlt. Fichieren a Biller kann een och einfach op d'Säit zéien oder mat Cmd/Ctrl+V apechen.

| Quell | Wat gëtt iwwerholl | Wat ze wëssen ass |
| --- | --- | --- |
| FIT, TCX, GPX (Garmin, Coros, Strava) | Runden mat Distanz, Zäit op d'Honnertstel, Max HR pro Rep, Min HR pro Paus; bei Garmin och Datum, Auerzäit, Temperatur a Wand | Am exaktsten. Op der Piste gëtt d'GPS-Distanz op déi ronn Distanz gesat (1612 m → 1600 m). GPX gëtt an 1-km-Splits opgedeelt. |
| Screenshot oder Foto vun der Rundelëscht | Runden aus der Auer-App, per Texterkennung um Apparat | Erkennung kann sech verdinn: Virschau ëmmer kontrolléieren. |
| Trainingsplang (PDF, Bild oder Text) | Reps, Pausen, Training an Datum vum gewielten Dag | Funktionéiert am beschte mat der Schreifweis ënnen. Wat net verstane gëtt, steet als „Net verstan: …“ do. |
| Strecke virwielen | 400 m bis Marathon | Vun 3 km un eng Rep pro km. |

Strava kann spéider direkt verbonne ginn; dat ass virbereet, awer nach net aktiv.

## Fir den Trainer: Schreifweis fir Trainingspläng

Wann de Plang esou geschriwwe gëtt, liest d'Tool en ouni Feeler: eng Zeil pro Schrëtt, de Wochendag als eegen Zeil drëwwer.

| Schreifweis | Bedeitung |
| --- | --- |
| `4km WU` / `2km CD` | Ee- an Auslafen; zéilt net als Rep (och: `Auslaf`, `easy`, `jog`) |
| `6x1000m (60s)` | 6 Reps vun 1000 m, 60 s Paus dertëscht |
| `4x(1600-1200) (60s)` | Serie: 1600, 1200, 1600, 1200 … mat 60 s Paus |
| `8min threshold @ 4:50` | Rep no Zäit; d'Zil-Pace kënnt an de Kommentar |
| `p90s` (oder `90s` eleng) | Paus nom Block, op enger eegener Zeil |
| `5x30s rop (rof)` | Hills: rop lafen, rof trabéieren, direkt déi nächst; d'Paus huet keng fix Zäit |

Beispill fir e Freideg:

```
Freides
4km WU
5x60s rop (rof)
p90s
8min threshold
p90s
5x30s rop (rof)
p90s
6min threshold
2km CD
```

Dëst gëtt am Tool: 5 Hills, 8 min Threshold, 5 Hills, 6 min Threshold, mat 1:30 Paus tëscht de Bléck; Training = „5x60s rop + 8min threshold + 5x30s rop + 6min threshold“ an den Datum vum Freideg, deen am noosten drun ass. Al Schreifweisen (z.B. `5x60s hills (90s Paus)`) ginn och nach gelies.

## Wat d'Tool rechent

All Berechnung ass déiselwecht wéi an der Excel-Fichier „Lafen SauerBeen Trainingsfeedback“; mam 4x1600 vum 30.09.2026 kommen déiselwecht Zuelen an Faarwen eraus.

| Wert | Formel |
| --- | --- |
| Pace pro Rep | Zäit ÷ Distanz × 1000 |
| Pace MIN / MAX | Pace Schwell × 1,08 / × 0,92 |
| Max HR Rep MIN / MAX | HR Schwell − 15 / + 25 |
| Min HR Paus MIN / MAX | HR Schwell − 30 / + 10 |
| Laktat MIN / MAX | 1,5 / 5,0 (kann een änneren) |
| Total | Distanz vun de Reps; Zäit vu Reps a Pausen |

**Faarwen am PDF:** Pro Kolonn réit, giel, gréng vum Minimum iwwer d'Mëtt (Median) bis zum Maximum, inklusiv MIN/MAX-Referenz. Bei der Pace ass séier réit a lues gréng; bei HR a Laktat ass niddreg gréng an éich réit.

**Zwee Ënnerscheeder zum Excel, fir manner Feeler:** `21:15` heescht ëmmer 21 Minutten (am Excel 21 Stonnen), an eidel Zeilen weisen näischt amplaz `#DIV/0!`. Ënnert de Reps steet nach den Ø Pace, Ø Max HR, Ø Min HR Paus an d'Belaaschtungszäit.

## Fir d'Testpersounen: wat w.e.gl. testen

- [ ] E richtegen Training vun dëser Woch aginn, eemol mat der Hand an eemol per Import
- [ ] Eng FIT-Fichier vun der Auer importéieren (Garmin Connect: Aktivitéit → „Export Original“; Coros: Aktivitéit → Export → FIT)
- [ ] E Screenshot vun der Rundelëscht an e Foto vum Trainingsplang probeëren
- [ ] De PDF maachen an nokucken, ob Numm, Faarwen a Kommentar stemmen
- [ ] Op Handy a Computer probeëren

**Feedback:** Iwwer de Knäppchen **„Feedback“** uewen am Tool oder direkt iwwer dëse Link: [Test-Feedback Formulaire](https://form.jotform.com/262735789931069). Do kanns de soen, wat s de gemaach hues, op wat fir engem Apparat a Browser, an e Fichier oder Screenshot derbäisetzen. All Äntwerte kommen beim Guy un.
