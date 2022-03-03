import classes from "./List.module.css";
import PhanTuDanhSach from "./ListItem";
const DanhSach = (props) => {
  const { title, arrStudents, arrTeachers } = props;
  const renderArrStudents =
    arrStudents &&
    arrStudents.length > 0 &&
    arrStudents.map((stu) => (
      <PhanTuDanhSach
        key={stu._id}
        name={stu.nameStu}
        birthday={stu.dateBorn}
        _id={stu._id}
      />
    ));
  return (
    <section className={classes.container}>
      <h3>{title}</h3>
      {arrStudents && arrStudents.length > 0 && renderArrStudents}
    </section>
  );
};

export default DanhSach;
