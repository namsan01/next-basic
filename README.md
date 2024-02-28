# Next.js 기초 연습

## 기본 정리

- app/page.tsx
  : 루트 페이지

```tsxs
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

- app/detail 폴더 / page.tsx 파일생성

```tsx
import React from "react";

const page = () => {
  return <div>page</div>;
};

export default page;
```

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
  : 이유는 Next.js 는 client component 는 컴포넌트 만들길 추천
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
