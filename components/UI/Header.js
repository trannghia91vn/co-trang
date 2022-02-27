import classes from "./Header.module.css";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = (props) => {
  //Lấy về từ próp các tag điều hướng tính năng
  const { title, arrOptions } = props.dataHeader;
  //Lâý về slug chính
  const route = useRouter().route;
  //Dùng biến sate lưu nội bộ trạng thái style của option được chọn
  const [arrOptionsTag, changeArrOptionsTag] = useState(arrOptions);

  //Tạo biến render tag options
  const renderOptions = arrOptionsTag.map((tag) => (
    <Link key={tag.slug} href={`${route}/${tag.slug}`}>
      <div className={classes.item}>{tag.label}</div>
    </Link>
  ));

  return (
    <section className={classes.header}>
      <div className={classes.breadscrums}></div>
      <h3>{title}</h3>
      <div className={classes.options}>{renderOptions}</div>
    </section>
  );
};

export default Header;
