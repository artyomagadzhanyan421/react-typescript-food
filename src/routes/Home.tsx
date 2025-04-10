function Home() {
  const username = localStorage.getItem("username");

  return (
    <div>
      <p>Welcome, {username}!</p>
    </div>
  )
}

export default Home