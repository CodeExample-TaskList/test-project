# js-test-project

Dieses Projekt soll Tasks (simple Objekte) auf einem Server abspeichern, welche dann (simuliert) "abgearbeitet" werden. Mehrere browser-clients können gleichzeitig arbeiten und Tasks einreihen. Alle clients erhalten in Echtzeit alle updates.

## Aufbau

- beide Projekte (server und frontend) nutzen die gleiche package.json, es können beliebige packages hinzugefügt werden
- ES7 ist erwünscht
- Prettier (https://prettier.io) ist erwünscht (kann ganz einfach als Visual Studio Code Erweiterung installiert werden)
- lodash (https://lodash.com) ist empfehlenswert
- es muss keine Datenbank genutzt werden (alles in Objekte/Arrays)

### Datenstruktur

#### Task

```json
{
  "id": "123-123-123-123",
  "name": "test",
  "isPriority": false,
  "isCompleted": true,
  "created_at": "2018-11-02T18:28:06.447Z",
  "completed_at": "2018-11-02T18:29:06.447Z"
}
```

## Server

- Kommunikation über websocket/Socket.IO
- neue Tasks werden als unfertig in einer Warteschlange eingereiht
- Tasks mit hoher Priorität werden bevorzugt bearbeitet
- normale Tasks brauchen etwa 5-10 (random) Sekunden zur Bearbeitung
- Server benachrichtigt alle clients über:
  - neuer Task erstellt
  - Task fertig bearbeitet
- alle clients sollen immer mit allen aktuellen Tasks synchronisiert sein
- beim Verbinden eines neuen clients soll dieser alle bisherigen Tasks erhalten
- Tasks müssen einzeln hintereinander abgearbeitet werden

### Code

- Der Socket.IO server ist schon aufgesetzt in `server/index.js`
- Ausführen mit `npm run server` (erreichbar unter `http://localhost:4000`)
- ISO timestamps können mit `moment().toISOString()` generiert werden (`import moment from "moment"`)
- unique IDs können mit `uuid()` generiert werden (`import uuid from "uuid/v4"`)

### packages

- https://github.com/socketio/socket.io
- weitere packages dürfen verwendet werden

## React-Frontend

- Ein Formular umfasst ein Textfeld für eine Beliebige Bezeichnung, eine Checkbox für Prioritätsstatus und einen submit Button
- Tasks werden in einer Liste/Tabelle angezeigt
- neue Tasks werden durch Socket.IO asynchron empfangen und automatisch der Liste hinzugefügt oder aktualisiert (Sortierung absteigend nach timestamp)
- Unfertige Tasks werden als solche markiert (z.B. mit dem Beispiel Spinner component in `components/Spinner`)
- Priorisierte Tasks werden als solche markiert
- Der Socket.IO Client soll als HoC (Higher-Order Component) implementiert werden. Dieser component hält den kompletten state und gibt die Tasks und die Funktionen zum Einreihen neuer Tasks über props weiter an die Hauptcomponent.
- Soweit wie möglich Elemente in einzelne components herunterbrechen/extrahieren (formular, task list, einzelne tasks), um den Datenfluss zwischen react components zu veranschaulichen und components simpel zu halten

### Code

- die frontend app ist schon aufgesetzt mit webpack, babel und react
- Entry component ist `src/containers/Root/index.jsx`
- bootstrap und `react-bootstrap` (react components für bootstrap) sind bereits aufgesetzt und können gerne verwendet werden
- Ausführen mit `npm start` (ereichbar unter `http://localhost:3000`)

### packages

- https://github.com/react-bootstrap/react-bootstrap
- https://github.com/socketio/socket.io-client
- https://github.com/moment/moment
- weitere packages dürfen verwendet werden
