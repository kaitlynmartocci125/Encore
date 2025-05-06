function Login() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:8888/login';
  };

  return (
    <button className="login-button" onClick={handleLogin}>
      Login with Spotify
    </button>
  );
}

export default Login;
