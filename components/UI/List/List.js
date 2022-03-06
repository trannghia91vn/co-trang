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
        type='student'
      />
    ));
  const renderArrTeachers =
    arrTeachers &&
    arrTeachers.length > 0 &&
    arrTeachers.map((tea) => <PhanTuDanhSach 
      key={tea._id}
      _id={tea._id}
      name={tea.name}
      birthday={tea.dateBorn}
      type='teacher'
    />);
  return (
    <section className={classes.container}>
      <h3>{title}</h3>
      {arrStudents && arrStudents.length > 0 && renderArrStudents}
      {arrTeachers && arrTeachers.length > 0 && renderArrTeachers}
    </section>
  );
};

export default DanhSach;
