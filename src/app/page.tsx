import Link from "next/link";
import styles from "@/app/styles/style.module.css";

export default function Home() {
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
