import AppLayout from '../components/AppLayout'
import Head from 'next/head'
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList'

const Profile = () => {

  const followerList = [
    {nickname: '제로초'}, {nickname: '바보'}, {nickname: '샘플'}
  ]
  const followingList = [
    {nickname: '제로초'}, {nickname: '바보'}, {nickname: '샘플'}
  ]

  return (
    <>
      <Head>
        <title>내 프로필 | NodeBird</title>
        <meta charSet="utf-8"></meta>
      </Head> 
      <AppLayout>
        <NicknameEditForm />
        <FollowList header="팔로잉 목록" data={followingList}/>
        <FollowList header="팔로워 목록" data={followerList} />        
      </AppLayout>
    </>
  )
}

export default Profile