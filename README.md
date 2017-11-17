# CodeWatch project!

## What is CodeWatch? And what for?

CodeWatch project is real time code watching web service. When we study
programming, we often use Stackoverflow. But asking and answering take time. If
we have enough time, well, yeah, it's ok. But when homework deadline is 24:00
today, it's not OK at all.

I thought 'If someone can answer while someone writing, it will be cool!'. And I
also needed to study Node.js, Express, socket.io, etc while summer vacation. So,
I decide to make CodeWatch.

## How to use?

First sign up, log in. Then, you can see this page.
![index](http://blog.naver.com/PostView.nhn?blogId=ninanung&Redirect=View&logNo=221142515350&categoryNo=27&isAfterWrite=true&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor%3FdocId%3D221142515350&directAccess=false#)
Every 'Watch' can be ended or still writing. If you are writing now. It looks like this
![board_writing](http://blog.naver.com/PostView.nhn?blogId=ninanung&Redirect=View&logNo=221142515350&categoryNo=27&isAfterWrite=true&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor%3FdocId%3D221142515350&directAccess=false#)
In text box, you can freely write code and watchers can see like this
![board_writing_watcher](http://blog.naver.com/PostView.nhn?blogId=ninanung&Redirect=View&logNo=221142515350&categoryNo=27&isAfterWrite=true&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor%3FdocId%3D221142515350&directAccess=false#)
When writer change code, code that watchers see will change automatically. Also, writer and watchers can chat like this.
![board_chat](http://blog.naver.com/PostView.nhn?blogId=ninanung&Redirect=View&logNo=221142515350&categoryNo=27&isAfterWrite=true&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor%3FdocId%3D221142515350&directAccess=false#)
If code goes wrong, or there's some more efficient way. Please talk to writer.  
After finish all of code, writer can save 'Watch'. Then, watchers and writer will see this page.
![board_ended](http://blog.naver.com/PostView.nhn?blogId=ninanung&Redirect=View&logNo=221142515350&categoryNo=27&isAfterWrite=true&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor%3FdocId%3D221142515350&directAccess=false#)
And all users can write comment below.
![board_comment](http://blog.naver.com/PostView.nhn?blogId=ninanung&Redirect=View&logNo=221142515350&categoryNo=27&isAfterWrite=true&redirect=View&widgetTypeCall=true&topReferer=http%3A%2F%2Fblog.editor.naver.com%2Feditor%3FdocId%3D221142515350&directAccess=false#)
Please enjoy!


## Used projects

### Platforms

- Node.js
- MongoDB

### Modules

- "body-parser": "^1.6.5",
- "connect-flash": "^0.1.1",
- "cookie-parser": "^1.3.2",
- "ejs": "^1.0.0",
- "express": "5.0.0-alpha.2",
- "express-session": "^1.7.6",
- "mongoose": "^4.0.0",
- "passport": "^0.2.0",
- "passport-local": "^1.0.0",
- "socket.io": "^2.0.3",
- "highlight.js": "^9.12.0"

## License

[MIT](LICENSE)
