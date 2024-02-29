# Next.js 기초 연습

## 기본 정리

- app/page.tsx
  : 루트 페이지

```tsx
export default function Home() {
  return (
    <>
      <h1>첫페이지</h1>
      <ul>
        <li>대구</li>
        <li>부산</li>
        <li>대전</li>
        <li>광주</li>
        <li>서울</li>
      </ul>
    </>
  );
}
```

- 정적 라우팅(static router)
- app/detail 폴더 / page.tsx 파일생성

```tsx
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
```

- 동적 라우팅 (Dynamic Router)
- app/detail/[city] 폴더생성 / page.tsx 파일생성
  : http://localhost:3000/detail/daegu
  : http://localhost:3000/detail/busan
  : http://localhost:3000/detail/daegun
  : http://localhost:3000/detail/gwangju
  : http://localhost:3000/detail/seoul
  : http://localhost:3000/detail/jeju

```tsx
import React from "react";
// 아.. 어렵다.
type Props = {
  params: {
    city: string;
  };
};

const page = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : "";
  return <div>상세내용{cityName}</div>;
};

export default page;
```

- 동적 라우팅 적용

```tsx
import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>첫페이지</h1>
      <ul>
        <li>
          <Link href={"/detail/daegu"}>대구</Link>
        </li>
        <li>
          <Link href={"/detail/busan"}>부산</Link>
        </li>
        <li>
          <Link href={"/detail/daegun"}>대전</Link>
        </li>
        <li>
          <Link href={"/detail/gwangju"}>광주</Link>
        </li>
        <li>
          <Link href={"/detail/seoul"}>서울</Link>
        </li>
        <li>
          <Link href={"/detail/jeju"}>제주</Link>
        </li>
      </ul>
    </>
  );
}
```

- 정적 라우팅 적용

```tsx
import Link from "next/link";
import React from "react";
type Props = {
  params: {
    city: string;
  };
};

const page = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  return (
    <>
      <div>상세내용 : {cityName}</div>
      <Link href="/">이전페이지</Link>
    </>
  );
};

export default page;
```

- 참고사항
  : next.js 는 Server 의 콘솔(터미널)확인
  :console.log 활용시 터미널에서 확인

useRouter 활용하기
: use 는 hook이다
: 이벤트 헨들러 활용
: 필수로 클라이언트 컴포넌트라고 명시
: "use clinet"

```ts
"use client";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import React from "react";

type Props = {
  params: {
    city: string;
  };
};

const Detail = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  // 첫 페이지로 이동
  // 주의사항 : react-router-dom (X)
  // import { useRouter } from "next/navigation";
  const router = useRouter();
  const handleClick = () => {
    console.log("첫페이지로");
    router.push("/");
  };
  return (
    <>
      <div>상세내용 : {cityName}</div>
      {/* <Link href="/">이전페이지</Link> */}
      <button onClick={() => handleClick()}>이전으로</button>
    </>
  );
};

export default Detail;
```

- 버튼을 컴포넌트로 만들기
  : 이유 : Next.js 는 client component 는 컴포넌트 만들길 추천
  : "use client" 사용한것은 가능하면 컴포넌트
  : /app/components/폴더생성
  : /app/components/HomeButton.tsx

```ts
"use client";

import { useRouter } from "next/navigation";
import React from "react";

const HomeButton = () => {
  const router = useRouter();
  const handleClick = () => {
    console.log("첫페이지로");
    router.push("/");
  };
  return (
    <div>
      <button onClick={() => handleClick()}>이전으로</button>
    </div>
  );
};

export default HomeButton;
```

```ts
// "use client";

import HomeButton from "@/components/HomeButton";

type Props = {
  params: {
    city: string;
  };
};

const Detail = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  return (
    <>
      <div>상세내용 : {cityName}</div>
      <HomeButton />
    </>
  );
};

export default Detail;
```

- Next.js 의 기본 컴포넌트는 서버 컴포넌트이다.
  : use 류의 hook 과 이벤트 헨들러가 포함된 컴포넌트는 배치용으로 제작
  : 서버 컴포넌트에 import해서 사용
  : 반대사용X (클라이언트 컴포넌트에 서버컴포넌트를 배치하면 오류)

