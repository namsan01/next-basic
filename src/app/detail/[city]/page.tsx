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
