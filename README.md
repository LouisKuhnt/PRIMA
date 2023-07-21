# PRIMA
Repository for everything PRIMA related, such as tasks and duties

[Profile description](https://louiskuhnt.github.io/PRIMA/personal_description/steckbrief.htm)

----

# AutobahnHunt 2.0

- Titel: AutbahnHunt2.0 
  - (The second version from my initial concept from way back in 2021)
- Author: Louis Ronald Kuhnt
- Year and season: Sommersemester (summer semester) 2023
- Curriculum and semester: AIN7
- Course this development was created in: PRIMA
- Docent: Prof. Jirka Dell'Oro-Friedl
- Link to the finished and executable application on Github-Pages:
  - https://louiskuhnt.github.io/PRIMA/AutobahnHunt2.0/
- Link to the source code:
  - https://github.com/LouisKuhnt/PRIMA/tree/main/AutobahnHunt2.0
- Link to design document:
  - https://github.com/LouisKuhnt/PRIMA/blob/main/AutobahnHunt2.0/Documentation/Design-Dokument-AutobahnHunt.pdf
- Description for users on how to interact:
  - __A__ or __Arrow left__ -> For a left turn
  - __D__ or __Arrow right__ -> For a right turn
  - To start the car you need to press the __SPACE__ bar.

----

## Checklist for the final assignment

© Prof. Dipl.-Ing. Jirka R. Dell'Oro-Friedl, HFU
| Nr | Criterion           | Explanation                                                                                                                                     |
|---:|---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|
|  1 | Units and Positions | Das Spieler-Auto ist in diesem Falle der Null-Punkt des Spieles. Eine Unit im Spiel ist ungefähr 0.25 Meter. Somit ergibt sich aus den Fahrzeugen (2.5m höhe/ 3m breite / 6,25 länge). Es wurde die X-Achse für vertikale Bewegungen des Spieler-Autos benutzt, die Y-Achse für horzontale Bewegungen und die Z-Achse (Tiefe) für die Bewegung der gegnerischen Fahrzeuge. |
|  2 | Hierarchy           | Die Hierachy der Graphen ist in Zusammenhängende Objekt Gruppen unterteilt. So wird unterschieden zwischen "Street", "PlayerCar", "EnemyCar" (was wiederum ein eigener Graph ist, um das gesamt Objekt wieder verwenden zu können) und "Skybox". Die wiederum Child-Objekte beherbergen. |
|  3 | Editor              | Es wurde viel mit dem Editor gearbeitet. Das Level an sich und auch die Sprite Elemente, Licht und die Skybox wurde mithilfe des Editors hinzugefügt, sowie auch die beiden Fahrzeugen "PlayerCar" und "EnemyCar". Die Kamera wurde mithilfe des Codes erstellt und die Duplizierung der Fahrzeuge wurde auch vom Code übernommen. Physik wurde mithilfe vom Editor hinzugefügt, aber im Code genutzt/verbessert. |
|  4 | Scriptcomponents    | ScriptComponents wurden für die Spawnpositionen der gegnerischen Fahrzeuge verwendet und auch in der Kollisionskontrolle. |
|  5 | Extend              | Es wurden mit ƒ.Node auf Nodes zugegriffen, auch wurde mit einer eigenen Klasse AllEntity, Player und Enemy abgeleitet. Die AllEntity wird dabei von der ƒ.Node Klasse aus FudgeCore abgeleitet. |
|  6 | Sound               | Es werden Sounds abgespielt, die dem Spieler folgende Gegebenheiten mitteilen sollen: Start -> mit einem Motorenstart; Fahren -> mit einem stetigen Fahrzeug-Sound; Unfall (Leben abgezogen) -> mit einem Unfall-Sound. |
|  7 | VUI                 | Die Benutzeroberfläche zeigt Leben und Highscore an. Der Startbildschirm fordert den Spieler auf, das Spiel mit dem Motor (SPACE) start zu beginnen. Der Bildschirm am Ende des Spieles zeigt nochmal die erreichte Punktzahl an.                                             |
|  8 | Event-System        | Es wurden Custom-Events verwendet, um das Spiel, bei zu wenig Leben, zu beenden oder Sound bei einem Crash abzuspielen. |
|  9 | External Data       | In der Konfigurationsdatei des Spiels können folgende Parameter beeinflusst werden: "enemy_speed" -> für die Geschwindigkeit der Gegner; "acceleration_left/right" -> für die Beeinflussung der Agilität des eigenen Spielers; "player_lives" -> mit wie viel Leben der Spieler starten soll; "spawn_interval" -> in welcher Geschwindigkeit die gegnerischen Fahrzeuge erstellt werden sollen. |
|  A | Light               | Es wird Licht verwendet, um die Scheinwerfer des Spielerfahrzeugs zu emulieren, dabei wurde der SPOT-Type verwendet. Die gegnerischen Fahrzeuge werden vom Scheinwerfer-Licht des Spielers angestrahlt und reflektieren es, somit kann der Spieler die gegnerischen Fahrzeuge besser erkennen und potenziell ausweichen. Ansonsten wird das Ambient-Light für die Umgebung verwendet, sogesagt für die "Lichtverschmutzung" der Außenwelt. |
|  B | Physics             | Es wurde Physik in Form von RigidBodies verwendet. So besitzt jedes gegnerische Fahrzeug einen Physikalischen Body, welcher auch durch applyForce bewegt wird. Die Gegner werden als Dynamischen Körper generiert, der Spieler als Kinetischer und die Wände wie auch der Asphalt sind Statisch. |
|  C | Net                 | - |
|  D | State Machines      | - |
|  E | Animation           | Animation wurden in Form von Sprites verwendet. Die Straße wird als Endlos mithilfe von Sprites etabliert und dargestellt. Dazu wird durch die Bewegung der Straße das Fahren simuliert. |
