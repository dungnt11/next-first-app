# Khởi tạo với next JS

## Cài đặt

```none
npx create-next-app
```

vào project

```js
npm run dev
```



### Style in Next

Có 2 cách

```jsx
<style jsx>
	{`
			// thuộc tính
	`}
</style>
```

Hoặc 

```jsx
<p style={{ }}></p>
```

Thuộc tính sẽ viết dạng js-css đặt trong cặp ngoặc {{ ```here``` }}

---

### Static

Đặt tên trong ```static``` folder và lấy file như bt

---

### Link

Trong page, mỗi trang là một file ví dụ ```page/home.js``` truy cập tương tự ```localhost:3000/home```, nếu cùng cấp với ```index.js``` sẽ cùng route

> Dynamic Route

```page/[id]```, sẽ ```match``` với các route dạng ```/page/123```, hoặc ```page?id=3```

Khi lấy ```router.query``` sẽ được ```object``` dạng 

```js
{page: "1", id: "3"}
```



> Trỏ đến đường dẫn

```js
import Link from 'next/link'
```



```jsx
<Link href="/post/[pid]" as="/post/abc">
  <a>First Post</a>
</Link>
```



```as```: địa chỉ trỏ đến link nhìn trên Browser



**Lưu ý khi render ```Link```**

- ```Link``` phải có phần tử con là ```<a></a>```

- >```jsx
  > <Link key={i} href={`/post/[pid]`} as={`/post/${e}`}>
  >      <a>{e}</a>
  >    </Link>
  >```
  >
  >Chú ý thêm ```key```



Nếu 2 file cùng trỏ về 1 route **nó sẽ ưu tiên route tĩnh hơn route động** 

**Truyền URL dạng ```object```**

```jsx
// pages/index.js
import Link from 'next/link'

function Home() {
  return (
    <div>
      Click{' '}
      <Link href={{ pathname: '/about', query: { name: 'Zeit' } }}>
        <a>here</a>
      </Link>{' '}
      to read more
    </div>
  )
}

export default Home
```

Nếu sử dụng ```onClick``` thì cần có thẻ ```<a>``` bên trong, để làm chỗ bắt

**Nếu trong Link là 1 component**: trong trường hợp này cần dùng [ref](https://reactjs.org/docs/react-api.html#reactforwardref)

Để ngăn việc cuộn lên đầu khi thay đổi các page 

```jsx
<Link scroll={false} href="/?counter=10"><a>Disables scrolling</a></Link>
```

#######################################

#######################################

#######################################

[Router Event](https://nextjs.org/docs#router-events)

### Head

Thêm ```head``` vào page như sau

```jsx
import Head from 'next/head'

function IndexPage() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
      </Head>
      <p>Hello world!</p>
    </div>
  )
}

export default IndexPage

```

> Thêm thuộc tính **key** vào để tránh trùng lặp head, nếu trùng cũng chỉ cái cuối được hiển thị

### Fetch API

1. Có thể sử dụng ```stateless function hooks``` của react, hoặc  ```component dạng class```, cũng có thể dùng

```getInitialProps ``` như sau

```jsx
import fetch from 'isomorphic-unfetch'

function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async ({ req }) => {
  const res = await fetch('https://api.github.com/repos/zeit/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page

```

2. Dùng hook dạng class

   ```js
   import React from "react";
   import fetch from "isomorphic-unfetch";
   
   class HelloUA extends React.Component {
     static async getInitialProps({ req }) {
       const userAgent = req ? req.headers["user-agent"] : navigator.userAgent;
       let result = await fetch("https://api.github.com/repos/zeit/next.js");
       let json = await result.json();
       return { userAgent, test: json.stargazers_count };
     }
   
     render() {
       return (
         <div>
           <p>Hello World {this.props.userAgent}</p>
           <p>Cout: {this.props.test}</p>
         </div>
       );
     }
   }
   
   export default HelloUA;
   ```

   > Dữ liệu trong hàm getIntialProps sẽ truyền vào thằng props

`getInitialProps` receives a context object with the following properties:

- `pathname` - path section of URL
- `query` - query string section of URL parsed as an object
- `asPath` - `String` of the actual path (including the query) shows in the browser
- `req` - HTTP request object (server only)
- `res` - HTTP response object (server only)
- `err` - Error object if any error is encountered during the rendering