# Lafen SauerBeen – Trainingsfeedback

Kontext für Claude Code (übernommen aus dem Claude-Chat und dem Doc „SauerBeen Trainingsfeedback – Kuerz Erklärung“).

## Was das ist
Web-Tool, das die Excel-Datei „Lafen SauerBeen Trainingsfeedback“ ersetzt: Läufer tragen ihr Training ein, das Tool rechnet wie im Excel und erzeugt per Druckdialog ein PDF für den Trainer.

- Live: https://pugu-prog.github.io/lafen-feedback/ (GitHub Pages, Branch `main`)
- Sprache der Oberfläche: Luxemburgisch
- Keine Anmeldung, keine Server-Speicherung: alles bleibt im Browser (localStorage für das letzte Training)
- Nutzer-Doku: `docs/kuerz-erklaerung.md` (Kopie des Claude-Docs, Stand 01.10.2026)

## Dateien
- `index.html` – das Tool (Formular, Berechnungen, Import, PDF-Layout)
- `hellef.html` – Hilfeseite
- `excel-vorlag.js` – Excel-Export im Layout der alten Vorlage
- `strava-worker.js` – Cloudflare Worker für die vorbereitete Strava-Anbindung (OAuth-Token-Tausch, hält das Client Secret von der Seite fern; noch nicht aktiv)
- `shoes.json` – Laufschuh-Liste (Marke → Modelle); neue Modelle einfach ergänzen
- `sauerbeen-schriftzug.png` – Logo

## Fachliche Regeln (müssen mit dem Excel übereinstimmen)
- Pace pro Rep = Zeit ÷ Distanz × 1000
- Pace MIN/MAX = Pace-Schwelle × 1,08 / × 0,92
- Max HR Rep MIN/MAX = HR-Schwelle − 15 / + 25
- Min HR Pause MIN/MAX = HR-Schwelle − 30 / + 10
- Laktat MIN/MAX = 1,5 / 5,0 (änderbar)
- MIN/MAX-Werte sind editierbar: eigener Wert fett, leer = Formel
- PDF-Farben: Farbskala rot–gelb–grün von Minimum über Median bis Maximum; bei Pace ist schnell rot / langsam grün, bei HR und Laktat niedrig grün / hoch rot
- Referenz-Testfall: 4x1600 vom 30.09.2026 muss identische Zahlen und Farben wie das Excel liefern
- Bewusste Abweichungen zum Excel: `21:15` = 21 Minuten (nicht Stunden); leere Zeilen zeigen nichts statt `#DIV/0!`
- PDF-Dateiname: `JJMMDD Name -- Untergrund -- Training`

## Import / Trainingsplan-Parser
- Quellen: FIT/TCX/GPX (Garmin, Coros, Strava), Screenshot/Foto der Rundenliste (Texterkennung im Gerät), Trainingsplan (PDF, Bild, Text), Strecke wählen (400 m bis Marathon, ab 3 km eine Rep pro km)
- Auf der Bahn wird GPS-Distanz auf runde Distanz gesetzt (1612 m → 1600 m); GPX in 1-km-Splits
- Immer eine Vorschau, in der jede Zeile (Rep / Pause / ignorieren) und jeder Wert geändert werden kann
- Plan-Schreibweise: eine Zeile pro Schritt, Wochentag als eigene Zeile darüber; `4km WU`/`2km CD` zählen nicht als Rep; `6x1000m (60s)`; `4x(1600-1200) (60s)`; `8min threshold @ 4:50`; `p90s` = Pause nach dem Block; `5x30s rop (rof)` = Hills
- Eine Zeit allein über 3 min = Threshold-Rep; freitags kurze Zeit-Reps = Hills
- Nicht Verstandenes erscheint als „Net verstan: …“

## Testen & Feedback
Test-Feedback-Formular (Jotform): https://form.jotform.com/262735789931069

## Arbeitsweise
- Änderungen direkt auf `main` pushen = live über GitHub Pages; vorher im Browser testen
- Commit-Messages bisher auf Luxemburgisch
