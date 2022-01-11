- [moviePod](#moviepod)
  - [REST-calls](#rest-calls)
    - [GET:](#get)
    - [POST:](#post)
    - [DELETE:](#delete)

# moviePod

API-documentation:
http://www.omdbapi.com/

## REST-calls

### GET:

- Detailierte Informationen über einen Film bekommen:<br />
  `GET http://url:port/getmovie/title`: <br />
  `title` statt Abständen ein + bsp: `Wonder+Woman`

### POST:

- Überprüfe das Password eines Users: <br />
  `http://url:port/checkpassword HTTP/1.1` <br />
  `content-type: application/json` <br /><br />
  `{`<br />
  `"username": "username",`<br />
  `"password": "password"`<br />
  `}` <br />
  `username`: Der Benutzername von dem User (meistens der eingeloggte), von dem ein Password, welches im body des request mitgeschickt wird, mit dem Password des angegebenen Users in der Datenbank verglichen wird. <br />
  Gibt bei selben Password `true` und bei unterschiedlichen `false` zurrück.
- Hinzufügen eines Users:<br />
  `http://url:port/adduser HTTP/1.1` <br />
  `content-type: application/json` <br /><br />
  `{`<br />
  `"username: "username",`<br />
  `"password": "password",`<br />
  `"dateOfbirth": "dateOfbirth"`<br />
  `}`<br />
- Hinzufügen eines Films zu der persönlichen Liste eines Benutzers:<br />
  `http://url:port/addmovietolist HTTP/1.1`<br />
  `content-type: application/json` <br /><br />
  `{`<br />
  `"username": "username",`<br />
  `"movieTitle": "movieTitle",`<br />
  `}`<br />
  Jeder Benutze hat eine persönliche Liste an Filmen. Hiermit kann man einen Film der persönlichen Liste eines Benutzers hinzufügen.`movieTitle` kann auch mit Abständen sein beispielsweise `Wonder Woman`.

### DELETE:

- Löschen eines Benutzers aus der Datenbank:<br />
  `DELETE http://localhost:3000/deluser HTTP/1.1`<br />
  `content-type: application/json`<br /><br />
  `{`<br />
  `"username": "QinX",`<br />
  `"password": "apfel1234"`<br />
  `}`<br />
