import { Switch, Route, Link, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, CoffeeOutlined, BulbOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';

const Home = lazy(() => import('./home'));
const About = lazy(() => import('./about'));
const SignIn = lazy(() => import('./signin'));
const Blog = lazy(() => import('./blog'));
const SignUp = lazy(() => import('./signup'));

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Container() {
  const userState = useSelector((store: RootState) => store.user.getUser);
  const { user, token } = userState;

  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const onCollapse = (collapsed_: boolean) => {
    setCollapsed(collapsed_);
  };

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo">
            <p>
              <span>안녕하세요. </span>
              <span>{token ? `${user.name} 님` : '손님'}</span>
            </p>
          </div>
          <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
            <Menu.Item key="/" icon={<HomeOutlined style={{ fontSize: '18px' }} />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="/blog" icon={<CoffeeOutlined style={{ fontSize: '18px' }} />}>
              <Link to="/blog">Blog</Link>
            </Menu.Item>
            <Menu.Item key="/about" icon={<BulbOutlined style={{ fontSize: '18px' }} />}>
              <Link to="/about">About</Link>
            </Menu.Item>
            <SubMenu
              key="admin"
              icon={<SettingOutlined style={{ fontSize: '18px' }} />}
              title="Admin"
            >
              <Menu.Item key="/sign-in">
                <Link to="/sign-in">sign-in</Link>
              </Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background" style={{ padding: 0 }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <div>메인 컨테이너</div>
              <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/about" component={About} />
                  <Route path="/blog" component={Blog} />
                  <Route path="/sign-up" component={SignUp} />
                  <Route path="/sign-in" component={SignIn} />
                </Switch>
              </Suspense>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Malrang</Footer>
        </Layout>
      </Layout>
      ,
    </>
  );
}

export default Container;