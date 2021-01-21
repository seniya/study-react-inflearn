import { useParams, useRouteMatch } from 'react-router-dom';
import Blocks from 'editorjs-blocks-react-renderer';

function BlogRead() {
  const { url } = useRouteMatch();
  const { id } = useParams<{ id: string }>();
  const dataFromEditor = {
    time: new Date().getTime(),
    version: 'aaaa',
    blocks: [
      {
        type: 'header',
        data: {
          text: 'This is my awesome editor!',
          level: 1,
        },
      },
    ],
  };
  return (
    <div>
      블로그 상세
      <div>url : {url}</div>
      <div>id : {id}</div>
      <Blocks data={dataFromEditor} />
    </div>
  );
}

export default BlogRead;
