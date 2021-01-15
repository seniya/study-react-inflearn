import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Employee from '../store/modules/employee';
import Post from '../store/modules/post';

function About() {
  const dispatch = useDispatch();
  const employeeState = useSelector((store: RootState) => store.employee.employees);
  const postState = useSelector((store: RootState) => store.post.posts);

  const fetchEmployees = () => {
    dispatch(Employee.actions.fetchEmployees.request(''));
  };
  const fetchPosts = () => {
    dispatch(Post.actions.fetchPosts.request(''));
  };

  useEffect(() => {
    fetchEmployees();
    fetchPosts();
  }, []);

  // return {
  //   employeeState,
  //   fetchEmployees,
  // };

  return (
    <>
      <div>어바웃</div>
      <div>
        {employeeState.map((employee, index) => (
          <div key={index}>{employee.employee_name}</div>
        ))}
      </div>
      <div>
        {postState.map((post, index) => (
          <div key={index}>{post.title}</div>
        ))}
      </div>
    </>
  );
}

export default About;
