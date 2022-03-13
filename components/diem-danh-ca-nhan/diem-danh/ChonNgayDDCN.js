import { Fragment } from "react";
import FormChonNgayDDCN from "../../UI/DatePick/date-pick-ddcn";

const ChonNgayDDCN = (props) => {
  return (
    <Fragment>
      <h3
        style={{
          margin: ".5rem 0",
          fontWeight: "normal",
          color: `var(--mauTieuDe--)`,
        }}
      >
        Chọn ngày điểm danh
      </h3>
      <FormChonNgayDDCN
        getDateType={props.getDateType}
        dateTypeDefault={props.dateTypeDefault}
      />
    </Fragment>
  );
};

export default ChonNgayDDCN;
