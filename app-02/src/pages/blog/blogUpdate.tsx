import { useParams, useRouteMatch } from 'react-router-dom';

function BlogUpdate() {
  const { url } = useRouteMatch();
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      블로그 수정
      <div>url : {url}</div>
      <div>id : {id}</div>
    </div>
  );
}

export default BlogUpdate;