- css 작업 해보기
  : global.css 에 기본내용을 작성(앱 전체에 영향을 줌)
  : 파일명은 자유
  : 전역 기본 css 적용하기
  : 기본레이아웃은 layout.tsx 에 작성하면 적용
  : next.js는 레이아웃을 담당하는 파일
  : layout.tsx에 적용 (import "./global.css")

```css
/* @tailwind base;
@tailwind components;
@tailwind utilities; */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
}
ul,
li {
  list-style: none;
}
a {
  color: #000;
  text-decoration: none;
}
html {
  font-size: 12px;
}
body {
}
button {
  border: none;
  cursor: pointer;
  border-radius: 4px;
  font-size: 8px;
  padding: 4px 8 px;
  background: blue;
  color: #fff;
}
```

- 파일명.module.css 활용
  : 확장자는 .module.css
  : 지역 css 적용
  : 다른 css 와의 충돌을 제거하고 우선적으로 적용
  : 적용 후 실행하면 랜덤(유일)한 class명을 생성
  : css 동일한 이름에 의한 문제가 발생되지않는다.
  : /app/styles 폴더 만들기 / detail.module.css 생성

  ```css
  .detailTitle {
    color: red;
    font-weight: 900;
    font-size: 20px;
  }
  ```

  ```ts
  import style from "@/app/styles/detail.module.css";
  // js 처럼 작성해야한다.
  <div className={style.detailTitle}>상세내용 : {cityName}</div>;
  ```

  : app/page.tsx에 파일명.module.css 적용하기
  : app/styles/style.module.css 생성
  : Link는 a 태그로 치환

```css
.list {
  position: relative;
  display: block;
  margin: 0 auto;
  font-size: 20px;
  color: #d9d9d9;
}
.list li {
  font-size: 20px;
  color: #d9d9d9;
}
.list li:hover a {
  color: red;
}
```

```tsx
<ul className={styles.list}>
```

- API 백엔드 서버 연동
  : [REST OPEN API](https://jsonplaceholder.typicode.com/)
  : 전체목록 : https://jsonplaceholder.typicode.com/todos

: Type 만들기

- 손으로 작업하기

```json
{
  "userId": 10,
  "id": 200,
  "title": "ipsam aperiam voluptates qui",
  "completed": false
}
```

```ts
export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
```

- ChatGPT 작업하기

```txt
  {
    "userId": 10,
    "id": 200,
    "title": "ipsam aperiam voluptates qui",
    "completed": false
  }   타입스크립트 타입으로 만들어줘
```

- 서비스 사이트 이용해서 작업하기
  : https://transform.tools/json-to-typescript

```ts
export interface Root {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

- Next.js 내장된 fetch API 사용하기
  : React Query 처럼 생겼다.
  : app/page.tsx

```tsx
import Link from "next/link";
import styles from "@/app/styles/style.module.css";

// Open API 호출하기
const getTodoList = async () => {
  // Next.js에 내부 함수
  // 전체 목록
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  console.log(res);
  return res.json;
};

export default async function Home() {
  const res = await getTodoList();
  console.log("받은데이터", res);

  return (
    <>
      <h1>첫페이지</h1>
      <ul className={styles.list}>
        <li>
          <Link href={"/detail/daegu"}>대구</Link>
        </li>
        <li>
          <Link href={"/detail/busan"}>부산</Link>
        </li>
        <li>
          <Link href={"/detail/daegun"}>대전</Link>
        </li>
        <li>
          <Link href={"/detail/gwangju"}>광주</Link>
        </li>
        <li>
          <Link href={"/detail/seoul"}>서울</Link>
        </li>
        <li>
          <Link href={"/detail/jeju"}>제주</Link>
        </li>
      </ul>
    </>
  );
}
```

- Next.js 에러 페이지 만들기
  : https://nextjs.org/docs/getting-started/project-structure
  : /app/error.tsx 생성 (약속이 된 파일명)

```tsx
"use client";

import { useEffect } from "react";

type Props = {
  error: Error;
  reset: () => void;
};
const Error = ({ error, reset }: Props) => {
  useEffect(() => {
    console.log(error.message);
  });
  return (
    <>
      <h1>에러 페이지입니다. {error.message}</h1>
      <button
        onClick={() => {
          reset();
        }}
      >
        새로고침
      </button>
    </>
  );
};

export default Error;
```

- 데이터의 타입을 정의하자
  : /app/type 폴더 만들기
  : /app/type/TodoType.ts

```ts
export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
```

: /app/page.tsx

```tsx
<div>
  {res.map((item: Todo) => (
    <div key={item.id}>
      Id: {item.userId} : {item.title}
    </div>
  ))}
</div>
```

- Todo 상세페이지 이동하기
  : /app/todos 폴더 만들기
  : /app/todos/[id] 폴더 만들기
  : /app/todos/[id]/page.tsx 폴더 만들기

```ts
import React from "react";
type Props = {
  params: {
    id: string;
  };
};
// Next.js 의 fetch 사용

// Open API 호출하기
const getTodoDetail = async (id: string) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (res.status !== 200) {
    throw new Error("상세 할일 정보를 가지고 오는데 실패하였습니다.");
  } else {
    return res.json();
  }
};

