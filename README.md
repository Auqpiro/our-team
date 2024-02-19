# our-team

test

[design](https://www.figma.com/file/Nw9TJYCeh8Tmi9cX3KxyqO/Тестовое.-Фронтенд?type=design&node-id=0-1&mode=design&t=nJTn6frWvJ49prkt-0)

server endpoints

method: POST
/signup
REQ JSON:
{
"name"
"email"
"password"
}
RES JSON:
{
"id"
"likes": [id]
}

method: POST
/signin
REQ JSON:
{
"email"
"password"
}
RES JSON:
{
"id"
"likes": [id]
}

method: GET w/ credentials
/users
[
{
"name"
"id"
}
]

method: GET w/ credentials
/users/:id
RES JSON:
{
"id"
"name"
"role"
"icon"
"email"
"phone"
"info"
}

method: PATCH w/ credentials
/users/:id/info
REQ JSON: Records<string, string>
RES status OK

method: PATCH w/ credentials
/users/:id/like
RES status OK

method: POST w/ credentials
/upload/:id/icon
REQ form-data name="icon" single image
RES status OK