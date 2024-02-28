// "use client";
// @은 src를 가르키는 절대경로
import HomeButton from "@/components/HomeButton";
import style from "@/app/styles/detail.module.css";

type Props = {
  params: {
    city: string;
  };
};

const Detail = ({ params }: Props) => {
  const cityName = params.city === "daegu" ? "대구" : params.city;
  return (
    <>
      <div className={style.detailTitle}>상세내용 : {cityName}</div>
      <HomeButton />
    </>
  );
};

export default Detail;