const TodoDetail = async ({ params }: Props) => {
  const res = await getTodoDetail(params.id);
  console.log(res);
  return (
    <div>
      할일 상세페이지 {res.id} : {res.title}{" "}
    </div>
  );
};

export default TodoDetail;
```

- 로딩창 생성하기
  : /app/loading.tsx 파일 생성

```tsx
import React from "react";

const Loading = () => {
  return <h1>로딩중입니다</h1>;
};

export default Loading;
```

- 환경변수 파일 생성하기
  : 숨겨야 하는 정보 (API 키 , 지도 키 , FB 키 등)
  : 반드시 / 생성함
  : .env.local 생성
  : 서버를 재실행
  : React 와 Next는 접두어가 다르다.

```txt
  NEXT_PUBLIC_API_URL= https://jsonplaceholder.typicode.com
```

: app/page.tsx

```tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${API_URL}/todos`);
```

:/app/todos/[id]/page.tsx

```tsx
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const res = await fetch(`${API_URL}/todos/${id}`);
```

- 혼자서 연습해보기
  : 랜덤 고양이 API [https://thecatapi.com/]
  : 지브리 API [https://ghibliapi.vercel.app/]
  : 날씨 API [https://www.weatherapi.com/]
  : 포켓몬 API [https://pokeapi.co/]

- MetaData 적용하기 1. (정적 Static )

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "타이틀 - 연습",
  description: "연습하고 있습니다. ^^",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- MetaData 적용하기 2. (동적 Dynamic )
  : /app/detail/[city]/page.tsx

  ```tsx
  export function generateMetadata({ params }: Props) {
    return {
      title: `새로운 타이틀 - ${params.city}`,
      description: `${params.city} : 연습하고 있습니다. ^^`,
    };
  }
  ```

- MetaData 적용하기 3. (동적 Dynamic : SearchParams 활용 )

```tsx
import style from "@/app/styles/detail.module.css";
import HomeButton from "@/components/HomeButton";

type Props = {
  params: {
    city: string;
  };
  searchParams: {
    cityName: string;
  };
};
// 동적 MetaData
export function generateMetadata({ params, searchParams }: Props) {
  return {
    title: `새로운 타이틀 - ${searchParams.cityName}`,
    description: `${params.city} : 연습하고 있습니다. ^^`,
  };
}

const Detail = ({ params, searchParams }: Props) => {
  // const cityName = params.city === "daegu" ? "대구" : params.city;
  return (
    <>
      <div className={style.detailTitle}>
        상세내용 : {searchParams.cityName}
      </div>

      <HomeButton />
    </>
  );
};

export default Detail;
```

- 배포하기 (Deploy)
  : 인터넷 주소로 접근
  : [https://vercel.com]
