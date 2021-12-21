# **<u>AutobahnHunt</u>**

- Ein Ausweich-Rennspiel mit Highscore und Endlos-Elementen.
  - In diesem Spiel schlüpft der Spieler in einen Fahrer der in einem Auto sitzt, dass ohne zu stoppen immer schneller wird und bremsen unmöglich scheint. Der einzige Weg zu überleben ist den voraus fahrenden Fahrern auszuweichen und sich somit durch das Feld zu kämpfen.
  - Der Spieler kann das Auto mit den A und D (oder Pfeiltasten) auf die verschiedenen Spuren steuern, um den langsameren Autos auszuweichen.
  - Umso länger der Spieler keinen Unfall baut, beschleunigt das Fahrzeug immer weiter.
  - Die entgegenkommenden Autos werden "zufällig" auf die verschiedenen Fahrbahnen platziert.
    - So dass es nicht Unfair wird oder der Spieler keine Bahn zum Ausweichen hat.
  - Wenn der Spieler gegen ein Auto oder gegen die Bande kommen sollte, wird dieser entweder zurückgesetzt oder verliert sehr viel Geschwindigkeit. Nach drei Treffern ist das Auto zerstört und der Spieler verliert.
  - Umso schneller der Spieler ist, umso schneller wächst die Punktzahl des Highscores.
  - Die "Arena", also die Straße, wird entweder durchgeneriert und ist somit unendlich:
    - Die Straßen werden nach Fortschritt immer wieder an das Ende angefügt. z.B siehe Bild.
  - Oder "Arena", oder die Straße, wird komplett vorausgebaut (Problem: Arena müsste sehr groß werden)
  - Mögliche Verbesserungen, Spielmechaniken: 
    - Items oder einmalige Aktionen, wie Springen, Abbremsen oder Unverwundbarkeit
    - Nach Treffer, Automodell verändert sich, Schadensmodell
    - Verschiedene Arten von entgegenfahrenden Autos, verursachen weniger/mehr Schaden oder geben Bonuspunkte durchs kaputt machen. 
    - Es könnten auch Autotransporter-LKWs entgegen kommen, über die man Springen kann. Ungefähr wie bei MarioKart (siehe Bild: https://www.mariowiki.com/images/thumb/5/5f/Rosalina_Turnpike_A.jpg/1200px-Rosalina_Turnpike_A.jpg)

## Checkliste für die Endabgabe:

> Nr. 0: -> Durch den Ansatz, dass sich die Arena von selbst zusammensetzt wird die Frage der 0 und 1 interessant. Somit würde die 0 der Spieler, also das Auto, und die 1 die Fahrbahn die sich immer wieder neu aufbaut.

> Nr. 1: -> Wird sich während der Entwicklung aufzeigen.

> Nr. 2: -> Die ganzen Objekte werden im Editor aufgebaut und im Code dann dynamisch auf das Koordinatenfeld gesetzt.

> Nr. 3: -> Evtl die Bewegung des Spielers. Ansonsten auch während der Entwicklung entschieden.

> Nr. 4: -> Während der Entwicklung

> Nr. 5: -> Sounds bei Crashes oder Beschleunigung der Fahrzeuges.

> Nr. 6: -> Die Geschwindigkeit wird angezeigt, sowie die Anzahl von Leben und den Highscore.

> Nr. 7: -> z.B Nach jeder Geschwindigkeitserhöhung muss eine Nachricht/Event an das Fahrverhalten des Autos gesendet werden.

> Nr. 8: -> In der externen Datei stehen die Konfigurationen, wie zum Beispiel:
>
> - Tag und Nacht setting
> - Schwierigkeitsgrad (wie die Autos gesetzt werden)
> - Anfangsgeschwindigkeit + Multiplikator
> - Debug Modus
> - usw

> Nr. 9: -> Licht könnte je nach Setting (Tag oder Nacht) entweder von der "Sonne" kommen oder von den Laternen am Rand.

> Nr. A: -> Physik werden die entgegen fahrenden Autos bekommen und auch das Auto das der Spieler spielt.

> Nr. B: -> Kein Networking geplant.

> Nr. C: -> Könnte vielleicht für das platzieren der Autos entgegenkommen.

> Nr. D: -> Reifen können mit Animationssprites versehen werden.

