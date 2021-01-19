import { useParams, useRouteMatch } from 'react-router-dom';

function BlogRead() {
  const { url } = useRouteMatch();
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      블로그 상세
      <div>url : {url}</div>
      <div>id : {id}</div>
    </div>
  );
}

export default BlogRead;
