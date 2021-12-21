# moviePod

API-documentation:
http://www.omdbapi.com/

## REST-calls

### GET:

`GET http://url:port/getmovie/title`: <br />
`title` statt Abständen ein + bsp: `Wonder+Woman`

### POST:

`http://url:post/checkpassword` HTTP/1.1 <br />
content-type: application/json <br /> <br />

`{ 
"username": "username", 
"password": "password" 
}` <br />

`username`: Der Benutzername von dem User (meistens der eingeloggte), von dem ein Password, welches im body des request mitgeschickt wird, mit dem Password des angegebenen Users in der Datenbank verglichen wird. <br />
Gibt bei selben Password `true` und bei unterschiedlichen `false` zurrück.
