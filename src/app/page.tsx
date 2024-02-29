import style from "@/app/styles/style.module.css";
import Link from "next/link";
import { Todo } from "./type/TodoType";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
// Open API 호출하기
const getTodoList = async () => {
  // Next.js 에 내부 함수
  // 전체 목록
  // 주소를 일부러 오류를 발생시켰습니다.
  const res = await fetch(`${API_URL}/todos`);
  // console.log(res.status);
  // console.log(typeof res.status); // 데이터 종류
  if (res.status !== 200) {
    // 에러...
    throw new Error("데이터를 가지고 오는데 실패하였습니다.");
  } else {
    return res.json();
  }
};

export default async function Home() {
  const res = await getTodoList();
  console.log("받은 데이터 : ", res);

  return (
    <>
      <h1>첫페이지</h1>
      <ul className={style.list}>
        <li>
          <Link href="/detail/daegu?cityName=대구">대구</Link>
        </li>
        <li>
          <Link href="/detail/busan?cityName=부산">부산</Link>
        </li>
        <li>
          <Link href="/detail/daegun?cityName=대전">대전</Link>
        </li>
        <li>
          <Link href="/detail/gwangju?cityName=광주">광주</Link>
        </li>
        <li>
          <Link href="/detail/seoul?cityName=서울">서울</Link>
        </li>
        <li>
          <Link href="/detail/jeju?cityName=제주">제주</Link>
        </li>
      </ul>
      <div>
        {res.map((item: Todo) => (
          <div key={item.id}>
            Id: {item.userId} :{" "}
            <Link href={`todos/${item.id}`}>{item.title}</Link>
          </div>
        ))}
      </div>
    </>
  );
}
