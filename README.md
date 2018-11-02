# js-test-project

Dieses Projekt soll Tasks (simple Objekte) auf einem Server abspeichern, welche dann (simuliert) "abgearbeitet" werden. Mehrere browser-clients können gleichzeitig arbeiten und Tasks einreihen.

## Aufbau

- beide Projekte (server und frontend) nutzen die gleiche package.json, es können beliebige packages hinzugefügt werden
- ES7 ist erwünscht
- Prettier (https://prettier.io) ist erwünscht (kann ganz einfach als Visual Studio Code Erweiterung installiert werden)
- lodash (https://lodash.com) ist empfehlenswert
- es muss keine Datenbank genutzt werden (alles in Objekte/Arrays)
- ein besonders schickes, "gestyltes" Erscheinungsbild ist nebensächlich

### Datenstruktur

#### Task

```json
{
  "name": "test",
  "isPriority": false,
  "isCompleted": true,
  "created_at": "2018-11-02T18:28:06.447Z",
  "completed_at": "2018-11-02T18:29:06.447Z"
}
```

## Server

- ein REST endpoint (koa) bietet eine API um Tasks einzureihen
- neue Tasks werden als unfertig in einer Warteschlange eingereiht
- neue Tasks mit hoher Priorität werden bevorzugt bearbeitet
- normale Tasks brauchen etwa 5-10 Sekunden zur Bearbeitung
- ein SocketIO server benachrichtigt alle clients über:
  - neuer Task erstellt
  - Task fertig bearbeitet
- alle clients sollen immer mit allen aktuellen Tasks synchronisiert sein
- Tasks müssen einzeln hintereinander abgearbeitet werden

### Code

- die koa app und der socketIO server sind schon aufgesetzt in `server/index.js`
- Ausführen mit `npm run server` (erreichbar unter `http://localhost:4000`)
- ISO timestamps können mit `moment().toISOString()` generiert werden (`import moment from moment`)

### packages

- https://github.com/koajs/koa
- https://github.com/socketio/socket.io
- weitere packages dürfen verwendet werden

## React-Frontend

- Ein Formular umfasst ein Textfeld für eine Beliebige Bezeichnung, eine Checkbox für Prioritätsstatus und einen submit Button
- Tasks werden in einer Liste/Tabelle angezeigt
- neue Tasks werden durch socketIO asynchron empfangen und automatisch der Liste hinzugefügt oder aktualisiert (Sortierung absteigend nach timestamp)
- Unfertige Tasks werden als solche markiert (z.B. mit dem Spinner component)
- Priorisierte Tasks werden als solche markiert
- Der SocketIO Client soll als HoC (Higher-Order Component) implementiert werden

### Code

- die frontend app ist schon aufgesetzt mit webpack, babel und react
- Entry component ist `src/containers/Root/index.jsx`
- reactstrap (react components für bootstrap) kann gerne verwendet werden
- Ausführen mit `npm start` (ereichbar unter `http://localhost:3000`)

### packages

- https://github.com/reactstrap/reactstrap
- https://github.com/socketio/socket.io-client
- https://github.com/axios/axios
- https://github.com/moment/moment
- weitere packages dürfen verwendet werden
