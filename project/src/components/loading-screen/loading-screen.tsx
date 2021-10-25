function LoadingScreen(): JSX.Element {
  return (
    <p
      style={{
        display: 'flex',
        height: '70vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '4.5em',
      }}
    >
      <span>Loading ...</span>
    </p>
  );
}

export default LoadingScreen;
