# URL Shortener

Web application that allows a user to enter a URL and returns a shortened URL that is globally unique.  The user can then input the shortened URL to be redirected to the original URL.

#### To Run

From the command line

`$ docker-compose up --build`

Then navigate to [localhost](http://localhost)

#### Usage

Enter a URL to be shortened then click 'Shorten URL'.

![Shorten URL](https://raw.githubusercontent.com/robertveboyd/rethink-url-shortener/master/images/usage-1.png)

A shortened URL will be displayed under 'Shortened URL'.  To shorten another URL click 'Shorten Another'.  To view recently shortened URLs click 'Show URLS'

![Shorten Another](https://raw.githubusercontent.com/robertveboyd/rethink-url-shortener/master/images/usage-2.png)

Clicking 'Show URLS' will display the last 5 shortened URLs with the original URL they redirect to.  Clicking on a URL will open it up in a new window.  Clicking 'Delete' will remove all previously saved shortened URLs.

![Show URLs](https://raw.githubusercontent.com/robertveboyd/rethink-url-shortener/master/images/usage-3.png)

#### Architecture

The full-stack application is dockerized to enable easy runtime on any system.  An overview of the services and networking is shown below

![Docker network](https://raw.githubusercontent.com/robertveboyd/rethink-url-shortener/master/images/docker-network.png)

- The frontend is built with React using tailwind.css for styling.  A static production build is created and served on port 8000 with Nginx.
- The backend uses Express for its web server served on port 9000.  Mongoose is used to connect to MongoDB.
- A proxy server is set up with Nginx to serve both the frontend and backend through port 80, this is the only port exposed outside of the container.

##### URL Model

field | type | desciption | example
-------------: | -------------: | ------------- | -------------
short | String | the encoded shorten URL | ac7z 
long | String | the originally supplied URL | https://www.enterprisestorageforum.com/cloud/8-cloud-storage-problems-and-how-to-avoid-them/
seq_id | Number | auto-incrementing id used to encode URL | 253606

#### URL Shortening

The shortened URL returned is obtained by encoding an auto-incrementing ID that gets assigned to each URL record added to the database.  The encoding is in base 62.  The shortened URL will look like http://rethink/[short].

##### Encoding pseudo code
    BASE62 = [a-zA-Z0-9]
	
	function encode(id){
	    shortURL = ''
		i = id
		while(i){
			shortUrl += BASE62[( i - 1 ) mod 62]
			i = floor( ( i - 1 ) / 62 )
		}
		return reverse(shortURL)
	} 

##### Base10 to Base62 Encoding Table

Base 10 | Base 62 || Base 10 | Base 62 || Base 10 | Base 62
-------------: | -------------: | -------------: | -------------: | -------------: | -------------: | -------------: | -------------: 
0  | a || 21 | v || 42 | Q
1  | b || 22 | w || 43 | R
2  | c || 23 | x || 44 | S
3  | d || 24 | y || 45 | T
4  | e || 25 | z || 46 | U
5  | f || 26 | A || 47 | V
6  | g || 27 | B || 48 | W
7  | h || 28 | C || 49 | X
8  | i || 29 | D || 50 | Y
9  | j || 30 | E || 51 | Z
10  | k || 31 | F || 52 | 0
11  | l || 32 | G || 53 | 1
12  | m || 33 | H || 54 | 2
13  | n || 34 | I || 55 | 3
14  | o || 35 | J || 56 | 4
15  | p || 36 | K || 57 | 5
16  | q || 37 | L || 58 | 6
17  | r || 38 | M || 59 | 7
18  | s || 39 | N || 60 | 8
19  | t || 40 | O || 61 | 9
20  | u || 41 | P || |

##### Example Encodings

id | encode(id)<sub>10</sub> | encode(id)<sub>62</sub>
-------------: | -------------: | -------------:
1 | [ 0 ] | a 
33 | [ 32 ] | G
62 | [ 61 ] | 9
63 | [ 0, 0 ] | aa
12 345 | [ 2, 12, 6 ] | cmg
1 000 000 | [ 3, 11, 8, 1 ] | dlib
1 000 050 | [ 3, 11, 8, 51 ] | dliZ
1 000 000 000 | [ 0, 4, 40, 54, 41, 15 ] | aeO2Pp
1 000 000 000 000 | [ 16, 36, 32, 47, 4, 35, 3 ] | qKGVeJd

##### Encoding Length

Unlike popular URL shortening services that use a fixed character size encoding, this particular implementation has encoding of variable size depending on the order the shortened URLs were entered into the database.  The first 62 URLs shortened will have an encoding of 1 character, the first 3906 (62x62<sup>1</sup> + 62x62<sup>0</sup>) URLs shortened will have an encoding of 2 or less characters, etc.  It will take over ![286 trillion](https://raw.githubusercontent.com/robertveboyd/rethink-url-shortener/master/images/latex.gif) or 286 trillion entries before the encoding size exceeds 8 character

#### Assumptions / Limitations

<li>Assume that the URL entered to be shortened is valid.  There is no validation for non-existant or malformed URLs.</li>

